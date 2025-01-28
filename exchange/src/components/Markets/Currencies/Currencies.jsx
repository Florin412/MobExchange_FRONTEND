import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";

const Currencies = () => {
  // data este un array cu 40 de obiecte, obiecte ce reprezinta cate un asset, iar in obiect sunt date generale despre asset.
  // NU contine date istorice, deci nu se poate crea coloana pentru graph !!
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          "http://localhost:8080/markets/currencies",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log(
            "Salut, acces token bun, mai jos ai raspunsul pentru currencies: "
          );
          console.log(response.data.quoteResponse.result);
          setData(response.data.quoteResponse.result); // Stocăm datele în state
        } else if (response.status === 400 || response.status === 401) {
          // If access token is expired, lets creat a new one.
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            fetchMarketData(); // Retry the request with the new access token
          } else {
            console.error("Failed to refresh token");
          }
        }
      } catch (error) {
        console.error("Error fetching market data for currencies:", error);
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
    "Change %",
    "52 Wk Range"
  ];

  return (
    <div>
      <div className="quote-container">
        <div className="market-container">
          <h1 className="page-title">Currencies</h1>
          <Table data={data} columns={columns} />{" "}
          {/* Trimitem datele și coloanele */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Currencies;
