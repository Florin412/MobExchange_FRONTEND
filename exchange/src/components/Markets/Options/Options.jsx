import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importă useNavigate
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";
import "./Options.css";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";
import SpecificNewsForSymbols from "../../SpecificNewsForSymbols/SpecificNewsForSymbols";

const Options = () => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("Most Active");
  const [activeButton1, setActiveButton1] = useState("Options");
  const navigate = useNavigate();

  // variabila asta se modifica la fiecare navigare in una din optiunile din ruta de /options
  const [defaultSymbols, setDefaultSymbols] = useState([]);

  useEffect(() => {
    // Apelează funcția pentru a obține datele inițiale
    fetchMarketData("http://localhost:8080/markets/options/most-active");
  }, []);

  const handleLinkClick = (buttonName) => {
    setActiveButton1(buttonName);
  };

  function getUnderlyingSymbols(items) {
    // Extrage simbolurile și elimină duplicatele folosind un Set
    const uniqueSymbols = new Set(items.map((item) => item.underlyingSymbol));
    // Convertește Set-ul în array și returnează-l
    return Array.from(uniqueSymbols);
  }

  const fetchMarketData = async (url) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        setDefaultSymbols(
          getUnderlyingSymbols(response.data.finance.result[0].quotes)
        );
        // console.log(
        //   "aici ai date pentru options: ",
        //   response.data.finance.result[0].quotes
        // );
        setData(response.data.finance.result[0].quotes);

        // console.log(
        //   "ai aici symboluripe pentru default symbols din options: ",
        //   defaultSymbols
        // );
      } else if (response.status === 400 || response.status === 401) {
        const newAccessToken = await getNewAccessToken();
        if (newAccessToken) {
          fetchMarketData(url); // Reapelează cu același URL
        } else {
          console.error("Failed to refresh token");
        }
      }
    } catch (error) {
      console.error("Error fetching market data for Options:", error);
    }
  };

  const columns = [
    "Symbol",
    "Name",
    "Underlying Symbol",
    "Strike",
    "Expiration Date",
    "Price",
    "Change",
    "Change %",
    "Bid",
    "Ask",
    "Volume",
    "Open Interest"
  ];

  // Funcția pentru a schimba butonul activ și a obține datele corespunzătoare
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    let url = "";

    switch (buttonName) {
      case "Most Active":
        url = "http://localhost:8080/markets/options/most-active";
        break;
      case "Top Gainers":
        url = "http://localhost:8080/markets/options/gainers";
        break;
      case "Top Losers":
        url = "http://localhost:8080/markets/options/losers";
        break;
      case "Highest Implied Volatility":
        url =
          "http://localhost:8080/markets/options/highest-implied-volatility"; // Asigură-te că URL-ul este corect
        break;
      case "Highest Open Interest":
        url = "http://localhost:8080/markets/options/highest-open-interest";
        break;
      default:
        break;
    }

    if (url) {
      fetchMarketData(url);
      navigate(
        `/markets/options/${buttonName.replace(/\s+/g, "-").toLowerCase()}`
      ); // Înlocuiește spațiile cu cratime
    }
  };

  return (
    <div>
      <div className="quote-container">
        {/* Mai jos vine acel left-side-links doar pentru DESKTOP */}
        <LeftSidebarWithLinks
          activeButton1={activeButton1}
          handleLinkClick={handleLinkClick}
        />

        <div className="market-container">
          <h1 className="page-title">Options</h1>

          <div className="button-group overflow-auto">
            <div className="d-flex">
              <button
                className={`option-button ${
                  activeButton === "Most Active" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Most Active")}
              >
                Most Active
              </button>
              <button
                className={`option-button ${
                  activeButton === "Top Gainers" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Top Gainers")}
              >
                Top Gainers
              </button>
              <button
                className={`option-button ${
                  activeButton === "Top Losers" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Top Losers")}
              >
                Top Losers
              </button>
              <button
                className={`option-button ${
                  activeButton === "Highest Implied Volatility" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Highest Implied Volatility")}
              >
                Highest Implied Volatility
              </button>
              <button
                className={`option-button ${
                  activeButton === "Highest Open Interest" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Highest Open Interest")}
              >
                Highest Open Interest
              </button>
            </div>
          </div>

          <Table data={data} columns={columns} formatTypeForNumbers={"long"} />

          {/* News for Options */}
          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
          <SpecificNewsForSymbols
            symbols={defaultSymbols}
            data={data}
            newsTitle="Options News"
          ></SpecificNewsForSymbols>
          <div
            className="hide-on-mobile"
            style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Options;
