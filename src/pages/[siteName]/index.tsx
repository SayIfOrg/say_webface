import { GetServerSidePropsContext } from "next";
import { HomePage, getByPath } from "../../../lib/posts";

interface Probs {
  page: HomePage;
  siteName: string;
  err: string;
}

const HomePage = ({ page, siteName, err }: Probs) => {
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
