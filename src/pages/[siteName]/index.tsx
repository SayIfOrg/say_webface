import { GetServerSidePropsContext } from "next";
import { getByPath, PageFullFieldsFragment } from "../../../lib/posts";
import { FragmentType, useFragment } from "../../gql/fragment-masking";

interface Props {
  page: FragmentType<typeof PageFullFieldsFragment>;
  siteName: string;
}

const HomePage = (props: Props) => {
  const page = useFragment(PageFullFieldsFragment, props.page);
  if (page.__typename !== "HomePage") {
    throw new Error("homepage should be of type HomePage");
  }
  return (
    <>
      <div className="grid grid-cols-4 justify-items-center ">
        <div className="col-start-2 col-end-4">
          This is home page for {props.siteName}
          <p>{page.title}</p>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ siteName: string }>) {
  if (!params) return { notFound: true };
  if (!params.siteName.startsWith("@")) return { notFound: true };
  let { page } = await getByPath("/");
  if (!page) return { notFound: true };
  return {
    props: { page: page, siteName: params.siteName },
  };
}

export default HomePage;
