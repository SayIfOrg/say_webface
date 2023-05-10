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
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /** GraphQL type for an integer that must be equal or greater than zero. */
  PositiveInt: any;
  /**
   * Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
};

export type BlockQuoteBlock = StreamFieldInterface & {
  __typename?: 'BlockQuoteBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type BooleanBlock = StreamFieldInterface & {
  __typename?: 'BooleanBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Boolean'];
};

export type CharBlock = StreamFieldInterface & {
  __typename?: 'CharBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ChoiceBlock = StreamFieldInterface & {
  __typename?: 'ChoiceBlock';
  blockType: Scalars['String'];
  choices: Array<ChoiceOption>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type ChoiceOption = {
  __typename?: 'ChoiceOption';
  key: Scalars['String'];
  value: Scalars['String'];
};

/** Collection type */
export type CollectionObjectType = {
  __typename?: 'CollectionObjectType';
  ancestors: Array<Maybe<CollectionObjectType>>;
  depth: Scalars['Int'];
  descendants: Array<Maybe<CollectionObjectType>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  numchild: Scalars['Int'];
  path: Scalars['String'];
};

export type DswImage = {
  __typename?: 'DSWImage';
  aspectRatio: Scalars['Float'];
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime'];
  file: Scalars['String'];
  fileHash: Scalars['String'];
  fileSize?: Maybe<Scalars['Int']>;
  focalPointHeight?: Maybe<Scalars['Int']>;
  focalPointWidth?: Maybe<Scalars['Int']>;
  focalPointX?: Maybe<Scalars['Int']>;
  focalPointY?: Maybe<Scalars['Int']>;
  height: Scalars['Int'];
  id?: Maybe<Scalars['ID']>;
  rendition?: Maybe<DswRendition>;
  sizes: Scalars['String'];
  /** @deprecated Use the `url` attribute */
  src: Scalars['String'];
  srcSet?: Maybe<Scalars['String']>;
  tags: Array<TagObjectType>;
  title: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};


export type DswImageRenditionArgs = {
  bgcolor?: InputMaybe<Scalars['String']>;
  fill?: InputMaybe<Scalars['String']>;
  format?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  jpegquality?: InputMaybe<Scalars['Int']>;
  max?: InputMaybe<Scalars['String']>;
  min?: InputMaybe<Scalars['String']>;
  webpquality?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};


