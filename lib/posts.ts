import request from "graphql-request";
import { env } from "../src/env/server.mjs";
import { graphql } from "../src/gql";

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

// Get a page by path variable QueryDocument
export const PageFullFieldsQD = graphql(`
  query getPageByPath($path: String!) {
    page(urlPath: $path) {
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
          ... on ImageChooserBlock {
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
`);

export async function getByPath(path: string) {
  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, PageFullFieldsQD, {
    path: path,
  });
}

const pageTypeMapping = {
  post: ["super_page.SimplePage"],
  home: ["home.HomePage"],
};

// Filterable pages with their base fields QueryDocument
export const PagesBaseFieldsQD = graphql(`
  query getPagesByType($content_type: String) {
    pages(contentType: $content_type) {
      id
      title
      url
    }
  }
`);

export function getPagesByType(type: keyof typeof pageTypeMapping) {
  const typeQuery = pageTypeMapping[type].join(",");

  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, PagesBaseFieldsQD, {
    content_type: typeQuery,
  });
}

export async function getRendition(args: { imageId: number; fill: string }) {
  let imageId = args.imageId;
  let fill = args.fill;
  let response = await fetch(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, {
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
