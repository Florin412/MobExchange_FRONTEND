import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";
import "../Options/Options.css";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";

const Crypto = () => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("Most Active"); // Butonul activ
  const [activeButton1, setActiveButton1] = useState("Crypto");
  const navigate = useNavigate(); // Inițializează useNavigate

  useEffect(() => {
    // Apelează funcția pentru a obține datele inițiale
    fetchMarketData("http://localhost:8080/markets/crypto/most-active");
  }, []);

  const handleLinkClick = (buttonName) => {
    setActiveButton1(buttonName);
    navigate(
      `/markets/stocks/${buttonName.replace(/\s+/g, "-").toLowerCase()}`
    );
  };

  const fetchMarketData = async (url) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        // console.log(response.data.finance.result[0].quotes);
        setData(response.data.finance.result[0].quotes);
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
          <h1 className="page-title">Crypto</h1>

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
            </div>
          </div>

          <Table
            data={data}
            columns={columns}
            formatTypeForNumbers={"veryLong"}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Crypto;
