// import { useState } from "react";
import "./SearchBar.css"; // Importă fișierul CSS

const SearchBar = () => {
  // const [query, setQuery] = useState("");
  // const [results, setResults] = useState([]);

  // const handleInputChange = (event) => {
  //   setQuery(event.target.value);
  // };

  // const handleSearch = () => {
  //   // Simulează o căutare (înlocuiește cu logica ta reală)
  //   const simulatedResults = [
  //     "Rezultatul 1",
  //     "Rezultatul 2",
  //     "Rezultatul 3"
  //   ].filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  //   setResults(simulatedResults);
  //   setQuery(""); // Resetează câmpul de input după căutare
  // };

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
              style={{
                height: "40px",
                padding: " 0 25px 0 25px",
                fontSize: "1.3rem"
              }}
            ></input>
            <button className="btn btn-success search-button">
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
