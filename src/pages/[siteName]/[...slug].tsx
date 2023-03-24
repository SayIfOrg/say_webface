import { GetServerSidePropsContext } from "next";
import useSWR from "swr";
import {
  getByPath,
  getRendition,
  GraphqlError,
  Page,
} from "../../../lib/posts";

interface ImageProbs {
  id?: number;
  url?: string | null;
}

const Image = ({ id, url }: ImageProbs) => {
  let errors;
  if (!url) {
    const { data, error } = useSWR(
      { imageId: id, fill: "50x50" },
      getRendition
    );
    if (error) return <div>Failed to load {error.message}</div>;
    if (!data) return <div>Loading...</div>;

    url = data.url;
    errors = data.errors;
  }
  let errorsNode = (
    <p>
      {errors?.map((err) => (
        <p key={err.message}>{err.message}</p>
      ))}
    </p>
  );
  if (typeof url === "string") {
    return (
      <>
        {errorsNode}
        <img src={url}></img>
      </>
    );
  } else {
    return (
      <>
        {errorsNode}
        <p>No url</p>
      </>
    );
  }
};

interface ParagraphProbs {
  value: string;
}

const Paragraph = ({ value }: ParagraphProbs) => {
  return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};

interface Probs {
  page: Page;
  siteName: string;
  errors: GraphqlError[];
}

const Page = ({ page, siteName, errors }: Probs) => {
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
          <p>
            {errors.map((err) => (
              <p key={err.message}>{err.message}</p>
            ))}
          </p>
          <p>{siteName}</p>
          <div>{components}</div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ siteName: string; slug: string[] }>) {
  if (!params) return { notFound: true };
  if (!params.siteName.startsWith("@")) return { notFound: true };
  let path = params.slug.join("/");
  let page;
  let errors;
  try {
    let data = await getByPath(path);
    page = data.page;
    errors = data.errors;
  } catch (err: any) {
    let err_message = err.message;
    return {
      props: { err: `getting data byPath, ${err_message}` },
    };
  }
  if (page === null) return { notFound: true };
  return {
    props: { page, siteName: params.siteName, errors },
  };
}

export default Page;
