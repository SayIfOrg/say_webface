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
      <main className="bg-white pt-8 pb-16 dark:bg-gray-900 lg:pt-16 lg:pb-24">
        <div className="mx-auto flex max-w-screen-xl justify-between px-4 ">
          <article className="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl">
            <header className="not-format mb-4 lg:mb-6">
              <address className="mb-6 flex items-center not-italic">
                <div className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-4 h-16 w-16 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {props.siteName}
                    </a>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      Graphic Designer, educator & CEO Flowbite
                    </p>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      <time
                        pubdate=""
                        dateTime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white lg:mb-6 lg:text-4xl">
                Best practices for successful prototypes
              </h1>
            </header>
            {components}
            <section className="not-format">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
                  Discussion (20)
                </h2>
              </div>
              <form className="mb-6">
                <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4 dark:border-gray-700 dark:bg-gray-800">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows={6}
                    className="w-full border-0 px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-lg bg-primary-700 py-2.5 px-4 text-center text-xs font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
                >
                  Post comment
                </button>
              </form>
              <SSEComment />
            </section>
          </article>
        </div>
      </main>
    </>
  );
};
