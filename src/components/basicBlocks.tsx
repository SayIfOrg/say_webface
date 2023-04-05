import { useQuery } from "react-query";
import { getRendition } from "../../lib/posts";

type ImageProps =
  | { id: string; url?: undefined }
  | { id?: undefined; url: string };

export const Image = ({ id, url }: ImageProps) => {
  if (!url && id) {
    const { data, error } = useQuery(
      ["rendition"],
      async () => await getRendition(id, { fill: "400x400" })
    );
    if (error) return <div>Failed to load {String(error)}</div>;
    if (!data) return <div>Loading...</div>;
    url = data.image?.rendition?.url ?? "";
  }
  if (url === "") {
    return <p>No url</p>;
  } else {
    return <img src={url}></img>;
  }
};

interface ParagraphProps {
  value: string;
}

export const Paragraph = ({ value }: ParagraphProps) => {
  return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};
