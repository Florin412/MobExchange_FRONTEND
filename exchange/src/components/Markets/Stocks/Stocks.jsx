import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";
import "../Options/Options.css";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";
import SpecificNewsForSymbols from "../../SpecificNewsForSymbols/SpecificNewsForSymbols";
import DownloadButtons from "../DownloadButtons/DownloadButtons";

const Stocks = () => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("Most Active"); // Butonul activ
  const [activeButton1, setActiveButton1] = useState("Stocks");
  const navigate = useNavigate(); // Inițializează useNavigate

  // variabila asta se modifica la fiecare navigare in una din optiunile din ruta de /stocks
  const [defaultSymbols, setDefaultSymbols] = useState([]);

  useEffect(() => {
    // Apelează funcția pentru a obține datele inițiale
    fetchMarketData("http://localhost:8080/markets/stocks/most-active");
  }, []);

  const handleLinkClick = (buttonName) => {
    setActiveButton1(buttonName);
  };

  function getSymbols(items) {
    // Extrage simbolurile și elimină duplicatele folosind un Set
    const uniqueSymbols = new Set(items.map((item) => item.symbol));
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
        setDefaultSymbols(getSymbols(response.data.finance.result[0].quotes));
        setData(response.data.finance.result[0].quotes);
        // console.log(
        //   "aici ai date pentru stocks: ",
        //   response.data.finance.result[0].quotes
        // );
        setData(response.data.finance.result[0].quotes);

        // console.log(
        //   "ai aici symboluripe pentru default symbols din stocks: ",
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
      console.error("Error fetching market data for stocks:", error);
    }
  };

  const columns = [
    "Symbol",
    "Name",
    "Graph",
    "Price",
    "Change",
    "Change %",
    "Volume",
    "Avg Vol (3M)",
    "Market Cap",
    "P/E Ratio (TTM)",
    "52 Wk Change %",
    "52 Wk Range"
  ];

  // Funcția pentru a schimba butonul activ și a obține datele corespunzătoare
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    let url = "";

    switch (buttonName) {
      case "Most Active":
        url = "http://localhost:8080/markets/stocks/most-active";
        break;
      case "Trending Now":
        url = "http://localhost:8080/markets/stocks/trending";
        break;
      case "Top Gainers":
        url = "http://localhost:8080/markets/stocks/gainers";
        break;
      case "Top Losers":
        url = "http://localhost:8080/markets/stocks/losers";
        break;
      case "52 Week Gainers":
        url = "http://localhost:8080/markets/stocks/52-wk-gainers";
        break;
      case "52 Week Losers":
        url = "http://localhost:8080/markets/stocks/52-wk-losers";
        break;
      default:
        break;
    }

    if (url) {
      fetchMarketData(url);
      navigate(
        `/markets/stocks/${buttonName.replace(/\s+/g, "-").toLowerCase()}`
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
          <div id="ss-stocks">
            <h1 className="page-title">
              Stocks
              <DownloadButtons
                tableId={"ss-stocks"}
                data={data}
                columns={columns}
              ></DownloadButtons>
            </h1>

            <div className="button-group overflow-auto">
              {" "}
              {/* Adaugă overflow-auto pentru derularea orizontală */}
              <div className="d-flex">
                {" "}
                {/* Flexbox pentru a aranja butoanele pe orizontală */}
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
                    activeButton === "Trending Now" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("Trending Now")}
                >
                  Trending Now
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
                    activeButton === "52 Week Gainers" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("52 Week Gainers")}
                >
                  52 Week Gainers
                </button>
                <button
                  className={`option-button ${
                    activeButton === "52 Week Losers" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("52 Week Losers")}
                >
                  52 Week Losers
                </button>
              </div>
            </div>

            <Table
              data={data}
              columns={columns}
              formatTypeForNumbers={"normal"}
            />
          </div>

          {/* News for Stocks */}
          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
          <SpecificNewsForSymbols
            symbols={defaultSymbols}
            data={data}
            newsTitle="Stocks News"
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

export default Stocks;
