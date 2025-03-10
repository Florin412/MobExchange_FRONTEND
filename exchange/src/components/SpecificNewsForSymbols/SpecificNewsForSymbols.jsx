/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { getNewAccessToken } from "../Auth/auth_functions";
import "./SpecificNewsForSymbols.css";
import { Link } from "react-router-dom";

const SpecificNewsForSymbols = ({ symbols, data }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funcția ta de formatare a simbolurilor
  const formatOneSymbol = (symbol) => {
    return encodeURIComponent(symbol);
  };

  const formatSymbols = (symbols) => {
    let symbolsString = "";

    if (Array.isArray(symbols)) {
      // Scenario 1: Lista lunga de simboluri
      symbolsString = symbols.map(formatOneSymbol).join("%2C"); // Formatează fiecare simbol și unește-le
      console.log(
        "aceasta este rezultatul dupa primul scenariu, symbolsString: ",
        symbolsString
      );
    } else if (typeof symbols === "string") {
      // Scenario 2: Un singur simbol
      symbolsString = formatOneSymbol(symbols); // Formatează simbolul individual
      console.log(
        "acesta este al doilea scenariu, symbolsString: ",
        symbolsString
      );
    } else {
      throw new Error("Invalid symbols prop: must be an array or a string.");
    }

    return symbolsString;
  };

  const formatNumber = (num, formatType = "normal") => {
    const options = {
      minimumFractionDigits:
        formatType === "veryLong" ? 8 : formatType === "long" ? 4 : 2,
      maximumFractionDigits:
        formatType === "veryLong" ? 8 : formatType === "long" ? 4 : 2
    };

    return new Intl.NumberFormat("en-US", options).format(num);
  };

  const getChangePercent = (symbol) => {
    const item = data.find((item) => item.symbol === symbol);
    if (item) {
      const value = item.regularMarketChangePercent;
      if (value) {
        const formattedValue = formatNumber(value);
        const colorClass = value > 0 ? "text-success" : "text-danger";
        const sign = value > 0 ? "+" : "";
        return (
          <span className={colorClass}>
            {sign}
            {formattedValue}%
          </span>
        );
      }
    }
    return null; // Returnează null dacă change% este 0.00 sau nu există
  };

  const filterNewsWithThumbnails = (newsStream) => {
    if (!Array.isArray(newsStream)) {
      console.warn("filterNewsWithThumbnails: Input is not an array.");
      return []; // Returnează un array gol dacă input-ul nu este un array
    }

    const filteredNews = newsStream.filter((newsItem) => {
      return (
        newsItem.content &&
        newsItem.content.thumbnail &&
        newsItem.content.thumbnail.resolutions &&
        newsItem.content.thumbnail.resolutions.length > 0 &&
        newsItem.content.clickThroughUrl && // Verifică dacă clickThroughUrl există
        newsItem.content.clickThroughUrl.url // Verifică dacă url-ul nu este null
      );
    });

    console.log("News for symbols: ", filteredNews.slice(0, 12));
    return filteredNews.slice(0, 12); // Returnează doar primele 12 elemente
  };

  const fetchNewsFromSymbols = async () => {
    setLoading(true);
    setError(null);
    let symbolsString = "";

    const accessToken = localStorage.getItem("accessToken");

    symbolsString = formatSymbols(symbols);

    const url = `http://localhost:8080/markets/getNewsForSymbols?symbols=${symbolsString}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        // array de obiecte, unde obiectele contin date despre news.
        // modifica mai jos, incat sa seteze doar acele news care au poza la thumbnail
        setNews(filterNewsWithThumbnails(response.data.data.main.stream));
        // console.log("news for simbols: ", response.data.data.main.stream);
      } else if (response.status === 400 || response.status === 401) {
        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
          fetchNewsFromSymbols(); // Reapelează funcția cu noul token
        } else {
          console.error("Failed to refresh token");
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (symbols && symbols.length > 0) {
      // Verifică dacă symbols există
      fetchNewsFromSymbols();
    }
  }, [symbols]);

  // Loanding a message on screen
  if (loading) {
    return <div>Loading news...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="news-container-for-symbols">
      <div className="news-grid">
        {news.map((item, index) => (
          <div key={index} className="news-item1">
            <div className="news-link1">
              <div className="news-text1">
                <a
                  href={item.content.clickThroughUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link1"
                >
                  <h3 className="news-title1">{item.content.title}</h3>
                </a>

                <p className="news-meta1">
                  {item.content.provider.displayName} •{" "}
                  {getTimeAgo(item.content.pubDate)} {/* Tikers */}
                  <span className="numeUnic2">
                    {item.content?.finance?.stockTickers?.map(
                      (ticker, tickerIndex) => {
                        const changePercentElement = getChangePercent(
                          ticker.symbol
                        );
                        // Găsește obiectul corespunzător din array-ul data
                        const dataItem = data.find(
                          (dataItem) => dataItem.symbol === ticker.symbol
                        );

                        return changePercentElement ? ( // Afișează doar dacă changePercentElement nu este null
                          <Link
                            className="news-tickers"
                            key={tickerIndex}
                            to={`/quote/${ticker.symbol}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            state={{ item: dataItem }} // Trimite obiectul dataItem în state
                          >
                            <span style={{ color: "#1967d2" }}>
                              {ticker.symbol}
                            </span>{" "}
                            {changePercentElement}
                          </Link>
                        ) : null;
                      }
                    )}
                  </span>
                </p>
              </div>
              <div>
                <img
                  src={
                    item.content.thumbnail.resolutions[1].url ||
                    item.content.thumbnail.resolutions[2].url
                  }
                  alt={item.content.title}
                  className="news-image1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificNewsForSymbols;
