import { GetServerSidePropsContext, NextPage } from "next";
import { getByPath } from "../../../lib/posts";

interface Probs {
  page: HomePage;
  siteName: string;
  err: string;
  errors: any;
}

const HomePage = ({ page, siteName, err, errors }: Probs) => {
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

interface HomePage {
  title: string;
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ siteName: string }>) {
  if (!params) return { notFound: true };
  if (!params.siteName.startsWith("@")) return { notFound: true };
  let page;
  let errors;
  try {
    let data = await getByPath("/");
    page = data.page as HomePage;
    errors = data.errors || null;
  } catch (err: any) {
    let err_message = err.message;
    return {
      props: { err: `getting data byPath, ${err_message}` },
    };
  }
  return {
    props: { page: page, siteName: params.siteName, errors: errors },
  };
}

export default HomePage;
