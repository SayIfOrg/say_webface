import { GetServerSidePropsContext } from "next";
import { getByPath, PageFullFieldsFragment } from "../../../lib/posts";
import { Paragraph, Image } from "../../components/basicBlocks";
import { FragmentType, useFragment } from "../../gql/wagtail/fragment-masking";
import { SSEComment, WSComment } from "../../components/comment";
import { ListingPage } from "../../components/ListingPage";
import { SimplePage } from "../../components/SimplePage";

interface Props {
  page: FragmentType<typeof PageFullFieldsFragment>;
  siteName: string;
}

const Page = (props: Props) => {
  const page = useFragment(PageFullFieldsFragment, props.page);
  if (page.__typename === "ListingPage") {
    return <ListingPage page={page} siteName={props.siteName}></ListingPage>;
  } else if (page.__typename === "SimplePage") {
    return <SimplePage siteName={props.siteName} page={page}></SimplePage>;
  } else {
    return <p>this page is not Registered</p>;
  }
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ siteName: string; slug: string[] }>) {
  if (!params) return { notFound: true };
  if (!params.siteName.startsWith("@")) return { notFound: true };
  let path = params.slug.join("/");
  let { page } = await getByPath(params.siteName.substring(1), path);
  if (!page) return { notFound: true };
  return {
    props: { page, siteName: params.siteName },
  };
}

export default Page;
