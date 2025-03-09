import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";
// import { useNavigate } from "react-router-dom";
import "./WorldIndices.css";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";
import SpecificNewsForSymbols from "../../SpecificNewsForSymbols/SpecificNewsForSymbols";

const WorldIndices = () => {
  const [data, setData] = useState([]);
  const [activeButton1, setActiveButton1] = useState("World Indices");
  // const navigate = useNavigate();

  const defaultSymbols = [
    "^GSPC",
    "^DJI",
    "^IXIC",
    "^NYA",
    "^XAX",
    "^BUK100P",
    "^RUT",
    "^VIX",
    "^FTSE",
    "^GDAXI",
    "^FCHI",
    "^STOXX50E",
    "^N100",
    "^BFX",
    "MOEX.ME",
    "N225",
    "^HSI",
    "00001.SS",
    "99001.SZ",
    "^STI",
    "^AXJO",
    "^AORD",
    "[BSESN",
    "^JKSE",
    "^KLSE",
    "^NZ50",
    "^KS11",
    "^TWII",
    "^GSPTSE",
    "^BVSP",
    "^MXX",
    "^IPSA",
    "^MERV",
    "^TA125.TA",
    "^CASE30",
    "JN0U.JO",
    "DX-Y.NYB",
    "^125904-USD-STRD",
    "^XDB",
    "^XDE",
    "000001.SS",
    "^N225",
    "^XDN",
    "^XDA"
  ];

  useEffect(() => {
    const fetchMarketData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          "http://localhost:8080/markets/world-indices",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status === 200 || response.status === 201) {
          setData(response.data.quoteResponse.result);
        } else if (response.status === 400 || response.status === 401) {
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            fetchMarketData();
          } else {
            console.error("Failed to refresh token");
          }
        }
      } catch (error) {
        console.error("Error fetching market data for world indices:", error);
      }
    };

    fetchMarketData();
  }, []);

  const columns = [
    "Symbol",
    "Name",
    "Graph",
    "Price",
    "Change",
    "Change %",
    "Volume",
    "Day Range",
    "52 Wk Range"
  ];

  const handleLinkClick = (buttonName) => {
    setActiveButton1(buttonName);
  };

  return (
    <div>
      <div className="quote-container">
        {/* Mai jos vine acel left-side-links doar pentru DESKTOP */}

        <LeftSidebarWithLinks
          activeButton1={activeButton1}
          handleLinkClick={handleLinkClick}
        />

        {/* Mai jos ai continutul pentru tabelul propriu zis */}
        <div className="market-container">
          <h1 className="page-title">World Indices</h1>
          <Table data={data} columns={columns} />

          {/* News for World Indices */}
          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
          <h2 className="page-title">World Indices News</h2>
          <SpecificNewsForSymbols
            symbols={defaultSymbols} data={data}
          ></SpecificNewsForSymbols>
          <div
            className="hide-on-mobile"
            style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }}
          />
        </div>
      </div>

      {/* Componenta pentru news */}
      <Footer />
    </div>
  );
};

export default WorldIndices;
