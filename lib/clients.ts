import { Client, SubscribePayload } from "graphql-ws";

// See https://the-guild.dev/graphql/ws/recipes#client-usage-with-asynciterator
// the below function is identical to that(pretty much)
export function subscribe<T>(
  client: Client,
  payload: SubscribePayload
): AsyncGenerator<T, void> {
  // Subscribe to a graphql websocket client
  
  let deferred: {
    resolve: (done: boolean) => void;
    reject: (err: unknown) => void;
  } | null = null;
  const pending: T[] = [];
  let throwMe: unknown = null,
    done = false;
  const dispose = client.subscribe<T>(payload, {
    next: (data) => {
      // @ts-expect-error
      pending.push(data);
      deferred?.resolve(false);
    },
    error: (err) => {
      throwMe = err;
      deferred?.reject(throwMe);
    },
    complete: () => {
      done = true;
      deferred?.resolve(true);
    },
  });
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      if (done) return { done: true, value: undefined };
      if (throwMe) throw throwMe;
      if (pending.length) return { value: pending.shift()! };
      return (await new Promise<boolean>(
        (resolve, reject) => (deferred = { resolve, reject })
      ))
        ? { done: true, value: undefined }
        : { value: pending.shift()! };
    },
    async throw(err) {
      throw err;
    },
    async return() {
      dispose();
      return { done: true, value: undefined };
    },
  };
}
