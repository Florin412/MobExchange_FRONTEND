// import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
// import axios from "axios";
import "./MarketOverview.css";
import Table from "../TableForAssets/Table";

const MarketOverview = () => {
  // const [marketData, setMarketData] = useState([]);

  const americasData = [
    { symbol: "S&P 500", price: "6,043.51", change: "-0.15%" },
    { symbol: "Dow 30", price: "44,408.98", change: "+0.02%" }
  ];

  const europeData = [
    { symbol: "FTSE 100", price: "8,280.36", change: "-0.86%" },
    { symbol: "CAC 40", price: "7,394.78", change: "-1.14%" }
    // ... alte date
  ];

  // Și pentru Asia
  const asiaData = [
    { symbol: "SSE Composite", price: "3,422.66", change: "+0.59%" },
    { symbol: "Nikkei 225", price: "39,367.58", change: "+0.53%" }
    // ... alte date
  ];

  // useEffect(() => {
  //   const fetchMarketData = async () => {
  //     try {
  //       const response = await axios.get("https://api.example.com/marketdata"); // Replace with your API endpoint
  //       setMarketData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching market data:", error);
  //     }
  //   };

  //   fetchMarketData();
  // }, []);

  return (
    <div>
      <div className="market-container">
        <h1 className="page-title">Markets Overview</h1>

        {/* World Indices Section */}
        <div>
          <h2>World Indices &rarr;</h2>
          <div>
            <Table
              title="Americas"
              data={americasData}
              columns={["Symbol", "Price", "Change%"]}
            />
            <Table
              title="Europe"
              data={europeData}
              columns={["Symbol", "Price", "Change%"]}
            />
            <Table
              title="Asia"
              data={asiaData}
              columns={["Symbol", "Price", "Change%"]}
            />
          </div>
        </div>

        {/* Assets Section */}
        <div>
          <h2>Assets</h2>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MarketOverview;
