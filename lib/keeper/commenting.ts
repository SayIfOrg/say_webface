import request from "graphql-request";
import { graphql } from "../../src/gql/keeper";
import { env } from "../../src/env/server.mjs";

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
