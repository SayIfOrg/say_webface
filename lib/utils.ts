export function normalizePageUrl(url: string) {
  // getting ride of HomePage part
  return "/" + url.split("/").slice(2).join("/");
}

export function getNodeID(relayID: string) {
  let result = atob(relayID).split(":")[1];
  if (typeof result !== "string") {
    throw new Error("base64 id is not valid");
  }
  return result;
}
