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
    "\n  fragment PageFullFieldsFragment on PageInterface {\n    title\n    __typename\n    ... on SimplePage {\n      ...SimplePageFragment\n    }\n    ... on ListingPage {\n      ...ListingPageFragment\n    }\n  }\n": types.PageFullFieldsFragmentFragmentDoc,
    "\n  fragment SimplePageFragment on SimplePage {\n    body {\n      id\n      __typename\n      ... on RichTextBlock {\n        value\n      }\n      ... on CharBlock {\n        value\n      }\n      ... on ImageChooserBlock {\n        image {\n          id\n          rendition(fill: \"500x400\") {\n            url\n          }\n        }\n      }\n    }\n  }\n": types.SimplePageFragmentFragmentDoc,
    "\n  fragment ListingPageFragment on ListingPage {\n    depth\n    listedPages {\n      __typename\n      id\n      title\n      url\n    }\n  }\n": types.ListingPageFragmentFragmentDoc,
    "\n  query getPageByPath(\n    $sitename: String!\n    $path: String\n    $content_type: String\n    $token: String\n  ) {\n    page(\n      sitename: $sitename\n      urlPath: $path\n      contentType: $content_type\n      token: $token\n    ) {\n      ...PageFullFieldsFragment\n    }\n  }\n": types.GetPageByPathDocument,
    "\n  query getPagesByType($sitename: String!, $content_type: String!) {\n    pages(sitename: $sitename, contentType: $content_type) {\n      id\n      title\n      url\n    }\n  }\n": types.GetPagesByTypeDocument,
    "\n  query getRendition(\n    $imageId: ID!\n    $fill: String\n    $min: String\n    $max: String\n    $height: Int\n    $width: Int\n    $format: String\n  ) {\n    image(id: $imageId) {\n      rendition(\n        fill: $fill\n        min: $min\n        max: $max\n        height: $height\n        width: $width\n        format: $format\n      ) {\n        url\n      }\n    }\n  }\n": types.GetRenditionDocument,
    "\n  query usersByIDs($IDs: [ID]!) {\n    users(id_In: $IDs) {\n      edges {\n        node {\n          id\n          username\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": types.UsersByIDsDocument,
    "\n  mutation login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      refreshExpiresIn\n      token\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation isTokenValid($token: String!) {\n    verifyToken(token: $token) {\n      payload\n    }\n  }\n": types.IsTokenValidDocument,
    "\n  mutation refreshTheToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n    }\n  }\n": types.RefreshTheTokenDocument,
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
export function graphql(source: "\n  fragment PageFullFieldsFragment on PageInterface {\n    title\n    __typename\n    ... on SimplePage {\n      ...SimplePageFragment\n    }\n    ... on ListingPage {\n      ...ListingPageFragment\n    }\n  }\n"): (typeof documents)["\n  fragment PageFullFieldsFragment on PageInterface {\n    title\n    __typename\n    ... on SimplePage {\n      ...SimplePageFragment\n    }\n    ... on ListingPage {\n      ...ListingPageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimplePageFragment on SimplePage {\n    body {\n      id\n      __typename\n      ... on RichTextBlock {\n        value\n      }\n      ... on CharBlock {\n        value\n      }\n      ... on ImageChooserBlock {\n        image {\n          id\n          rendition(fill: \"500x400\") {\n            url\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment SimplePageFragment on SimplePage {\n    body {\n      id\n      __typename\n      ... on RichTextBlock {\n        value\n      }\n      ... on CharBlock {\n        value\n      }\n      ... on ImageChooserBlock {\n        image {\n          id\n          rendition(fill: \"500x400\") {\n            url\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ListingPageFragment on ListingPage {\n    depth\n    listedPages {\n      __typename\n      id\n      title\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment ListingPageFragment on ListingPage {\n    depth\n    listedPages {\n      __typename\n      id\n      title\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPageByPath(\n    $sitename: String!\n    $path: String\n    $content_type: String\n    $token: String\n  ) {\n    page(\n      sitename: $sitename\n      urlPath: $path\n      contentType: $content_type\n      token: $token\n    ) {\n      ...PageFullFieldsFragment\n    }\n  }\n"): (typeof documents)["\n  query getPageByPath(\n    $sitename: String!\n    $path: String\n    $content_type: String\n    $token: String\n  ) {\n    page(\n      sitename: $sitename\n      urlPath: $path\n      contentType: $content_type\n      token: $token\n    ) {\n      ...PageFullFieldsFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPagesByType($sitename: String!, $content_type: String!) {\n    pages(sitename: $sitename, contentType: $content_type) {\n      id\n      title\n      url\n    }\n  }\n"): (typeof documents)["\n  query getPagesByType($sitename: String!, $content_type: String!) {\n    pages(sitename: $sitename, contentType: $content_type) {\n      id\n      title\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRendition(\n    $imageId: ID!\n    $fill: String\n    $min: String\n    $max: String\n    $height: Int\n    $width: Int\n    $format: String\n  ) {\n    image(id: $imageId) {\n      rendition(\n        fill: $fill\n        min: $min\n        max: $max\n        height: $height\n        width: $width\n        format: $format\n      ) {\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRendition(\n    $imageId: ID!\n    $fill: String\n    $min: String\n    $max: String\n    $height: Int\n    $width: Int\n    $format: String\n  ) {\n    image(id: $imageId) {\n      rendition(\n        fill: $fill\n        min: $min\n        max: $max\n        height: $height\n        width: $width\n        format: $format\n      ) {\n        url\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query usersByIDs($IDs: [ID]!) {\n    users(id_In: $IDs) {\n      edges {\n        node {\n          id\n          username\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query usersByIDs($IDs: [ID]!) {\n    users(id_In: $IDs) {\n      edges {\n        node {\n          id\n          username\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      refreshExpiresIn\n      token\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      refreshExpiresIn\n      token\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation isTokenValid($token: String!) {\n    verifyToken(token: $token) {\n      payload\n    }\n  }\n"): (typeof documents)["\n  mutation isTokenValid($token: String!) {\n    verifyToken(token: $token) {\n      payload\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation refreshTheToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation refreshTheToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;