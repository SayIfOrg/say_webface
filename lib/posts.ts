import request from "graphql-request";
import { env } from "../src/env/server.mjs";
import { graphql } from "../src/gql";

export interface GraphqlError {
  message: string;
}

// Page fragment with all fields
export const PageFullFieldsFragment = graphql(`
  fragment PageFullItem on PageInterface {
    title
    __typename
    ... on SimplePage {
      body {
        __typename
        ... on RichTextBlock {
          id
          value
        }
        ... on CharBlock {
          id
          value
        }
        ... on ImageChooserBlock {
          id
          image {
            id
            rendition(fill: "500x400") {
              url
            }
          }
        }
      }
    }
  }
`);

// Get a page by path variable QueryDocument
export const PageFullFieldsQD = graphql(`
  query getPageByPath($path: String!) {
    page(urlPath: $path) {
      ...PageFullItem
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

// Filterable pages with their base fields QueryDocument
export const RenditionQD = graphql(`
  query getRendition(
    $imageId: ID!
    $fill: String
    $min: String
    $max: String
    $height: Int
    $width: Int
    $format: String
  ) {
    image(id: $imageId) {
      rendition(
        fill: $fill
        min: $min
        max: $max
        height: $height
        width: $width
        format: $format
      ) {
        url
      }
    }
  }
`);

export async function getRendition(
  imageId: string,
  sizing: {
    fill?: string;
    min?: string;
    max?: string;
    height?: number;
    width?: number;
  }, 
  format?: "jpeg" | "png" | "gif" | "webp"
) {
  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, RenditionQD, {
    imageId: imageId,
    fill: sizing.fill,
    min: sizing.min,
    max: sizing.max,
    height: sizing.height,
    width: sizing.width,
    format: format,
  });
}
