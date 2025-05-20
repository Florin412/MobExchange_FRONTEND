import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";
import SpecificNewsForSymbols from "../../SpecificNewsForSymbols/SpecificNewsForSymbols";
import DownloadButtons from "../DownloadButtons/DownloadButtons";

const Futures = () => {
  // data este un array cu 40 de obiecte, obiecte ce reprezinta cate un asset, iar in obiect sunt date generale despre asset.
  // NU contine date istorice, deci nu se poate crea coloana pentru graph !!
  const [data, setData] = useState([]);
  const [activeButton1, setActiveButton1] = useState("Futures");

  const defaultSymbols = [
    "ES=F",
    "YM=F",
    "NQ=F",
    "RTY=F",
    "ZB=F",
    "ZN=F",
    "ZF=F",
    "ZT=F",
    "GC=F",
    "MGC=F",
    "SI=F",
    "SIL=F",
    "PL=F",
    "HG=F",
    "PA=F",
    "CL=F",
    "HO=F",
    "NG=F",
    "RB=F",
    "BZ=F",
    "B0=F",
    "ZC=F",
    "ZO=F",
    "KE=F",
    "ZR=F",
    "ZM=F",
    "ZL=F",
    "ZS=F",
    "GF=F",
    "HE=F",
    "LE=F",
    "CC=F",
    "KC=F",
    "CT=F",
    "LBS=F",
    "OJ=F",
    "SB=F"
  ];

  useEffect(() => {
    const fetchMarketData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          "http://localhost:8080/markets/commodities",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status === 200 || response.status === 201) {
          // console.log(
          //   "Salut, ai aici date pentru futures: ",
          //   response.data.quoteResponse.result
          // );
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
        console.error("Error fetching market data for futures:", error);
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
    "Market Time",
    "Change",
    "Change %",
    "Volume",
    "Open Interest"
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

        <div className="market-container">
          <div id="ss-futures">
            <h1 className="page-title">
              Futures
              <DownloadButtons
                tableId={"ss-futures"}
                data={data}
                columns={columns}
                aria-label="Download futures table"
              ></DownloadButtons>
            </h1>
            <Table data={data} columns={columns} />
          </div>

          {/* News for Futures */}
          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
          <SpecificNewsForSymbols
            symbols={defaultSymbols}
            data={data}
            newsTitle="Futures News"
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

export default Futures;
