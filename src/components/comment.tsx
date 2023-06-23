import { createClient } from "graphql-ws";
import { createClient as createSSEClient } from "graphql-sse";
import { useEffect, useState } from "react";
import { subscribeWS, subscribeSSE } from "../../lib/clients";
import { env } from "../env/client.mjs";
import { LatestCommentsSubscription } from "../gql/keeper/graphql";
import { latestComments } from "../../lib/keeper/commenting";
import { initFlowbite } from "flowbite";

export const WSComment = () => {
  const [comments, setComments] = useState<
    LatestCommentsSubscription["latestComment"][]
  >([]);

  useEffect(() => {
    const client = createClient({
      url: `ws://${env.NEXT_PUBLIC_SAY_KEEPER_GQL_ADDRESS}`,
    });

    type Subscription = {
      data: LatestCommentsSubscription;
    };
    const subscription = subscribeWS<Subscription>(client, {
      query: latestComments,
    });

    async function Receive() {
      for await (const result of subscription) {
        console.log(result.data.latestComment);

        setComments((pervComments) => {
          return [
            ...pervComments,
            {
              id: result.data.latestComment.id,
              content: result.data.latestComment.content,
            },
          ];
        });
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

  return (
    <div>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.content}</p>
      ))}
    </div>
  );
};

export const SSEComment = () => {
  useEffect(() => {
    // this is related to https://github.com/themesberg/flowbite/issues/86
    initFlowbite();
  });
  const [comments, setComments] = useState<
    LatestCommentsSubscription["latestComment"][]
  >([]);

  useEffect(() => {
    const client = createSSEClient({
      url: `http://${env.NEXT_PUBLIC_SAY_KEEPER_GQL_ADDRESS}`,
    });

    type Subscription = {
      data: LatestCommentsSubscription;
    };
    const subscription = subscribeSSE<Subscription>(client, {
      query: latestComments,
    });

    async function Receive() {
      for await (const result of subscription) {
        console.log(result.data.latestComment);

        setComments((pervComments) => {
          return [
            ...pervComments,
            {
              id: result.data.latestComment.id,
              content: result.data.latestComment.content,
            },
          ];
        });
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

  let result = comments.map((comment, i) => {
    let isFirst = i === 0 ? true : false;
    let isLast = i === comments.length ? true : false;
    let hasReply = false;
    let isReply = false;
    let classNames =
      "bg-white p-6 text-base dark:bg-gray-900" +
      (!isFirst ? " border-gray-200 border-t dark:border-gray-700" : "") +
      (!isLast && !hasReply ? " mb-6" : "") +
      (isReply ? " ml-6 lg:ml-12" : "");
    const dropdownToggleID = `dropdownComment${String(comment.id)}`;
    const dropdownButtonID = `${dropdownToggleID}Button`;
    return (
      <article key={comment.id} className={classNames}>
        <footer className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
              <img
                className="mr-2 h-6 w-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Michael Gough"
              />
              Michael Gough
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate="" dateTime="2022-02-08" title="February 8th, 2022">
                Feb. 8, 2022
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
  });
  return <>{result}</>;
};
