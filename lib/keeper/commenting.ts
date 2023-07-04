import request from "graphql-request";
import { graphql } from "../../src/gql/keeper";
import { env } from "../../src/env/server.mjs";
import { getUsersByID } from "../wagtail/account";
import { useState } from "react";
import { LatestCommentsSubscription } from "../../src/gql/keeper/graphql";
import { UserType, UsersByIDsQuery } from "../../src/gql/wagtail/graphql";
import { useQuery } from "@tanstack/react-query";
import { getNodeID } from "../utils";

// Subscribe to the latest comments SubscriptionDocument
// TODO find a way to not have duplicated queries!!
export const latestComments = `
	subscription latestComments {
		latestComment {
			id
      userID
			content
      createdAt
		}
	}
`;
export const CommentsSD = graphql(`
  subscription latestComments {
    latestComment {
      id
      userID
      content
      createdAt
    }
  }
`);

// Filterable pages with their base fields QueryDocument
export const AllComments = graphql(`
  query allComments {
    comments {
      id
      userID
      content
      createdAt
    }
  }
`);

export function getAllComments() {
  return request(
    `http://${env.NEXT_PUBLIC_SAY_KEEPER_GQL_ADDRESS}`,
    AllComments
  );
}

export type CommentType = LatestCommentsSubscription["latestComment"] & {
  user: UserType | null;
};

export const useComments = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  let { isLoading, isFetchedAfterMount } = useQuery({
    queryFn: getAllComments,
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      let fetchedComments = res.comments.map((c) => {
        return { ...c, user: null };
      });
      getUsersByID(fetchedComments.map((c) => c.userID)).then((value) =>
        handleCommentUser(value)
      );
      setComments((comments) => {
        return isFetchedAfterMount
          ? fetchedComments
          : [...fetchedComments, ...comments];
      });
    },
  });

  const handleCommentUser = (usersEdgeNode: UsersByIDsQuery) => {
    let dUsers = usersEdgeNode.users
      ? usersEdgeNode.users.edges.map((u) => u?.node)
      : [];
    let users = dUsers.map((u) => {
      if (!u) return null;
      return { ...u, id: getNodeID(u.id) };
    });

    // @ts-expect-error
    setComments((comments) => {
      return comments.map((c) => {
        let correspondingUser = users.find((u) => u?.id === c.userID);
        return correspondingUser ? { ...c, user: correspondingUser } : c;
      });
    });
  };

  function handleNewComment(latestComment: CommentType) {
    getUsersByID([latestComment.userID]).then((value) =>
      handleCommentUser(value)
    );
    setComments((pervComments) => [...pervComments, latestComment]);
  }
  return { comments, handleNewComment, isLoading };
};
