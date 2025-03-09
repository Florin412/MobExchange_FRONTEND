/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { getNewAccessToken } from "../Auth/auth_functions";

const SpecificNewsForSymbols = ({ symbols }) => {
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
        newsItem.content.thumbnail.resolutions.length > 0
      );
    });

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
        console.log("news for simbols: ", response.data.data.main.stream);
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

  useEffect(() => {
    if (symbols) {
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
    <div className="container mx-auto py-4">
      <div className="md:grid md:grid-cols-2 md:gap-4">
        {news.map((item, index) => (
          <div key={index} className="mb-4">
            <a
              href={item.content.clickThroughUrl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h3 className="text-lg font-semibold">{item.content.title}</h3>
              <p className="text-sm text-gray-500">
                {item.content.provider.displayName} • {item.content.pubDate}
              </p>

              {item.content.thumbnail && (
                <img
                  src={
                    item.content.thumbnail.resolutions[1].url ||
                    item.content.thumbnail.resolutions[2].url
                  }
                  alt={item.content.title}
                  className="mt-2 rounded"
                />
              )}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificNewsForSymbols;
