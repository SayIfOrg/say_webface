import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getPagesByType, Page } from "../../../../lib/posts";

interface PostProbs {
  data: Page;
  siteName: string;
}
const Post = ({ data, siteName }: PostProbs) => {
  const link_address = `/${siteName}` + data.url;
  return (
    <div>
      <Link href={link_address}>{data.title}</Link>
    </div>
  );
};

const renderPosts = (pages: Page[], siteName: string) => {
  let posts = [];
  for (let i of pages) {
    posts.push(<Post key={i.id} data={i} siteName={siteName}></Post>);
  }
  return posts;
};

const PostListing = () => {
  const router = useRouter();
  const { siteName } = router.query as { siteName: string };
  const { data, error, isLoading } = useSWR("post", getPagesByType);
  if (error) return <div>Failed to load</div>;
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-4 justify-items-center ">
        <div className="col-start-2 col-end-4">
          <p>
            {data.errors.map((err) => (
              <p key={err.message}>{err.message}</p>
            ))}
          </p>

          {renderPosts(data.pages, siteName)}
        </div>
      </div>
    </>
  );
};

export default PostListing;
