import { GetServerSidePropsContext, NextPage } from "next";
import { getByPath } from "../../../lib/posts";

const HomePage: NextPage = ({ page, siteName, err }) => {
  if (err) {
    return (
      <>
        <div>{err}</div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-4 justify-items-center ">
        <div className="col-start-2 col-end-4">
          This is home page for {siteName}
          <p>{page.title}</p>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  if (!params.siteName.startsWith("@")) return { notFound: true };
  let page;
  try {
    page = await getByPath("/");
  } catch (err) {
    let err_message = err.message;
    return {
      props: { err: `getting data byPath, ${err_message}` }, // will be passed to the page component as props
    };
  }
  return {
    props: { page, siteName: params.siteName }, // will be passed to the page component as props
  };
}

export default HomePage;
