import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";
import "./Options.css";

const Options = () => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("Most Active"); // Butonul activ

  useEffect(() => {
    const fetchMarketData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          "http://localhost:8080/markets/options/most-active",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status === 200 || response.status === 201) {
        //   console.log("Date pentru options:");
        //   console.log(response.data.finance.result[0].quotes);
            setData(response.data.finance.result[0].quotes);
        } else if (response.status === 400 || response.status === 401) {
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            fetchMarketData();
          } else {
            console.error("Failed to refresh token");
          }
        }
      } catch (error) {
        console.error("Error fetching market data for Options:", error);
      }
    };

    fetchMarketData();
  }, []);

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

  // Funcția pentru a schimba butonul activ
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <div className="quote-container">
        <div className="market-container">
          <h1 className="page-title">Options</h1>
          <div className="button-group">
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
          <Table data={data} columns={columns} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Options;
