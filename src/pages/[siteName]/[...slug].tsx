import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getByPath } from "../../../lib/posts";
import { fetcher } from "../../../lib/utils";


const Image = ({ id }) => {
  const { data, error } = useSWR(
    `http://127.0.0.1:8000/api/images/${id}/`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return <img src={data.meta.download_url}></img>;
};

const Paragraph = ({ value }) => {
  return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};

const Page: NextPage = ({ page, siteName }) => {
  let components = [];
  for (const block of page.body) {
    // switch (block.type) {

    // }
    if (block.type === "heading") {
      components.push(<p key={block.id}>{block.value}</p>);
    } else if (block.type === "paragraph") {
      components.push(<Paragraph key={block.id} value={block.value}></Paragraph>);
    } else if (block.type === "image") {
      components.push(<Image key={block.id} id={block.value}></Image>);
    }
  }
  return (
    <>
      <div className="grid grid-cols-4 justify-items-center ">
        <div className="col-start-2 col-end-4">
          <p>{siteName}</p>
          <div>{components}</div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  if (!params.siteName.startsWith("@")) return { notFound: true };
  const slugArray = params.slug;
  let path = slugArray.join("/");
  let page = await getByPath(path);
  if (page.status_code === 404) return { notFound: true };
  return {
    props: { page: page, siteName: params.siteName }, // will be passed to the page component as props
  };
}

export default Page;
