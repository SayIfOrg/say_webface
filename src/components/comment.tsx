import { createClient } from "graphql-ws";
import { createClient as createSSEClient } from "graphql-sse";
import React, { useEffect } from "react";
import { subscribeWS, subscribeSSE } from "../../lib/clients";
import { env } from "../env/client.mjs";
import { LatestCommentsSubscription } from "../gql/keeper/graphql";
import {
  CommentType,
  latestComments,
  useComments,
} from "../../lib/keeper/commenting";
import { initFlowbite } from "flowbite";
import Image from "next/image";
import DefaultProfilePic from "../../public/default-profile-pic.png";

type Subscription = {
  data: LatestCommentsSubscription;
};
interface CommentsProps {
  fetchingType: "sse" | "ws";
  setFetchingType: (type: "sse" | "ws") => void;
}
export const Comments = ({ fetchingType, setFetchingType }: CommentsProps) => {
  let commentFetchingTypeText = (
    <span className={fetchingType === "sse" ? "text-blue-700" : "text-red-700"}>
      {fetchingType === "sse" ? "server sent events" : "websocket"}
    </span>
  );

  const { comments, handleNewComment, isLoading } = useComments();
  let result;
  if (comments.length === 0 && isLoading) {
    result = (
      <>
        <CommentSkeleton />
        <CommentSkeleton />
      </>
    );
  } else {
    result = comments.map((comment, i) => {
      let isFirst = i === 0 ? true : false;
      let isLast = i === comments.length ? true : false;
      return (
        <CommentComponent key={i} comment={comment} isLast={isLast} isFirst={isFirst} />
      );
    });
  }

  let resultNode = (
    <>
      <label className="relative mr-5 inline-flex cursor-pointer items-center">
        <input
          onChange={(event) => {
            console.log(event.target.checked);
            setFetchingType(!event.target.checked ? "sse" : "ws");
          }}
          checked={fetchingType === "sse" ? false : true}
          type="checkbox"
          className="peer sr-only"
        />
        <div className="peer h-6 w-11 rounded-full bg-blue-700 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-green-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-green-800"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          comments are fetching in real time with {commentFetchingTypeText}
        </span>
      </label>
      {result}
    </>
  );

  return fetchingType === "ws" ? (
    <WSComment handleNewComment={handleNewComment} resultNode={resultNode} />
  ) : (
    <SSEComment handleNewComment={handleNewComment} resultNode={resultNode} />
  );
};

interface CommentMethodProps {
  handleNewComment: (latestComment: CommentType) => void;
  resultNode: React.ReactNode;
}
export const WSComment = ({
  handleNewComment,
  resultNode,
}: CommentMethodProps) => {
  useEffect(() => {
    // this is related to https://github.com/themesberg/flowbite/issues/86
    initFlowbite();
  });

  useEffect(() => {
    const client = createClient({
      url: `ws://${env.NEXT_PUBLIC_SAY_KEEPER_GQL_ADDRESS}`,
    });

    const subscription = subscribeWS<Subscription>(client, {
      query: latestComments,
    });

    async function Receive() {
      for await (const result of subscription) {
        let comment = { ...result.data.latestComment, user: null };
        console.log(result.data.latestComment);
        handleNewComment(comment);
      }
      // complete
    }
    Receive().then(() => console.log("subscribe ended"));
    // .catch((e) => console.log(e, "this is error"));

    return () => {
      // subscription.return() to dispose
      subscription.return();
    };
  }, []);

  return <>{resultNode}</>;
};

export const SSEComment = ({
  handleNewComment,
  resultNode,
}: CommentMethodProps) => {
  useEffect(() => {
    // this is related to https://github.com/themesberg/flowbite/issues/86
    initFlowbite();
  });

  useEffect(() => {
    const client = createSSEClient({
      url: `http://${env.NEXT_PUBLIC_SAY_KEEPER_GQL_ADDRESS}`,
    });

    const subscription = subscribeSSE<Subscription>(client, {
      query: latestComments,
    });

    async function Receive() {
      for await (const result of subscription) {
        let comment = { ...result.data.latestComment, user: null };
        console.log(result.data.latestComment);
        handleNewComment(comment);
      }
      // complete
    }
    Receive().then(() => console.log("subscribe ended"));
    // .catch((e) => console.log(e, "this is error"));

    return () => {
      // subscription.return() to dispose
      subscription.return();
    };
  }, []);

  return <>{resultNode}</>;
};

const CommentSkeleton = () => {
  return (
    <article className="bg-white p-6 text-base dark:bg-gray-900">
      <footer className="mb-2 flex items-center justify-between">
        <div role="status" className="w-full animate-pulse">
          <div className="mt-4 flex items-center">
            <svg
              className="mr-2 h-10 w-10 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="mr-3 h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <span className="sr-only">Loading...</span>
          <div className="mx-auto mt-4 mb-2.5 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="mx-auto h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </footer>
    </article>
  );
};

interface CommentComponentProps {
  comment: CommentType;
  isLast: boolean;
  isFirst: boolean;
}
const CommentComponent = ({
  comment,
  isLast,
  isFirst,
}: CommentComponentProps) => {
  let hasReply = false;
  let isReply = false;
  let classNames =
    "bg-white p-6 text-base dark:bg-gray-900" +
    (!isFirst ? " border-gray-200 border-t dark:border-gray-700" : "") +
    (!isLast && !hasReply ? " mb-6" : "") +
    (isReply ? " ml-6 lg:ml-12" : "");
  const dropdownToggleID = `dropdownComment${String(comment.id)}`;
  const dropdownButtonID = `${dropdownToggleID}Button`;
  let userTitle = `${comment.user?.firstName} ${comment.user?.lastName} (${comment.user?.username})`;
  let createdAt = new Date(comment.createdAt);
  return (
    <article key={comment.id} className={classNames}>
      <footer className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
            <Image
              className="mr-2 h-6 w-6 rounded-full"
              src={
                comment.user?.profile?.avatar?.rendition?.url ||
                DefaultProfilePic
              }
              alt={userTitle}
              width={50}
              height={50}
            />
            {userTitle}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <time
              dateTime={createdAt.toISOString()}
              title={createdAt.toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            >
              {createdAt.toLocaleString()}
            </time>
          </p>
        </div>
        <button
          id={dropdownButtonID}
          data-dropdown-toggle={dropdownToggleID}
          className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        {/* <!-- Dropdown menu -- */}
        <div
          id={dropdownToggleID}
          className="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Remove
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Report
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <p>{comment.content}</p>
      <div className="mt-4 flex items-center space-x-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg
            aria-hidden="true"
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          Reply
        </button>
      </div>
    </article>
  );
};
