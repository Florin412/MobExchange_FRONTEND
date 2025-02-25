/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./SearchBar.css"; // Importă fișierul CSS
import axios from "axios";
import { getNewAccessToken } from "../../Auth/auth_functions";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ news: [], quotes: [] });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.trim() !== "") {
      handleSearch(newQuery);
    } else {
      setResults({ news: [], quotes: [] }); // Resetează rezultatele dacă inputul este gol
    }
  };

  const clearInput = () => {
    setQuery(""); // Golește inputul
    setResults({ news: [], quotes: [] }); // Resetează rezultatele
  };

  const handleSymbolClick = async (symbol) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://localhost:8080/markets/options/get-general-data-for-1-asset?symbol=${symbol}`,
        {
          method: "GET",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(
        "Salut varule, uite ca am primit datele generale pentru 1 asset, hai noroc !!"
      );
      console.log(data); // Procesați datele după cum este necesar
      // Navigăm către pagina Quote și trimitem datele prin state
      navigate(`/quote/${symbol}`, {
        state: { item: data.quoteResponse.result[0] }
      });

      clearInput();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    const accessToken = localStorage.getItem("accessToken");
    const url = `http://localhost:8080/markets/autocomplete?query=${encodeURIComponent(
      searchQuery
    )}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        const newsResults = response.data.news.slice(0, 3);
        const quotesResults = response.data.quotes.slice(0, 6);

        console.log(newsResults, quotesResults);

        setResults({ news: newsResults, quotes: quotesResults });
      } else if (response.status === 400 || response.status === 401) {
        const newAccessToken = await getNewAccessToken();
        if (newAccessToken) {
          handleSearch(searchQuery); // Reapelează funcția cu noul token
        } else {
          console.error("Failed to refresh token");
        }
      }
    } catch (error) {
      console.error("Error fetching market data for stocks:", error);
    }
  };

  return (
    <div>
      {/* Search Bar pentru Desktop */}
      <div className="hide-search-bar-on-mobile search-bar-for-desktop">
        <div className="search-wrapper">
          <div className="search-box">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search for news, symbols or companies"
              value={query}
              onChange={handleInputChange}
              style={{
                height: "40px",
                padding: "0 25px",
                fontSize: "1.3rem"
              }}
            />
            {query && (
              <button
                className="btn clear-button"
                onClick={clearInput}
                style={{ marginLeft: "10px" }}
              >
                <i className="fas fa-times" style={{ fontSize: "1.1rem" }}></i>
              </button>
            )}
            <button className="btn btn-success search-button">
              <i
                className="fas fa-search search-icon"
                style={{ fontSize: "1.2rem" }}
              ></i>
            </button>
          </div>
        </div>

        {/* Afișarea rezultatelor pentru Desktop */}
        {results.quotes.length > 0 || results.news.length > 0 ? (
          <div className="results-container">
            {results.quotes.length > 0 && (
              <>
                <h3>Symbols</h3>
                <ul>
                  {results.quotes.map((item, index) => (
                    <li key={index}>
                      <div onClick={() => handleSymbolClick(item.symbol)}>
                        <div
                          style={{
                            // backgroundColor: "red",
                            display: "flex",
                            justifyContent: "space-between",
                            cursor: "pointer"
                          }}
                        >
                          <div>
                            <div
                              style={{
                                color: "#1967d2",
                                fontSize: "14px",
                                fontWeight: "600"
                              }}
                            >
                              {item.symbol}
                            </div>
                            <div
                              style={{
                                color: "#232a31",
                                fontSize: "14px",
                                fontWeight: "100"
                              }}
                            >
                              {item.longname || item.shortname}
                            </div>
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                              color: "#232a31",
                              fontSize: "12px",
                              fontWeight: "100"
                            }}
                          >
                            <div>{item.typeDisp}</div>
                            <div>{item.exchange}</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {results.news.length > 0 && (
              <>
                <h3 style={{ marginTop: "25px" }}>News</h3>
                <ul className="notBorderHere">
                  {results.news.map((item, index) => (
                    <li key={index}>
                      <div style={{ color: "#232a31" }}>
                        <div>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#232a31", fontSize: "18px" }}
                          >
                            {item.title}
                          </a>
                        </div>
                        <div style={{ fontSize: "12px" }}>
                          <span>{item.publisher} </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : null}
      </div>

      {/* Search Bar pentru Mobile */}
      <div
        className="container-fluid show-search-bar-on-mobile"
        style={{ paddingLeft: "17px", paddingRight: "17px" }}
      >
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="search-container" style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search for news and symbols"
                value={query}
                onChange={handleInputChange}
                style={{ height: "40px", fontSize: "1.3rem" }}
              />
              <i
                className="fas fa-search search-icon"
                style={{ fontSize: "1.2rem" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
