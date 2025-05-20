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

const Crypto = () => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("Most Active"); // Butonul activ
  const [activeButton1, setActiveButton1] = useState("Crypto");
  const navigate = useNavigate(); // Inițializează useNavigate
  // variabila asta se modifica la fiecare navigare in una din optiunile din ruta de /crypto
  const [defaultSymbols, setDefaultSymbols] = useState([]);

  useEffect(() => {
    // Apelează funcția pentru a obține datele inițiale
    fetchMarketData("http://localhost:8080/markets/crypto/most-active");
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
        //   "aici ai date pentru crypto: ",
        //   response.data.finance.result[0].quotes
        // );
        setData(response.data.finance.result[0].quotes);

        // console.log(
        //   "ai aici symboluripe pentru default symbols din crypto: ",
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
      console.error("Error fetching market data for crypto:", error);
    }
  };

  const columns = [
    "Symbol",
    "Name",
    "Graph",
    "Price",
    "Change",
    "Change %",
    "Market Cap",
    "Volume",
    "Volume in Currency (24hr)",
    "Total Volume All Currencies (24hr)",
    "Circulating Supply",
    "52 Wk Change %",
    "52 Wk Range"
  ];

  // Funcția pentru a schimba butonul activ și a obține datele corespunzătoare
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    let url = "";

    switch (buttonName) {
      case "Most Active":
        url = "http://localhost:8080/markets/crypto/most-active";
        break;
      case "Top Gainers":
        url = "http://localhost:8080/markets/crypto/gainers";
        break;
      case "Top Losers":
        url = "http://localhost:8080/markets/crypto/losers";
        break;

      default:
        break;
    }

    if (url) {
      fetchMarketData(url);
      navigate(
        `/markets/crypto/${buttonName.replace(/\s+/g, "-").toLowerCase()}`
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
          <div id="ss-crypto">
            <h1 className="page-title">
              Crypto
              <DownloadButtons
                tableId={"ss-crypto"}
                data={data}
                columns={columns}
                aria-label="Download criptocurrency table"
              ></DownloadButtons>
            </h1>

            <div className="button-group overflow-auto">
              <div className="d-flex">
                <button
                  className={`option-button ${
                    activeButton === "Most Active" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("Most Active")}
                  aria-label="Show most active cryptocurrencies"
                >
                  Most Active
                </button>

                <button
                  className={`option-button ${
                    activeButton === "Top Gainers" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("Top Gainers")}
                  aria-label="Show top gainers cryptocurrencies"
                >
                  Top Gainers
                </button>
                <button
                  className={`option-button ${
                    activeButton === "Top Losers" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("Top Losers")}
                  aria-label="Show top losers cryptocurrencies"
                >
                  Top Losers
                </button>
              </div>
            </div>

            <Table
              data={data}
              columns={columns}
              formatTypeForNumbers={"veryLong"}
            />
          </div>

          {/* News for Crypto */}
          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
          <SpecificNewsForSymbols
            symbols={defaultSymbols}
            data={data}
            newsTitle="Crypto News"
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

export default Crypto;
