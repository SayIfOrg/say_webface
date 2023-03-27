import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getPagesByType } from "../../../../lib/posts";

interface PostProbs {
  siteName: string;
  pageTitle: string;
  pageUrl: string;
}
const Post = ({ pageTitle, pageUrl, siteName }: PostProbs) => {
  const link_address = `/${siteName}` + pageUrl;
  return (
    <div>
      <Link href={link_address}>{pageTitle}</Link>
    </div>
  );
};

const renderPosts = (
  pages: { id: string; url: string; title: string }[],
  siteName: string
) => {
  let posts = [];
  for (let i of pages) {
    posts.push(
      <Post
        key={i.id}
        pageTitle={i.title}
        pageUrl={i.url}
        siteName={siteName}
      ></Post>
    );
  }
  return posts;
};

const PostListing = () => {
  const router = useRouter();
  const { siteName } = router.query as { siteName: string };
  const { data, error, isLoading } = useQuery(
    ["posts"],
    async () => await getPagesByType("post")
  );
  if (error) {
    return <div>Failed to load, {String(error)}</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not possible</div>;
  // I know better, id and url are included so
  let posts = data.pages.map((p) => {
    return { id: p.id, title: p.title, url: p.url };
  }) as { id: string; url: string; title: string }[];

  return (
    <>
      <div className="grid grid-cols-4 justify-items-center ">
        <div className="col-start-2 col-end-4">
          {renderPosts(posts, siteName)}
        </div>
      </div>
    </>
  );
};

export default PostListing;
