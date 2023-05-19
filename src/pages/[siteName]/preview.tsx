import { GetServerSidePropsContext } from "next";
import {
  PageFullFieldsFragment,
  getByPath,
  getPreview,
} from "../../../lib/posts";
import { z } from "zod";
import Page from "./[...slug]";
import { FragmentType } from "../../gql/wagtail";
import HomePage from ".";

interface Props {
  siteName: string;
  page: FragmentType<typeof PageFullFieldsFragment>;
  contentType: string;
}
const PreviewPage = (props: Props) => {
  if (props.contentType === "home.homepage") {
    return <HomePage page={props.page} siteName={props.siteName}></HomePage>;
  }
  return <Page siteName={props.siteName} page={props.page}></Page>;
};

const querySchema = z.object({
  token: z.string(),
  content_type: z.string(),
});

export async function getServerSideProps({
  params,
  query,
}: GetServerSidePropsContext<{ siteName: string }>) {
  if (!params) return { notFound: true };
  const parsedQuery = querySchema.safeParse(query);
  if (!parsedQuery.success) return { notFound: true };
  const { token, content_type: contentType } = parsedQuery.data;
  if (!params.siteName.startsWith("@")) return { notFound: true };
  let { page } = await getPreview(params.siteName.substring(1), token);
  if (!page) return { notFound: true };
  return {
    props: { page, siteName: params.siteName, contentType },
  };
}

export default PreviewPage;
