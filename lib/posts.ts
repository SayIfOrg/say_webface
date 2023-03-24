export interface Page {
  id?: string;
  title?: string;
  slug?: string;
  url?: string;
  seoTitle?: string;
  body?: any;
}

export interface HomePage {
  title: string;
}

export interface GraphqlError {
  message: string;
}

export async function getByPath(path: string) {
  let response = await fetch("http://127.0.0.1:8000/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
			query {
				page(urlPath: "${path}") {
					title
					... on SimplePage {
						body {
							... on RichTextBlock {
								id
								blockType
								value
							}
							... on CharBlock {
								id
								blockType
								value
							}
							...on ImageChooserBlock {
								id
								blockType
								image {
									rendition(fill: "500x400") {
										url
									}
								}
							}
						}
					}
				}
			}
			`,
    }),
  });
  let json = await response.json();
  return { page: json.data.page ?? null, errors: json.errors ?? [] } as {
    page: Page | null;
    errors: GraphqlError[];
  };
}

const pageTypeMapping = {
  post: ["super_page.SimplePage"],
  home: ["home.HomePage"],
};

export async function getPagesByType(type: keyof typeof pageTypeMapping) {
  const typeQuery = pageTypeMapping[type].join(",");
  let response = await fetch("http://127.0.0.1:8000/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
			query {
				pages(contentType: "${typeQuery}") {
					id
					title
					url
				}
			}
			`,
    }),
  });
  let json = await response.json();
  return { pages: json.data.pages ?? [], errors: json.errors ?? [] } as {
    pages: Page[];
    errors: GraphqlError[];
  };
}

export async function getRendition(args: { imageId: number; fill: string }) {
  let imageId = args.imageId;
  let fill = args.fill;
  let response = await fetch("http://127.0.0.1:8000/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
							query {
								image(id: ${imageId}) {
									rendition(fill: "${fill}") {
										url
									}
								}
							}
							`,
    }),
  });
  let json = await response.json();
  return {
    url: json.data.image.rendition.url ?? null,
    errors: json.errors ?? [],
  } as { url: string | null; errors: GraphqlError[] };
}
