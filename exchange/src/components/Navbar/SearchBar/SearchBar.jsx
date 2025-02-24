import { useState } from "react";
import "./SearchBar.css"; // Importă fișierul CSS
import axios from "axios";
import { getNewAccessToken } from "../../Auth/auth_functions";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Apelează API-ul doar dacă inputul nu este gol
    if (newQuery.trim() !== "") {
      handleSearch(newQuery);
    } else {
      setResults([]); // Resetează rezultatele dacă inputul este gol
    }
  };

  const handleSearch = async (searchQuery) => {
    if (
      searchQuery === null ||
      searchQuery === undefined ||
      searchQuery.trim() === ""
    ) {
      return;
    }

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
        console.log("Răspuns pentru autocomplete: ", response.data);
        setResults(response.data); // Setează rezultatele din răspuns
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

  const clearInput = () => {
    setQuery(""); // Golește inputul
    setResults([]); // Resetează rezultatele
  };

  return (
    <div>
      {/* Search Bar pentru Desktop */}
      <div className="hide-search-bar-on-mobile">
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
            {query && ( // Afișează butonul de ștergere doar dacă există text
              <button
                className="btn  clear-button"
                onClick={clearInput}
                style={{ marginLeft: "10px" }} // Adaugă un mic spațiu între input și buton
              >
                <i className="fas fa-times" style={{ fontSize: "1.1rem" }}></i>
              </button>
            )}
            <button
              className="btn btn-success search-button"
              // onClick={() => handleSearch(query)}
            >
              <i
                className="fas fa-search search-icon"
                style={{ fontSize: "1.2rem" }}
              ></i>
            </button>
          </div>
        </div>
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
                // onClick={() => handleSearch(query)}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
