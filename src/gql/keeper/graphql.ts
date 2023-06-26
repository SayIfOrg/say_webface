/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type Comment = {
  __typename?: 'Comment';
  agent: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  replies: Array<Maybe<Comment>>;
  replyTo?: Maybe<Comment>;
  replyToID?: Maybe<Scalars['ID']>;
  updatedAt: Scalars['Time'];
  userID: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
};


export type MutationCreateCommentArgs = {
  comment: NewComment;
};

export type NewComment = {
  agent: Scalars['String'];
  content: Scalars['String'];
  replyToID?: InputMaybe<Scalars['ID']>;
  userID: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Maybe<Comment>>;
  users: Array<Maybe<User>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  latestComment: Comment;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LatestCommentsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type LatestCommentsSubscription = { __typename?: 'Subscription', latestComment: { __typename?: 'Comment', id: string, userID: string, content: string, createdAt: any } };


export const LatestCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"latestComments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latestComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userID"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<LatestCommentsSubscription, LatestCommentsSubscriptionVariables>;