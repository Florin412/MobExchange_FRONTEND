/* eslint-disable react/prop-types */

import "./NewsTemplate.css";

const NewsTemplate = ({ newsData, pageTitle }) => {
  // console.log("news template: ", newsData);

  // Verificăm dacă newsData este valid
  if (!newsData || newsData.length === 0) {
    return <div className="fs-1 text-center m-5">Wait for news...</div>;
  }

  // Funcția care calculează timpul scurs
  const getTimeAgo = (publishedAt) => {
    const publishedDate = new Date(publishedAt); // Convertim stringul în obiect Date
    const now = new Date(); // Data și ora curentă

    // Diferența în milisecunde
    const differenceInMilliseconds = now.getTime() - publishedDate.getTime();
    const differenceInHours = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60)
    );
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    if (differenceInHours < 24) {
      return `${differenceInHours} hour${
        differenceInHours === 1 ? "" : "s"
      } ago`;
    } else if (differenceInHours < 48) {
      return "yesterday";
    } else {
      return `${differenceInDays} day${differenceInDays === 1 ? "" : "s"} ago`;
    }
  };

  // Funcția pentru a renderiza articolele
  const renderNewsItems = (newsItems) => {
    return newsItems.map((news, index) => {
      if (news && news.urlToImage) {
        // Verificăm dacă urlToImage este valid
        return (
          <div key={index} className="news-item">
            <img
              src={news.urlToImage}
              alt={news.title}
              className="article-img"
              onClick={() => window.open(news.url, "_blank")} // Click pe imagine
            />
            <div>
              <h3 onClick={() => window.open(news.url, "_blank")}>
                {news.title}
              </h3>
              <p
                className="article-description"
                onClick={() => window.open(news.url, "_blank")}
              >
                {news.description}
              </p>
              <div className="article-meta">
                <p className="article-source">{news.source.name}</p>
                <span className="bullet"> • </span>
                <p className="article-time">{getTimeAgo(news.publishedAt)}</p>
              </div>
            </div>
          </div>
        );
      }
      return null; // Dacă urlToImage nu este valid, nu renderizăm articolul
    });
  };

  return (
    <div className="news-container">
      <h1 className="page-title">{pageTitle}</h1>

      {/* Filtrarea articolelor valide */}
      {(() => {
        const validNews = newsData.filter(
          (news) => news.urlToImage && news.source.name !== "Biztoc.com"
        );

        // Secțiunea 1
        const section1News = validNews.slice(0, 5);

        // Secțiunea 2
        const section2News = validNews.slice(5, 11);

        return (
          <>
            {/* Secțiunea 1 */}
            <div className="section section-1">
              {section1News.length > 0 && (
                <div className="main-news">
                  {section1News[0] && (
                    <>
                      <img
                        src={section1News[0].urlToImage}
                        alt={section1News[0].title}
                        className="article-img"
                        onClick={() =>
                          window.open(section1News[0].url, "_blank")
                        }
                      />
                      <h2
                        className="article-title"
                        onClick={() =>
                          window.open(section1News[0].url, "_blank")
                        }
                      >
                        {section1News[0].title}
                      </h2>
                      <p
                        className="article-description"
                        onClick={() =>
                          window.open(section1News[0].url, "_blank")
                        }
                      >
                        {section1News[0].description}
                      </p>
                      <div className="article-meta">
                        <p className="article-source">
                          {section1News[0].source.name}
                        </p>
                        <span className="bullet"> • </span>
                        <p className="article-time">
                          {getTimeAgo(section1News[0].publishedAt)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="secondary-news">
                {renderNewsItems(section1News.slice(1))}
              </div>
            </div>

            {/* Secțiunea 2 */}
            <div className="section section-2">
              {renderNewsItems(section2News)}
            </div>

            {/* Secțiunea 3 */}
            <div className="section section-3">
              {renderNewsItems(validNews.slice(11))}
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default NewsTemplate;
