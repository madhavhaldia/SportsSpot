import React from "react";
import Parser from "rss-parser";
import Article from "./(components)/Article";

const Page = async () => {
  const parser = new Parser({
    customFields: {
      item: ["media:content"],
    },
  });
  const feed = await parser.parseURL("https://www.essentiallysports.com/feed/");
  const articles = feed.items.map((item) => ({
    title: item.title,
    link: item.link,
    author: item.creator,
    description: item.contentSnippet,
    pubDate: new Date(item.pubDate || ""),
    category: item.categories,
    guid: item.guid,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    imageSrc: item["media:content"]["$"].url,
  }));
  const getTitleFontSize = (title: string | any[] | undefined) => {
    const titleLength = title?.length;
    if (!titleLength) return;
    if (titleLength > 60) {
      return "text-2xl md:text-3xl lg:text-4xl xl:text-5xl ";
    } else if (titleLength > 40) {
      return "text-3xl md:text-4xl lg:text-5xl xl:text-6xl ";
    } else {
      return "text-4xl md:text-5xl lg:text-6xl xl:text-7xl ";
    }
  };

  const titleFontSize = getTitleFontSize(articles[0]?.title);

  return (
    <>
      <section className="background-radial-gradient mb-32 text-center text-gray-800 lg:text-left">
        <div className="absolute left-0 top-0 z-20 ml-4 mt-4 rounded-md p-3 text-2xl font-bold text-white lg:text-3xl">
          <h1 className="text-white">
            <span className="text-red-500">Sports</span>
            <span className="text-white-500">Spot</span>
          </h1>
        </div>
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          style={{
            backgroundPosition: "50%",
            // eslint-disable-next-line  @typescript-eslint/restrict-template-expressions
            backgroundImage: `url('${articles[0]?.imageSrc || " "}')`,
            height: "500px",
          }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="max-w-[800px] px-6 py-12 text-left text-white md:px-12 md:py-0">
                <h2
                  // eslint-disable-next-line  @typescript-eslint/restrict-template-expressions
                  className={`mb-4 ${titleFontSize} font-bold leading-tight tracking-tight`}
                >
                  <a href={articles[0]?.link}>{articles[0]?.title}</a>
                </h2>
                <div className="mb-4 flex flex-wrap items-center">
                  <p
                    className={`mb-2 mr-4 text-sm font-medium tracking-wide text-gray-200`}
                  >
                    {articles[0]?.author}
                  </p>
                  <div className="flex flex-wrap">
                    {articles[0]?.category?.map((category, index) => (
                      <span
                        key={index}
                        className={`mb-2 mr-2 rounded-full bg-gray-200 px-2 py-1  text-xs font-medium text-gray-800`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-32 text-center text-gray-800 md:text-left">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Latest articles
        </h2>
        {articles.map((article) => (
          <Article item={article} key={article.guid} />
        ))}
      </section>
    </>
  );
};

export default Page;
