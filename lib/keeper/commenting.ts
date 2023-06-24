import { graphql } from "../../src/gql/keeper";

// Subscribe to the latest comments SubscriptionDocument
// TODO find a way to not have duplicated queries!!
export const latestComments = `
	subscription latestComments {
		latestComment {
			id
      userID
			content
		}
	}
`;
export const CommentsSD = graphql(`
  subscription latestComments {
    latestComment {
      id
      userID
      content
    }
  }
`);
