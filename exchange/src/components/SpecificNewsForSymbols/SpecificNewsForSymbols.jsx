/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { getNewAccessToken } from "../Auth/auth_functions";

const SpecificNewsForSymbols = ({ symbols }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funcția ta de formatare a simbolurilor
  const formatSymbol = (symbol) => {
    const encodedSymbol = encodeURIComponent(symbol);

    return encodedSymbol;
  };

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    const accessToken = localStorage.getItem("accessToken");
    let symbolsString = "";

    if (Array.isArray(symbols)) {
      // Scenario 1: Lista lunga de simboluri
      symbolsString = symbols.map(formatSymbol).join("%2C"); // Formatează fiecare simbol și unește-le
      console.log(
        "aceasta este rezultatul dupa primul scenariu, symbolsString: ",
        symbolsString
      );
    } else if (typeof symbols === "string") {
      // Scenario 2: Un singur simbol
      symbolsString = formatSymbol(symbols); // Formatează simbolul individual
      console.log(
        "acesta este al doilea scenariu, symbolsString: ",
        symbolsString
      );
    } else {
      throw new Error("Invalid symbols prop: must be an array or a string.");
    }

    //   Construct the URL
    const url = `http://localhost:8080/markets/getNewsForSymbols?symbols=${symbolsString}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        // array de obiecte, unde obiectele contin date despre news.
        setNews(response.data.data.main.stream);
        console.log("news for simbols: ", response.data.data.main.stream);
      } else if (response.status === 400 || response.status === 401) {
        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
          fetchNews(); // Reapelează funcția cu noul token
        } else {
          console.error("Failed to refresh token");
        }
      }
      // Limitează la 12 news
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symbols) {
      // Verifică dacă symbols există
      fetchNews();
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
