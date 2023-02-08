import { GetServerSidePropsContext, NextPage } from "next";
import { getByPath } from "../../../lib/posts";

const HomePage: NextPage = ({ page, siteName, err, errors }) => {
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
          <p>{errors}</p>
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
  let errors;
  try {
    let data = await getByPath("/");
    page = data.page;
    errors = page.errors || null;
  } catch (err) {
    let err_message = err.message;
    return {
      props: { err: `getting data byPath, ${err_message}` }, // will be passed to the page component as props
    };
  }
  return {
    props: { page: page, siteName: params.siteName, errors: errors }, // will be passed to the page component as props
  };
}

export default HomePage;
