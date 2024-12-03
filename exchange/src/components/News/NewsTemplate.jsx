/* eslint-disable react/prop-types */

import "./NewsTemplate.css";

const NewsTemplate = ({ newsData, pageTitle }) => {
  console.log("news template: ", newsData);

  // Verificăm dacă newsData este valid
  if (!newsData || newsData.length === 0) {
    return <div>No news available.</div>;
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

      {/* Sectiunea 1 */}
      <div className="section section-1">
        {newsData[0] && (
          <div className="main-news">
            {newsData[0].urlToImage && (
              <img
                src={newsData[0].urlToImage}
                alt={newsData[0].title}
                className="article-img"
                onClick={() => window.open(newsData[0].url, "_blank")} // Click pe imagine
              />
            )}
            <h2
              className="article-title"
              onClick={() => window.open(newsData[0].url, "_blank")}
            >
              {newsData[0].title}
            </h2>
            <p
              className="article-description"
              onClick={() => window.open(newsData[0].url, "_blank")}
            >
              {newsData[0].description}
            </p>
            <div className="article-meta">
              <p className="article-source">{newsData[0].source.name}</p>
              <span className="bullet"> • </span>
              <p className="article-time">
                {getTimeAgo(newsData[0].publishedAt)}
              </p>
            </div>
          </div>
        )}
        <div className="secondary-news">
          {renderNewsItems(newsData.slice(1, 5))}
        </div>
      </div>

      {/* Sectiunea 2 */}
      <div className="section section-2">
        {renderNewsItems(newsData.slice(5, 11))}
      </div>

      {/* Sectiunea 3 */}
      <div className="section section-3">
        {renderNewsItems(newsData.slice(11))}
      </div>
    </div>
  );
};

export default NewsTemplate;
