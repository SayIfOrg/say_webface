import { GetServerSidePropsContext } from "next";
import useSWR from "swr";
import {
  getByPath,
  getRendition,
  PageFullFieldsFragment,
} from "../../../lib/posts";
import { FragmentType, useFragment } from "../../gql/fragment-masking";

type ImageProbs =
  | { id: string; url?: undefined }
  | { id?: undefined; url: string };

const Image = ({ id, url }: ImageProbs) => {
  let errors;
  if (!url) {
    const { data, error } = useSWR(
      { imageId: id, fill: "50x50" },
      getRendition
    );
    if (error) return <div>Failed to load {error.message}</div>;
    if (!data) return <div>Loading...</div>;

    url = data.url ?? "";
    errors = data.errors;
  }
  let errorsNode = (
    <p>
      {errors?.map((err) => (
        <p key={err.message}>{err.message}</p>
      ))}
    </p>
  );
  if (url === "") {
    return (
      <>
        {errorsNode}
        <p>No url</p>
      </>
    );
  } else {
    return (
      <>
        {errorsNode}
        <img src={url}></img>
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
  page: FragmentType<typeof PageFullFieldsFragment>;
  siteName: string;
}

const Page = (props: Probs) => {
  const page = useFragment(PageFullFieldsFragment, props.page);
  if (page.__typename === "SimplePage" && page.body) {
    let components = [];
    for (const block of page.body) {
      if (!block?.__typename) {
        throw new Error("block does not have __typename");
      }
      // switch (block.type) {

      // }
      if (block.__typename === "CharBlock") {
        components.push(<p key={block.id}>{block.value}</p>);
      } else if (block.__typename === "RichTextBlock") {
        components.push(
          <Paragraph key={block.id} value={block.value}></Paragraph>
        );
      } else if (block.__typename === "ImageChooserBlock") {
        // url may not be there duo to rendition error but id is defiantly there;
        if (!block.id && !block.image.rendition) {
          throw new Error("neither of image id nor rendition url exists.")
        }
        let idOrUrl = block.image.rendition
          ? { url: block.image.rendition.url }
          : ({ id: block.image.id } as { id: string });
        components.push(<Image key={block.id} {...idOrUrl}></Image>);
      }
    }
    return (
      <>
        <div className="grid grid-cols-4 justify-items-center ">
          <div className="col-start-2 col-end-4">
            <p>{props.siteName}</p>
            <div>{components}</div>
          </div>
        </div>
      </>
    );
  } else {
    return <p>this page is not SimplePage</p>;
  }
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ siteName: string; slug: string[] }>) {
  if (!params) return { notFound: true };
  if (!params.siteName.startsWith("@")) return { notFound: true };
  let path = params.slug.join("/");
  let { page } = await getByPath(path);
  if (!page) return { notFound: true };
  return {
    props: { page, siteName: params.siteName },
  };
}

export default Page;
