import { createClient } from "graphql-ws";
import { createClient as createSSEClient } from "graphql-sse";
import { useEffect, useState } from "react";
import { subscribeWS, subscribeSSE } from "../../lib/clients";
import { env } from "../env/client.mjs";
import { LatestCommentsSubscription } from "../gql/keeper/graphql";
import { latestComments } from "../../lib/keeper/commenting";

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

  return (
    <div>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.content}</p>
      ))}
    </div>
  );
};
