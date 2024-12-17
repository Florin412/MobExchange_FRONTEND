import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";

const WorldIndices = () => {
  const [data, setData] = useState([]); // State pentru a stoca datele primite de la API

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/markets/world-indices"
        );
        console.log("Salut, mai jos ai raspunsul pentru world indices");
        console.log(response.data.quoteResponse.result);
        setData(response.data.quoteResponse.result); // Stocăm datele în state
      } catch (error) {
        console.error("Error fetching market data for world indices:", error);
      }
    };

    fetchMarketData();
  }, []);

  // Array cu numele coloanelor
  const columns = [
    "Symbol",
    "Name",
    "Graph",
    "Price",
    "Change",
    "Change%",
    "Volume",
    "Day Range",
    "52 Wk Range"
  ];

  return (
    <div>
      <div className="market-container">
        <h1 className="page-title">World Indices</h1>
        <Table data={data} columns={columns} />{" "}
        {/* Trimitem datele și coloanele */}
      </div>

      <Footer />
    </div>
  );
};

export default WorldIndices;
