import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";
import SpecificNewsForSymbols from "../../SpecificNewsForSymbols/SpecificNewsForSymbols";

import "./Bonds.css";
import DownloadButtons from "../DownloadButtons/DownloadButtons";

const Bonds = () => {
  const [data, setData] = useState([]);
  const [activeButton1, setActiveButton1] = useState("Bonds");

  const defaultSymbols = ["^IRX", "^FVX", "^TNX", "^TYX", "2YY=F", "ZN=F"];

  useEffect(() => {
    const fetchMarketData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          "http://localhost:8080/markets/bonds",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status === 200 || response.status === 201) {
          setData(response.data.quoteResponse.result); // Stocăm datele în state
        } else if (response.status === 400 || response.status === 401) {
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            fetchMarketData(); // Retry the request with the new access token
          } else {
            console.error("Failed to refresh token");
          }
        }
      } catch (error) {
        console.error("Error fetching market data for Bonds:", error);
      }
    };

    fetchMarketData();
  }, []);

  const handleLinkClick = (buttonName) => {
    setActiveButton1(buttonName);
  };

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
        <LeftSidebarWithLinks
          activeButton1={activeButton1}
          handleLinkClick={handleLinkClick}
        />

        <div className="market-container" id="my-bonds-table">
          <div id="ss-bonds">
            <h1 className="page-title">
              Bonds
              <DownloadButtons
                tableId={"ss-bonds"}
                data={data}
                columns={columns}
                aria-label="Download bonds table"
              ></DownloadButtons>
            </h1>
            <Table
              data={data}
              columns={columns}
              formatTypeForNumbers={"long"}
            />
          </div>

          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
          <SpecificNewsForSymbols
            symbols={defaultSymbols}
            data={data}
            newsTitle="Bonds News"
          />
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

export default Bonds;
