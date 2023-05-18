import { SimplePageFragment } from "../../lib/posts";
import { FragmentType, useFragment } from "../gql/wagtail";
import { Paragraph, Image } from "./basicBlocks";
import { SSEComment, WSComment } from "./comment";

interface Props {
  siteName: string;
  page: FragmentType<typeof SimplePageFragment>;
}

export const SimplePage = (props: Props) => {
  const page = useFragment(SimplePageFragment, props.page);

  if (!page.body) {
    return <p>weird</p>;
  }
  
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
        throw new Error("neither of image id nor rendition url exists.");
      }
      let idOrUrl = { id: block.image.id } as { id: string };
      components.push(<Image key={block.id} {...idOrUrl}></Image>);
    }
  }
  return (
    <>
      <div className="grid grid-cols-4 justify-items-center">
        <div className="col-start-2 col-end-4">
          <p>{props.siteName}</p>
          <div>{components}</div>
        </div>
        <div className="col-start-2 col-end-3 w-full">
          <p>websocket Comments are:</p>
          <WSComment />
        </div>
        <div className="col-start-3 col-end-4 w-full">
          <p>SSE Comments are:</p>
          <SSEComment />
        </div>
      </div>
    </>
  );
};
