import { GetServerSidePropsContext, NextPage } from "next";
import useSWR from "swr";
import { getByPath, getRendition } from "../../../lib/posts";
import { fetcher } from "../../../lib/utils";

const Image = ({ id, url }) => {
  let errors;
  if (!url) {
    const { data, error } = useSWR(
      { imageId: id, fill: "50x50" },
      getRendition
    );
    if (error) return <div>Failed to load {error.message}</div>;
    if (!data) return <div>Loading...</div>;

    url = data.url;
    errors = data.errors || null;
  }
  return (
    <>
      <p>{errors}</p>
      <img src={url}></img>
    </>
  );
};

const Paragraph = ({ value }) => {
  return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};

const Page: NextPage = ({ page, siteName, err, errors }) => {
  if (err) {
    return (
      <>
        <div>{err}</div>
      </>
    );
  }
  let components = [];
  for (const block of page.body) {
    // switch (block.type) {

    // }
    if (block.blockType === "CharBlock") {
      components.push(<p key={block.id}>{block.value}</p>);
    } else if (block.blockType === "RichTextBlock") {
      components.push(
        <Paragraph key={block.id} value={block.value}></Paragraph>
      );
    } else if (block.blockType === "ImageChooserBlock") {
      components.push(
        <Image key={block.id} url={block.image.rendition.url}></Image>
      );
    }
  }
  return (
    <>
      <div className="grid grid-cols-4 justify-items-center ">
        <div className="col-start-2 col-end-4">
          <p>{errors}</p>
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
  let page;
  let errors;
  try {
    let data = await getByPath(path);
    page = data.page;
    errors = data.errors || null;
  } catch (err) {
    let err_message = err.message;
    return {
      props: { err: `getting data byPath, ${err_message}` }, // will be passed to the page component as props
    };
  }
  if (page === null) return { notFound: true };
  return {
    props: { page, siteName: params.siteName, errors }, // will be passed to the page component as props
  };
}

export default Page;
