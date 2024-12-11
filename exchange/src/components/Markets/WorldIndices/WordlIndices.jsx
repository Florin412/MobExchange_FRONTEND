import { useEffect } from "react";
import Footer from "../../footer/Footer";
import axios from "axios";
// import Table from "../TableForAssets/Table";

const WorldIndices = () => {
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/markets/world-indices"
        ); // Replace with your API endpoint
        console.log("Salut, mai jos ai raspunsul pentru world indices");
        console.log(response);
      } catch (error) {
        console.error("Error fetching market data for world indices:", error);
      }
    };

    // pe backend, la fiecare 60 de minute se face cerere la API pentru date, iar eu primesc datele stocate intr-un fisier, astfel nu ajung la limita cu apelurile api
    fetchMarketData();
  }, []);

  return (
    <div>
      <div className="market-container">
        <h1 className="page-title">World Indices</h1>
        {/* <Table></Table> */}
      </div>

      <Footer />
    </div>
  );
};

export default WorldIndices;
