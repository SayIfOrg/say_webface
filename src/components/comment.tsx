import { createClient } from "graphql-ws";
import { useEffect, useState } from "react";
import { subscribe } from "../../lib/clients";
import { env } from "../env/client.mjs";
import { Comment as GComment } from "../gql/keeper/graphql";

export const Comment = () => {
  type Comment = {
    id: string;
    content: string;
  };
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const client = createClient({
      url: `ws://${env.NEXT_PUBLIC_SAY_KEEPER_GQL_ADDRESS}`,
    });
    type Subscription = {
      data: {
        latestComment: GComment;
      };
    };
    const subscription = subscribe<Subscription>(client, {
      query: `
			subscription {
				latestComment {
					id
					content
				}
			}
			`,
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
