/* eslint-disable react/prop-types */

import "./NewsTemplate.css";

const NewsTemplate = ({ newsData }) => {
  console.log("news template: ", newsData);
  // Verificăm dacă newsData este valid
  if (!newsData || newsData.length === 0) {
    return <div>No news available.</div>; // Mesaj de eroare în cazul în care nu sunt date
  }

  return (
    <div className="news-container">
      {/* Sectiunea 1 */}
      <div className="section section-1">
        {newsData[0] && (
          <div className="main-news">
            <h2>{newsData[0].title}</h2>
            <p>{newsData[0].description}</p>
          </div>
        )}
        <div className="secondary-news">
          {newsData.slice(1, 5).map(
            (news, index) =>
              news && (
                <div key={index} className="news-item">
                  <h3>{news.title}</h3>
                  <p>{news.description}</p>
                </div>
              )
          )}
        </div>
      </div>

      {/* Sectiunea 2 */}
      <div className="section section-2">
        {newsData.slice(5, 11).map(
          (news, index) =>
            news && (
              <div key={index} className="news-item">
                <h3>{news.title}</h3>
                <p>{news.description}</p>
              </div>
            )
        )}
      </div>

      {/* Sectiunea 3 */}
      <div className="section section-3">
        {newsData.slice(11).map(
          (news, index) =>
            news && (
              <div key={index} className="news-item">
                <h3>{news.title}</h3>
                <p>{news.description}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default NewsTemplate;
