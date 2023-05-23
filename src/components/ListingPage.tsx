import { ListingPageFragment } from "../../lib/posts";
import { normalizePageUrl } from "../../lib/utils";
import { FragmentType, useFragment } from "../gql/wagtail";
import { Post } from "./post";

interface Props {
  siteName: string;
  page: FragmentType<typeof ListingPageFragment>;
}
export const ListingPage = (props: Props) => {
  const page = useFragment(ListingPageFragment, props.page);

  if (!page.listedPages) {
    return <p>weird</p>;
  }

  return (
    <>
      <div className="grid grid-cols-4 justify-items-center">
        <div className="col-start-2 col-end-4">
          {page.listedPages.map((lp) =>
            lp ? (
              <Post
                key={lp.id}
                pageTitle={lp.title}
                pageUrl={normalizePageUrl(lp.url)}
                siteName={props.siteName}
              ></Post>
            ) : (
              <p>weird</p>
            )
          )}
        </div>
      </div>
    </>
  );
};
