import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";
import "../Options/Options.css";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";

const MutualFunds = () => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("Top Gainers"); // Butonul activ
  const [activeButton1, setActiveButton1] = useState("Mutual Funds");
  const navigate = useNavigate(); // Inițializează useNavigate

  useEffect(() => {
    // Apelează funcția pentru a obține datele inițiale
    fetchMarketData("http://localhost:8080/markets/mutual-funds/gainers");
  }, []);

  const handleLinkClick = (buttonName) => {
    setActiveButton1(buttonName);
    
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
          fetchMarketData(url);
        } else {
          console.error("Failed to refresh token");
        }
      }
    } catch (error) {
      console.error("Error fetching market data for mutual funds:", error);
    }
  };

  const columns = [
    "Symbol",
    "Name",
    "Price",
    "Change",
    "Change %",
    "50 Day Average",
    "200 Day Average",
    "3 Month Return",
    "YTD Return",
    "52 Wk Change %",
    "52 Wk Range"
  ];

  // Funcția pentru a schimba butonul activ și a obține datele corespunzătoare
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    let url = "";

    switch (buttonName) {
      case "Top Gainers":
        url = "http://localhost:8080/markets/mutual-funds/gainers";
        break;
      case "Top Losers":
        url = "http://localhost:8080/markets/mutual-funds/losers";
        break;
      case "Top Performing":
        url = "http://localhost:8080/markets/mutual-funds/top-performing";
        break;
      case "Best Historical Performance":
        url =
          "http://localhost:8080/markets/mutual-funds/best-historical-performance";
        break;

      default:
        break;
    }

    if (url) {
      fetchMarketData(url);
      navigate(
        `/markets/mutual-funds/${buttonName.replace(/\s+/g, "-").toLowerCase()}`
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
          <h1 className="page-title">Mutual Funds</h1>

          <div className="button-group overflow-auto">
            <div className="d-flex">
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
                  activeButton === "Top Performing" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Top Performing")}
              >
                Top Performing
              </button>

              <button
                className={`option-button ${
                  activeButton === "Best Historical Performance" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Best Historical Performance")}
              >
                Best Historical Performance
              </button>
            </div>
          </div>

          <Table
            data={data}
            columns={columns}
            formatTypeForNumbers={"normal"}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MutualFunds;
