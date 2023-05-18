export function normalizePageUrl(url: string) {
  // getting ride of HomePage part
  return "/" + url.split("/").slice(2).join("/");
}