export type DswImageSrcSetArgs = {
  format?: InputMaybe<Scalars['String']>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type DswRendition = {
  __typename?: 'DSWRendition';
  aspectRatio: Scalars['Float'];
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime'];
  customRenditionProperty: Scalars['String'];
  file: Scalars['String'];
  fileHash: Scalars['String'];
  fileSize?: Maybe<Scalars['Int']>;
  filterSpec: Scalars['String'];
  focalPointHeight?: Maybe<Scalars['Int']>;
  focalPointKey: Scalars['String'];
  focalPointWidth?: Maybe<Scalars['Int']>;
  focalPointX?: Maybe<Scalars['Int']>;
  focalPointY?: Maybe<Scalars['Int']>;
  height: Scalars['String'];
  id: Scalars['Int'];
  image: DswImage;
  sizes: Scalars['String'];
  /** @deprecated Use the `url` attribute */
  src: Scalars['String'];
  tags: Array<TagObjectType>;
  title: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['String'];
};

export type DateBlock = StreamFieldInterface & {
  __typename?: 'DateBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};


export type DateBlockValueArgs = {
  format?: InputMaybe<Scalars['String']>;
};

export type DateTimeBlock = StreamFieldInterface & {
  __typename?: 'DateTimeBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};


export type DateTimeBlockValueArgs = {
  format?: InputMaybe<Scalars['String']>;
};

export type DecimalBlock = StreamFieldInterface & {
  __typename?: 'DecimalBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Float'];
};

export type DocumentChooserBlock = StreamFieldInterface & {
  __typename?: 'DocumentChooserBlock';
  blockType: Scalars['String'];
  document: DocumentObjectType;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

/**
 * Base document type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type DocumentObjectType = {
  __typename?: 'DocumentObjectType';
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime'];
  file: Scalars['String'];
  fileHash: Scalars['String'];
  fileSize?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  site: SiteObjectType;
  tags: Array<TagObjectType>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type EmailBlock = StreamFieldInterface & {
  __typename?: 'EmailBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type EmbedBlock = StreamFieldInterface & {
  __typename?: 'EmbedBlock';
  blockType: Scalars['String'];
  embed?: Maybe<Scalars['String']>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawEmbed?: Maybe<Scalars['JSONString']>;
  rawValue: Scalars['String'];
  url: Scalars['String'];
  value: Scalars['String'];
};

export type FloatBlock = StreamFieldInterface & {
  __typename?: 'FloatBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Float'];
};

export type HomePage = PageInterface & {
  __typename?: 'HomePage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type HomePageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type HomePageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type HomePageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type HomePageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type HomePagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type HomePageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type ImageChooserBlock = StreamFieldInterface & {
  __typename?: 'ImageChooserBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  image: DswImage;
  rawValue: Scalars['String'];
};

export type ImageObjectType = {
  __typename?: 'ImageObjectType';
  aspectRatio: Scalars['Float'];
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime'];
  file: Scalars['String'];
  fileHash: Scalars['String'];
  fileSize?: Maybe<Scalars['Int']>;
  focalPointHeight?: Maybe<Scalars['Int']>;
  focalPointWidth?: Maybe<Scalars['Int']>;
  focalPointX?: Maybe<Scalars['Int']>;
  focalPointY?: Maybe<Scalars['Int']>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  rendition?: Maybe<DswRendition>;
  renditions: Array<ImageRenditionObjectType>;
  site: SiteObjectType;
  sizes: Scalars['String'];
  /** @deprecated Use the `url` attribute */
  src: Scalars['String'];
  srcSet?: Maybe<Scalars['String']>;
  tags: Array<TagObjectType>;
  title: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};


export type ImageObjectTypeRenditionArgs = {
  bgcolor?: InputMaybe<Scalars['String']>;
  fill?: InputMaybe<Scalars['String']>;
  format?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  jpegquality?: InputMaybe<Scalars['Int']>;
  max?: InputMaybe<Scalars['String']>;
  min?: InputMaybe<Scalars['String']>;
  webpquality?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};


export type ImageObjectTypeSrcSetArgs = {
  format?: InputMaybe<Scalars['String']>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type ImageRenditionObjectType = {
  __typename?: 'ImageRenditionObjectType';
  aspectRatio: Scalars['Float'];
  collection: CollectionObjectType;
  createdAt: Scalars['DateTime'];
  file: Scalars['String'];
  fileHash: Scalars['String'];
  fileSize?: Maybe<Scalars['Int']>;
  filterSpec: Scalars['String'];
  focalPointHeight?: Maybe<Scalars['Int']>;
  focalPointKey: Scalars['String'];
  focalPointWidth?: Maybe<Scalars['Int']>;
  focalPointX?: Maybe<Scalars['Int']>;
  focalPointY?: Maybe<Scalars['Int']>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  image: DswImage;
  sizes: Scalars['String'];
  /** @deprecated Use the `url` attribute */
  src: Scalars['String'];
  tags: Array<TagObjectType>;
  title: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type IntegerBlock = StreamFieldInterface & {
  __typename?: 'IntegerBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['Int'];
};

export type ListBlock = StreamFieldInterface & {
  __typename?: 'ListBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  items: Array<StreamFieldInterface>;
  rawValue: Scalars['String'];
};

/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type Page = PageInterface & {
  __typename?: 'Page';
  aliasOf?: Maybe<Page>;
  aliases: Array<Page>;
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  homepage?: Maybe<HomePage>;
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  simplepage?: Maybe<SimplePage>;
  sitesRootedHere: Array<SiteObjectType>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


/**
 * Base Page type used if one isn't generated for the current model.
 * All other node types extend this.
 */
export type PageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type PageChooserBlock = StreamFieldInterface & {
  __typename?: 'PageChooserBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  page: PageInterface;
  rawValue: Scalars['String'];
};

export type PageInterface = {
  ancestors: Array<PageInterface>;
  children: Array<PageInterface>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  nextSiblings: Array<PageInterface>;
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type PageInterfaceAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfaceChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfaceDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfaceNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfacePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type PageInterfaceSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  collections: Array<Maybe<CollectionObjectType>>;
  document?: Maybe<DocumentObjectType>;
  documentType: Scalars['String'];
  documents: Array<DocumentObjectType>;
  image?: Maybe<DswImage>;
  imageType: Scalars['String'];
  images: Array<DswImage>;
  page?: Maybe<PageInterface>;
  pages: Array<PageInterface>;
  redirects: Array<RedirectType>;
  search: Array<Search>;
  site?: Maybe<SiteObjectType>;
  sites: Array<SiteObjectType>;
  tag?: Maybe<TagObjectType>;
  tags: Array<TagObjectType>;
};


export type QueryCollectionsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
};


export type QueryDocumentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryDocumentsArgs = {
  collection?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type QueryImageArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryImagesArgs = {
  collection?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type QueryPageArgs = {
  contentType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  inSite?: InputMaybe<Scalars['Boolean']>;
  site?: InputMaybe<Scalars['String']>;
  sitename?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  urlPath?: InputMaybe<Scalars['String']>;
};


export type QueryPagesArgs = {
  ancestor?: InputMaybe<Scalars['ID']>;
  contentType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  inSite?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  searchQuery?: InputMaybe<Scalars['String']>;
  site?: InputMaybe<Scalars['String']>;
  sitename?: InputMaybe<Scalars['String']>;
};


export type QuerySearchArgs = {
  query?: InputMaybe<Scalars['String']>;
};


export type QuerySiteArgs = {
  hostname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type QuerySitesArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type QueryTagArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryTagsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
};

export type RawHtmlBlock = StreamFieldInterface & {
  __typename?: 'RawHTMLBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type RedirectType = {
  __typename?: 'RedirectType';
  isPermanent: Scalars['Boolean'];
  newUrl: Scalars['String'];
  oldPath: Scalars['String'];
  oldUrl: Scalars['String'];
  page?: Maybe<PageInterface>;
};

export type RegexBlock = StreamFieldInterface & {
  __typename?: 'RegexBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type RichTextBlock = StreamFieldInterface & {
  __typename?: 'RichTextBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type Search = DswImage | DswRendition | HomePage | Page | SimplePage;

export type SimplePage = PageInterface & {
  __typename?: 'SimplePage';
  aliasOf?: Maybe<Page>;
  ancestors: Array<PageInterface>;
  body?: Maybe<Array<Maybe<StreamFieldInterface>>>;
  children: Array<PageInterface>;
  contentType: Scalars['String'];
  depth?: Maybe<Scalars['Int']>;
  descendants: Array<PageInterface>;
  draftTitle: Scalars['String'];
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  goLiveAt?: Maybe<Scalars['DateTime']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  latestRevisionCreatedAt?: Maybe<Scalars['DateTime']>;
  live: Scalars['Boolean'];
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['DateTime']>;
  nextSiblings: Array<PageInterface>;
  numchild: Scalars['Int'];
  pageType?: Maybe<Scalars['String']>;
  parent?: Maybe<PageInterface>;
  path: Scalars['String'];
  previousSiblings: Array<PageInterface>;
  searchDescription?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  seoTitle: Scalars['String'];
  showInMenus: Scalars['Boolean'];
  siblings: Array<PageInterface>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translationKey: Scalars['UUID'];
  url?: Maybe<Scalars['String']>;
  urlPath: Scalars['String'];
};


export type SimplePageAncestorsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type SimplePageChildrenArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type SimplePageDescendantsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type SimplePageNextSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type SimplePagePreviousSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type SimplePageSiblingsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type SiteObjectType = {
  __typename?: 'SiteObjectType';
  hostname: Scalars['String'];
  id: Scalars['ID'];
  page?: Maybe<PageInterface>;
  pages: Array<PageInterface>;
  /** Set this to something other than 80 if you need a specific port number to appear in URLs (e.g. development on port 8000). Does not affect request handling (so port forwarding still works). */
  port: Scalars['Int'];
  rootPage: Page;
  siteDocument: Array<DocumentObjectType>;
  siteDswimage: Array<DswImage>;
  siteImage: Array<ImageObjectType>;
  /** Human-readable name for the site. */
  siteName: Scalars['String'];
  /** The username for the site. */
  sitename: Scalars['String'];
};


export type SiteObjectTypePageArgs = {
  contentType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  urlPath?: InputMaybe<Scalars['String']>;
};


export type SiteObjectTypePagesArgs = {
  contentType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['PositiveInt']>;
  order?: InputMaybe<Scalars['String']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type StaticBlock = StreamFieldInterface & {
  __typename?: 'StaticBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type StreamBlock = StreamFieldInterface & {
  __typename?: 'StreamBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type StreamFieldBlock = StreamFieldInterface & {
  __typename?: 'StreamFieldBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type StreamFieldInterface = {
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type StructBlock = StreamFieldInterface & {
  __typename?: 'StructBlock';
  blockType: Scalars['String'];
  blocks: Array<StreamFieldInterface>;
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
};

export type TagObjectType = {
  __typename?: 'TagObjectType';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TextBlock = StreamFieldInterface & {
  __typename?: 'TextBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

export type TimeBlock = StreamFieldInterface & {
  __typename?: 'TimeBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};


export type TimeBlockValueArgs = {
  format?: InputMaybe<Scalars['String']>;
};

export type UrlBlock = StreamFieldInterface & {
  __typename?: 'URLBlock';
  blockType: Scalars['String'];
  field: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  rawValue: Scalars['String'];
  value: Scalars['String'];
};

type PageFullItem_HomePage_Fragment = { __typename: 'HomePage', title: string } & { ' $fragmentName'?: 'PageFullItem_HomePage_Fragment' };

type PageFullItem_Page_Fragment = { __typename: 'Page', title: string } & { ' $fragmentName'?: 'PageFullItem_Page_Fragment' };

type PageFullItem_SimplePage_Fragment = { __typename: 'SimplePage', title: string, body?: Array<{ __typename: 'BlockQuoteBlock', id?: string | null } | { __typename: 'BooleanBlock', id?: string | null } | { __typename: 'CharBlock', value: string, id?: string | null } | { __typename: 'ChoiceBlock', id?: string | null } | { __typename: 'DateBlock', id?: string | null } | { __typename: 'DateTimeBlock', id?: string | null } | { __typename: 'DecimalBlock', id?: string | null } | { __typename: 'DocumentChooserBlock', id?: string | null } | { __typename: 'EmailBlock', id?: string | null } | { __typename: 'EmbedBlock', id?: string | null } | { __typename: 'FloatBlock', id?: string | null } | { __typename: 'ImageChooserBlock', id?: string | null, image: { __typename?: 'DSWImage', id?: string | null, rendition?: { __typename?: 'DSWRendition', url: string } | null } } | { __typename: 'IntegerBlock', id?: string | null } | { __typename: 'ListBlock', id?: string | null } | { __typename: 'PageChooserBlock', id?: string | null } | { __typename: 'RawHTMLBlock', id?: string | null } | { __typename: 'RegexBlock', id?: string | null } | { __typename: 'RichTextBlock', value: string, id?: string | null } | { __typename: 'StaticBlock', id?: string | null } | { __typename: 'StreamBlock', id?: string | null } | { __typename: 'StreamFieldBlock', id?: string | null } | { __typename: 'StructBlock', id?: string | null } | { __typename: 'TextBlock', id?: string | null } | { __typename: 'TimeBlock', id?: string | null } | { __typename: 'URLBlock', id?: string | null } | null> | null } & { ' $fragmentName'?: 'PageFullItem_SimplePage_Fragment' };

export type PageFullItemFragment = PageFullItem_HomePage_Fragment | PageFullItem_Page_Fragment | PageFullItem_SimplePage_Fragment;

export type GetPageByPathQueryVariables = Exact<{
  sitename: Scalars['String'];
  path?: InputMaybe<Scalars['String']>;
  content_type?: InputMaybe<Scalars['String']>;
}>;


export type GetPageByPathQuery = { __typename?: 'Query', page?: (
    { __typename?: 'HomePage' }
    & { ' $fragmentRefs'?: { 'PageFullItem_HomePage_Fragment': PageFullItem_HomePage_Fragment } }
  ) | (
    { __typename?: 'Page' }
    & { ' $fragmentRefs'?: { 'PageFullItem_Page_Fragment': PageFullItem_Page_Fragment } }
  ) | (
    { __typename?: 'SimplePage' }
    & { ' $fragmentRefs'?: { 'PageFullItem_SimplePage_Fragment': PageFullItem_SimplePage_Fragment } }
  ) | null };

export type GetPagesByTypeQueryVariables = Exact<{
  sitename: Scalars['String'];
  content_type: Scalars['String'];
}>;


export type GetPagesByTypeQuery = { __typename?: 'Query', pages: Array<{ __typename?: 'HomePage', id?: string | null, title: string, url?: string | null } | { __typename?: 'Page', id?: string | null, title: string, url?: string | null } | { __typename?: 'SimplePage', id?: string | null, title: string, url?: string | null }> };

export type GetRenditionQueryVariables = Exact<{
  imageId: Scalars['ID'];
  fill?: InputMaybe<Scalars['String']>;
  min?: InputMaybe<Scalars['String']>;
  max?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
  format?: InputMaybe<Scalars['String']>;
}>;


export type GetRenditionQuery = { __typename?: 'Query', image?: { __typename?: 'DSWImage', rendition?: { __typename?: 'DSWRendition', url: string } | null } | null };

export const PageFullItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageFullItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimplePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RichTextBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CharBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageChooserBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rendition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fill"},"value":{"kind":"StringValue","value":"500x400","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PageFullItemFragment, unknown>;
export const GetPageByPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPageByPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sitename"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content_type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sitename"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sitename"}}},{"kind":"Argument","name":{"kind":"Name","value":"urlPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}},{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content_type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageFullItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageFullItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimplePage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RichTextBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CharBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageChooserBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rendition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fill"},"value":{"kind":"StringValue","value":"500x400","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPageByPathQuery, GetPageByPathQueryVariables>;
export const GetPagesByTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPagesByType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sitename"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content_type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sitename"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sitename"}}},{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content_type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetPagesByTypeQuery, GetPagesByTypeQueryVariables>;
export const GetRenditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRendition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fill"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"min"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"max"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"height"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"width"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"format"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rendition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fill"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fill"}}},{"kind":"Argument","name":{"kind":"Name","value":"min"},"value":{"kind":"Variable","name":{"kind":"Name","value":"min"}}},{"kind":"Argument","name":{"kind":"Name","value":"max"},"value":{"kind":"Variable","name":{"kind":"Name","value":"max"}}},{"kind":"Argument","name":{"kind":"Name","value":"height"},"value":{"kind":"Variable","name":{"kind":"Name","value":"height"}}},{"kind":"Argument","name":{"kind":"Name","value":"width"},"value":{"kind":"Variable","name":{"kind":"Name","value":"width"}}},{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"Variable","name":{"kind":"Name","value":"format"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetRenditionQuery, GetRenditionQueryVariables>;