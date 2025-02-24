import { useState } from "react";
import "./SearchBar.css"; // Importă fișierul CSS

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // Simulează o căutare (înlocuiește cu logica ta reală)
    const simulatedResults = [
      "Rezultatul 1",
      "Rezultatul 2",
      "Rezultatul 3"
    ].filter((item) => item.toLowerCase().includes(query.toLowerCase()));

    setResults(simulatedResults);
    setQuery(""); // Resetează câmpul de input după căutare
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Caută..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Caută
      </button>
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
