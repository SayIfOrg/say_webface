import request from "graphql-request";
import { graphql } from "../../src/gql/wagtail";
import { env } from "../../src/env/server.mjs";

export const usersByIDsMD = graphql(`
  query usersByIDs($IDs: [ID]!) {
    users(id_In: $IDs) {
      edges {
        node {
          id
          username
          firstName
          lastName
          profile {
            avatar {
              rendition(max: "50x50") {
                url
              }
            }
          }
        }
      }
    }
  }
`);

export function getUsersByID(ids: string[]) {
  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, usersByIDsMD, {
    IDs: ids,
  });
}
