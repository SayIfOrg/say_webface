import { GetServerSidePropsContext } from "next";
import { getByPath, PageFullFieldsFragment } from "../../../lib/posts";
import { FragmentType, useFragment } from "../../gql/fragment-masking";

interface Probs {
  page: FragmentType<typeof PageFullFieldsFragment>;
  siteName: string;
  err: string;
}

const HomePage = (props: Probs) => {
  const page = useFragment(PageFullFieldsFragment, props.page);
  if (page.__typename !== "HomePage") {
    throw new Error("homepage should be of type HomePage");
  }
  if (props.err) {
    return (
      <>
        <div>{props.err}</div>
      </>
    );
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
