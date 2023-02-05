import { GetServerSidePropsContext, NextPage } from "next";
import { getByPath } from "../../../lib/posts";

const HomePage: NextPage = ({ page, siteName }) => {
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
  let page = await getByPath("/");
  return {
    props: { page, siteName: params.siteName }, // will be passed to the page component as props
  };
}

export default HomePage;
