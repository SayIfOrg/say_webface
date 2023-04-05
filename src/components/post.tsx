import Link from "next/link";

interface PostProps {
  siteName: string;
  pageTitle: string;
  pageUrl: string;
}
export const Post = ({ pageTitle, pageUrl, siteName }: PostProps) => {
  const link_address = `/${siteName}` + pageUrl;
  return (
    <div>
      <Link href={link_address}>{pageTitle}</Link>
    </div>
  );
};
