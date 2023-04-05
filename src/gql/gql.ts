/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment PageFullItem on PageInterface {\n    title\n    __typename\n    ... on SimplePage {\n      body {\n        __typename\n        ... on RichTextBlock {\n          id\n          value\n        }\n        ... on CharBlock {\n          id\n          value\n        }\n        ... on ImageChooserBlock {\n          id\n          image {\n            id\n            rendition(fill: \"500x400\") {\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n": types.PageFullItemFragmentDoc,
    "\n  query getPageByPath($path: String!) {\n    page(urlPath: $path) {\n      ...PageFullItem\n    }\n  }\n": types.GetPageByPathDocument,
    "\n  query getPagesByType($content_type: String) {\n    pages(contentType: $content_type) {\n      id\n      title\n      url\n    }\n  }\n": types.GetPagesByTypeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageFullItem on PageInterface {\n    title\n    __typename\n    ... on SimplePage {\n      body {\n        __typename\n        ... on RichTextBlock {\n          id\n          value\n        }\n        ... on CharBlock {\n          id\n          value\n        }\n        ... on ImageChooserBlock {\n          id\n          image {\n            id\n            rendition(fill: \"500x400\") {\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PageFullItem on PageInterface {\n    title\n    __typename\n    ... on SimplePage {\n      body {\n        __typename\n        ... on RichTextBlock {\n          id\n          value\n        }\n        ... on CharBlock {\n          id\n          value\n        }\n        ... on ImageChooserBlock {\n          id\n          image {\n            id\n            rendition(fill: \"500x400\") {\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPageByPath($path: String!) {\n    page(urlPath: $path) {\n      ...PageFullItem\n    }\n  }\n"): (typeof documents)["\n  query getPageByPath($path: String!) {\n    page(urlPath: $path) {\n      ...PageFullItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPagesByType($content_type: String) {\n    pages(contentType: $content_type) {\n      id\n      title\n      url\n    }\n  }\n"): (typeof documents)["\n  query getPagesByType($content_type: String) {\n    pages(contentType: $content_type) {\n      id\n      title\n      url\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;