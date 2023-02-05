import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getPagesByType } from "../../../../lib/posts";

const Post = ({ data, siteName }) => {
  const link_address =
    `/${siteName}/` + data.meta.html_url.split("/").slice(3, -1).join("/");
  return (
    <div>
      <Link href={link_address}>{data.title}</Link>
    </div>
  );
};

const PostListing: NextPage = () => {
  const router = useRouter();
  const { siteName } = router.query;
  const { data, error, isLoading } = useSWR("post", getPagesByType);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  const renderPosts = () => {
    let posts = [];
    for (let i of data.items) {
      posts.push(<Post key={i.id} data={i} siteName={siteName}></Post>);
    }
    return posts;
  };
  return (
    <>
      <div className="grid grid-cols-4 justify-items-center ">
        <div className="col-start-2 col-end-4">{renderPosts()}</div>
      </div>
    </>
  );
};

export default PostListing;
