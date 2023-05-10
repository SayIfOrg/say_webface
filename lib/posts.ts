import request from "graphql-request";
import { env } from "../src/env/server.mjs";
import { graphql } from "../src/gql/wagtail";

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
        id
        __typename
        ... on RichTextBlock {
          value
        }
        ... on CharBlock {
          value
        }
        ... on ImageChooserBlock {
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
  query getPageByPath($sitename: String!, $path: String, $content_type: String) {
    page(sitename: $sitename, urlPath: $path, contentType: $content_type) {
      ...PageFullItem
    }
  }
`);

export async function getByPath(sitename: string, path: string) {
  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, PageFullFieldsQD, {
    sitename: sitename,
    path: path,
  });
}

const pageTypeMapping = {
  post: ["super_page.SimplePage"],
  home: ["home.HomePage"],
};

// Filterable pages with their base fields QueryDocument
export const PagesBaseFieldsQD = graphql(`
  query getPagesByType($sitename: String!, $content_type: String!) {
    pages(sitename: $sitename, contentType: $content_type) {
      id
      title
      url
    }
  }
`);

export function getPagesByType(sitename: string, type: keyof typeof pageTypeMapping) {
  const typeQuery = pageTypeMapping[type].join(",");

  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, PagesBaseFieldsQD, {
    sitename: sitename,
    content_type: typeQuery,
  });
}

export function getPageByType(sitename: string, type: keyof typeof pageTypeMapping) {
  const typeQuery = pageTypeMapping[type].join(",");

  return request(env.NEXT_PUBLIC_SAY_WAGTAIL_GQL_URL, PageFullFieldsQD, {
    sitename: sitename,
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
