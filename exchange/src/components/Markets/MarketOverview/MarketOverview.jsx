import Footer from "../../footer/Footer";
import "./MarketOverview.css";
import Table from "../TableForAssets/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { getNewAccessToken } from "../../Auth/auth_functions";
import "../Options/Options.css";
import { Link } from "react-router-dom";
import TrendingNowCards from "./TrendingNowCards/TrendingNowCards";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MarketOverview = () => {
  const [usWorldIndices, setUSWorldIndices] = useState([]);
  const [europaWorldIndices, setEuropaWorldIndices] = useState([]);
  const [asiaWorldIndices, setAsiaWorldIndices] = useState([]);
  const [commoditiesOverview, setCommoditiesOverview] = useState([]);
  const [currenciesOverview, setCurrenciesOverview] = useState([]);
  const [bondsOverview, setBondsOverview] = useState([]);
  const [etfsMostActive, setEtfsMostActive] = useState([]);
  const [etfsGainers, setEtfsGainers] = useState([]);
  const [etfsLosers, setEtfsLosers] = useState([]);
  const [etfsTopPerforming, setEtfsTopPerforming] = useState([]);
  const [etfsTrending, setEtfsTrending] = useState([]);
  const [etfsBestHPerformance, setEtfsBestHPerformance] = useState([]);

  const [mutualFundsGainers, setMutualFundsGainers] = useState([]);
  const [mutualFundsLosers, setMutualFundsLosers] = useState([]);
  const [mutualFundsTopPerforming, setMutualFundsTopPerforming] = useState([]);
  const [
    mutualFundsBestHistoricalPerformance,
    setMutualFundsBestHistoricalPerformance
  ] = useState([]);

  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("Most Active"); // Butonul activ pt stocks

  const [data1, setData1] = useState([]);
  const [activeButton1, setActiveButton1] = useState("Most Active"); // Butonul activ pt crypto

  const [activeButton11, setActiveButton11] = useState("Overview");

  const handleLinkClick = (buttonName) => {
    setActiveButton1(buttonName);
  };

  // This methos fetches data for world indices in us, europa and asia
  const fetchWorldIndices = async (url, logMessage, region) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        // console.log(logMessage);
        //console.log(response.data.quoteResponse.result);

        // Logica specifică pentru fiecare regiune
        if (region === "us") {
          setUSWorldIndices(response.data.quoteResponse.result.slice(0, 8));
        } else if (region === "europa") {
          setEuropaWorldIndices(response.data.quoteResponse.result);
        } else if (region === "asia") {
          setAsiaWorldIndices(response.data.quoteResponse.result);
        } else if (region === "commodities-overview") {
          setCommoditiesOverview(response.data.quoteResponse.result);
        } else if (region === "currencies-overview") {
          setCurrenciesOverview(response.data.quoteResponse.result);
        } else if (region === "bonds-overview") {
          setBondsOverview(response.data.quoteResponse.result);
        } else if (region === "etfs-most-active") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsMostActive(response.data.finance.result[0].quotes.slice(0, 5));
        } else if (region === "etfs-gainers") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsGainers(response.data.finance.result[0].quotes.slice(0, 5));
        } else if (region === "etfs-losers") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsLosers(response.data.finance.result[0].quotes.slice(0, 5));
        } else if (region === "etfs-top-performing") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsTopPerforming(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "etfs-trending") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsTrending(response.data.finance.result[0].quotes.slice(0, 5));
        } else if (region === "etfs-best-historical-performance") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsBestHPerformance(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "mutual-funds-gainers") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setMutualFundsGainers(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "mutual-funds-losers") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setMutualFundsLosers(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "mutual-funds-top-performing") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setMutualFundsTopPerforming(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "mutual-funds-best-historical-performance") {
          // console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setMutualFundsBestHistoricalPerformance(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else {
          console.error("Regiune necunoscută");
        }
      } else if (response.status === 400 || response.status === 401) {
        // If access token is expired, let's create a new one.
        const newAccessToken = await getNewAccessToken();
        if (newAccessToken) {
          fetchWorldIndices(url, logMessage, region); // Retry the request with the new access token
        } else {
          console.error("Failed to refresh token");
        }
      }
    } catch (error) {
      console.error("Error fetching market data for world indices:", error);
    }
  };

  const fetchMarketData = async (url, category) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        // console.log(response.data.finance.result[0].quotes);

        if (category === "stocks") {
          setData(response.data.finance.result[0].quotes.slice(0, 8));
        } else if (category === "crypto") {
          setData1(response.data.finance.result[0].quotes.slice(0, 8));
        }
      } else if (response.status === 400 || response.status === 401) {
        const newAccessToken = await getNewAccessToken();
        if (newAccessToken) {
          fetchMarketData(url, category); // Reapelează cu același URL
        } else {
          console.error("Failed to refresh token");
        }
      }
    } catch (error) {
      console.error("Error fetching market data for stocks:", error);
    }
  };

  const columns = [
    "Symbol",
    "Name",
    "Graph",
    "Price",
    "Change",
    "Change %",
    "Volume",
    "Avg Vol (3M)",
    "Market Cap",
    "P/E Ratio (TTM)",
    "52 Wk Change %",
    "52 Wk Range"
  ];

  const columns1 = [
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
  const handleButtonClick = async (buttonName) => {
    setActiveButton(buttonName);
    let url = "";

    switch (buttonName) {
      case "Most Active":
        url = "http://localhost:8080/markets/stocks/most-active";
        break;
      case "Trending Now":
        url = "http://localhost:8080/markets/stocks/trending";
        break;
      case "Top Gainers":
        url = "http://localhost:8080/markets/stocks/gainers";
        break;
      case "Top Losers":
        url = "http://localhost:8080/markets/stocks/losers";
        break;
      case "52 Week Gainers":
        url = "http://localhost:8080/markets/stocks/52-wk-gainers";
        break;
      case "52 Week Losers":
        url = "http://localhost:8080/markets/stocks/52-wk-losers";
        break;
      default:
        return; // Ieșim din funcție dacă nu se potrivește niciun caz
    }

    if (url) {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.status === 200 || response.status === 201) {
          // console.log(response.data.finance.result[0].quotes.slice(0, 8));
          setData(response.data.finance.result[0].quotes.slice(0, 8));
        } else if (response.status === 400 || response.status === 401) {
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            fetchMarketData(url); // Reapelează cu același URL
          } else {
            console.error("Failed to refresh token");
          }
        }
      } catch (error) {
        console.error("Error fetching market data for stocks:", error);
      }
    }
  };

  const handleButtonClick1 = async (buttonName) => {
    setActiveButton1(buttonName);
    let url1 = "";

    switch (buttonName) {
      case "Most Active":
        url1 = "http://localhost:8080/markets/crypto/most-active";
        break;
      case "Top Gainers":
        url1 = "http://localhost:8080/markets/crypto/gainers";
        break;
      case "Top Losers":
        url1 = "http://localhost:8080/markets/crypto/losers";
        break;
      default:
        return; // Ieșim din funcție dacă nu se potrivește niciun caz
    }

    if (url1) {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(url1, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.status === 200 || response.status === 201) {
          // console.log(response.data.finance.result[0].quotes.slice(0, 8));
          setData1(response.data.finance.result[0].quotes.slice(0, 8)); // Actualizăm datele pentru crypto
        } else if (response.status === 400 || response.status === 401) {
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            handleButtonClick1(buttonName); // Reapelează cu același buttonName
          } else {
            console.error("Failed to refresh token");
          }
        }
      } catch (error) {
        console.error("Error fetching market data for crypto:", error);
      }
    }
  };

  // Acest hook este folosit pentru a face request -uri la server pentru a obtine toate datele din tabele.
  useEffect(() => {
    fetchWorldIndices(
      "http://localhost:8080/markets/world-indices",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru world indices",
      "us"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/world-indices/europa",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru world indices europa",
      "europa"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/world-indices/asia",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru world indices asia",
      "asia"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/commodities/overview",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru commodities overview",
      "commodities-overview"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/currencies/overview",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru currencies overview",
      "currencies-overview"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/bonds/overview",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru bonds overview",
      "bonds-overview"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/etfs/most-active",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru etfs most active",
      "etfs-most-active"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/etfs/gainers",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru etfs gainers",
      "etfs-gainers"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/etfs/losers",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru etfs losers",
      "etfs-losers"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/etfs/top-performing",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru etfs top performing",
      "etfs-top-performing"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/etfs/trending",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru etfs trending",
      "etfs-trending"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/etfs/best-historical-performance",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru etfs trending",
      "etfs-best-historical-performance"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/mutual-funds/gainers",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru mutual funds gainers",
      "mutual-funds-gainers"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/mutual-funds/losers",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru mutual funds losers",
      "mutual-funds-losers"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/mutual-funds/top-performing",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru mutual funds top performing",
      "mutual-funds-top-performing"
    );
    fetchWorldIndices(
      "http://localhost:8080/markets/mutual-funds/best-historical-performance",
      "__Salut, Acces token bun, mai jos ai raspunsul pentru mutual funds best historical performance",
      "mutual-funds-best-historical-performance"
    );
    fetchMarketData(
      "http://localhost:8080/markets/stocks/most-active",
      "stocks"
    );
    fetchMarketData(
      "http://localhost:8080/markets/crypto/most-active",
      "crypto"
    );
  }, []);

  const exportToPDF = () => {
    const input = document.getElementById("market-container-1"); // ID-ul tabelului

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190; // Lățimea imaginii în PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("table_report.pdf");
    });
  };

  return (
    <div>
      <div className="quote-container">
        {/* Mai jos vine acel left-side-links doar pentru DESKTOP */}
        <LeftSidebarWithLinks
          activeButton1={activeButton11}
          handleLinkClick={handleLinkClick}
        />

        <div className="market-container" id="market-container-1">
          <h1 className="page-title-overview">
            Markets Overview
            {/* <span>
              <button
                onClick={exportToPDF}
                // style={{ display: "flex", alignItems: "center" }}
              >
                <i
                  className="fas fa-file-download download-icon"
                  style={{ marginRight: "8px" }}
                ></i>
                <span className="tooltip-download-btn">Download PDF</span>
              </button>
            </span> */}
            <button
              type="button"
              className="btn btn-secondary download-btn"
              onClick={exportToPDF}
              aria-label="Export to PDF button"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title="Download PDF"
            >
              <i
                className="fas fa-file-download download-icon"
                style={{ marginRight: "8px" }}
              ></i>
            </button>
          </h1>

          {/* --------------------- */}
          {/* World Indices Section */}
          {/* --------------------- */}
          <div>
            <div style={{ padding: "15px 0" }}>
              <Link
                to="/markets/world-indices"
                className="page-subtitle-overview"
                aria-label="Go to World Indices page"
              >
                World Indices &rarr;
              </Link>
            </div>

            <div className="row">
              <div className="col-12">
                {" "}
                {/* Folosește col-12 pentru a ocupa întreaga lățime */}
                <div className="d-flex overflow-auto">
                  {" "}
                  {/* Flexbox pentru a permite derularea orizontală */}
                  <div
                    className="col-md-3"
                    style={{ minWidth: "380px", marginRight: "14px" }}
                  >
                    <h3 style={{ fontWeight: 600, fontSize: "16px" }}>
                      Americas
                    </h3>
                    <div style={{ overflowX: "hidden" }}>
                      {" "}
                      {/* Permite scroll orizontal pe container */}
                      <Table
                        data={usWorldIndices}
                        columns={["Symbol", "Graph", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }} // Asigură-te că tabelul se ajustează corect
                      />
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{ minWidth: "380px", marginRight: "14px" }}
                  >
                    <h3 style={{ fontWeight: 600, fontSize: "16px" }}>
                      Europe
                    </h3>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={europaWorldIndices}
                        columns={["Symbol", "Graph", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3" style={{ minWidth: "380px" }}>
                    <h3 style={{ fontWeight: 600, fontSize: "16px" }}>Asia</h3>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={asiaWorldIndices}
                        columns={["Symbol", "Graph", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />

          {/* --------------------- */}
          {/* Assets Section */}
          {/* --------------------- */}
          <div>
            <h2 style={{ marginBottom: "15px", fontSize: "24px" }}>Assets</h2>

            <div className="row">
              <div className="col-12">
                {" "}
                {/* Folosește col-12 pentru a ocupa întreaga lățime */}
                <div className="d-flex overflow-auto">
                  {" "}
                  {/* Flexbox pentru a permite derularea orizontală */}
                  <div
                    className="col-md-3"
                    style={{ minWidth: "380px", marginRight: "14px" }}
                  >
                    <div>
                      <Link
                        to="/markets/commodities"
                        className="page-subtitle-overview small"
                        aria-label="Go to Commodities page"
                      >
                        Commodities &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      {" "}
                      {/* Permite scroll orizontal pe container */}
                      <Table
                        data={commoditiesOverview}
                        columns={["Symbol", "Graph", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }} // Asigură-te că tabelul se ajustează corect
                      />
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{ minWidth: "380px", marginRight: "14px" }}
                  >
                    <div>
                      <Link
                        to="/markets/currencies"
                        className="page-subtitle-overview small"
                        aria-label="Go to Currencies page"
                      >
                        Currencies &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={currenciesOverview}
                        columns={["Symbol", "Graph", "Price", "Change %"]}
                        formatTypeForNumbers={"long"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3" style={{ minWidth: "380px" }}>
                    <div>
                      <Link
                        to="/markets/bonds"
                        className="page-subtitle-overview small"
                        aria-label="Go to Bonds page"
                      >
                        US Treasury Bonds &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={bondsOverview}
                        columns={["Symbol", "Graph", "Price", "Change %"]}
                        formatTypeForNumbers={"long"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />

          {/* --------------------- */}
          {/* Stocks Section */}
          {/* --------------------- */}
          <div>
            <div style={{ paddingBottom: "15px" }}>
              <Link
                to="/markets/stocks/most-active"
                className="page-subtitle-overview"
                aria-label="Go to Stocks page"
              >
                Stocks &rarr;
              </Link>
            </div>

            <div>
              <TrendingNowCards
                titleForCards={"Trending Now"}
                urlForAssets={"http://localhost:8080/markets/stocks/trending"}
              ></TrendingNowCards>

              {/* Mai jos ai de lucru */}
              <div style={{ marginTop: "15px" }}>
                <div className="button-group overflow-auto">
                  {" "}
                  {/* Adaugă overflow-auto pentru derularea orizontală */}
                  <div className="d-flex">
                    {" "}
                    {/* Flexbox pentru a aranja butoanele pe orizontală */}
                    <button
                      className={`option-button ${
                        activeButton === "Most Active" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("Most Active", "stocks")}
                      aria-label="Show most active stocks"
                    >
                      Most Active
                    </button>
                    <button
                      className={`option-button ${
                        activeButton === "Trending Now" ? "active" : ""
                      }`}
                      onClick={() =>
                        handleButtonClick("Trending Now", "stocks")
                      }
                      aria-label="Show trending now stocks"
                    >
                      Trending Now
                    </button>
                    <button
                      className={`option-button ${
                        activeButton === "Top Gainers" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("Top Gainers", "stocks")}
                      aria-label="Show top gainers stocks"
                    >
                      Top Gainers
                    </button>
                    <button
                      className={`option-button ${
                        activeButton === "Top Losers" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("Top Losers", "stocks")}
                      aria-label="Show top losers stocks"
                    >
                      Top Losers
                    </button>
                    <button
                      className={`option-button ${
                        activeButton === "52 Week Gainers" ? "active" : ""
                      }`}
                      onClick={() =>
                        handleButtonClick("52 Week Gainers", "stocks")
                      }
                      aria-label="Show 52 week gainers stocks"
                    >
                      52 Week Gainers
                    </button>
                    <button
                      className={`option-button ${
                        activeButton === "52 Week Losers" ? "active" : ""
                      }`}
                      onClick={() =>
                        handleButtonClick("52 Week Losers", "stocks")
                      }
                      aria-label="Show 52 week losers stocks"
                    >
                      52 Week Losers
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
          </div>

          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
          {/* --------------------- */}
          {/* Crypto Section */}
          {/* --------------------- */}
          <div>
            <div style={{ paddingBottom: "15px" }}>
              <Link
                to="/markets/crypto/most-active"
                className="page-subtitle-overview"
              >
                Cryptocurrencies &rarr;
              </Link>
            </div>

            <div>
              <div>
                <div className="button-group overflow-auto">
                  {" "}
                  {/* Adaugă overflow-auto pentru derularea orizontală */}
                  <div className="d-flex">
                    {" "}
                    {/* Flexbox pentru a aranja butoanele pe orizontală */}
                    <button
                      className={`option-button ${
                        activeButton1 === "Most Active" ? "active" : ""
                      }`}
                      onClick={() =>
                        handleButtonClick1("Most Active", "crypto")
                      }
                      aria-label="Show most active cryptocurrencies"
                    >
                      Most Active
                    </button>
                    <button
                      className={`option-button ${
                        activeButton1 === "Top Gainers" ? "active" : ""
                      }`}
                      onClick={() =>
                        handleButtonClick1("Top Gainers", "crypto")
                      }
                      aria-label="Show top gainers cryptocurrencies"
                    >
                      Top Gainers
                    </button>
                    <button
                      className={`option-button ${
                        activeButton1 === "Top Losers" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick1("Top Losers", "crypto")}
                      aria-label="Show top losers cryptocurrencies"
                    >
                      Top Losers
                    </button>
                  </div>
                </div>
                <Table
                  data={data1}
                  columns={columns1}
                  formatTypeForNumbers={"veryLong"}
                />
              </div>
            </div>
          </div>

          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />

          {/* --------------------- */}
          {/* ETFs Section */}
          {/* --------------------- */}
          <div>
            <h2 style={{ marginBottom: "15px", fontSize: "24px" }}>ETFs</h2>

            <div className="row">
              <div className="col-12">
                {" "}
                {/* Folosește col-12 pentru a ocupa întreaga lățime */}
                <div className="d-flex overflow-auto hide-scrollbar">
                  {" "}
                  {/* Flexbox pentru a permite derularea orizontală */}
                  <div
                    className="col-md-3"
                    style={{ minWidth: "450px", marginRight: "14px" }}
                  >
                    <div>
                      <Link
                        to="/markets/etfs/most-active"
                        className="page-subtitle-overview small"
                        aria-label="Go to Most Active ETFs page"
                      >
                        Most Active &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      {" "}
                      {/* Permite scroll orizontal pe container */}
                      <Table
                        data={etfsMostActive}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }} // Asigură-te că tabelul se ajustează corect
                      />
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{ minWidth: "450px", marginRight: "14px" }}
                  >
                    <div>
                      <Link
                        to="/markets/etfs/top-gainers"
                        className="page-subtitle-overview small"
                        aria-label="Go to Top Gainers ETFs page"
                      >
                        Top Gainers &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={etfsGainers}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3" style={{ minWidth: "450px" }}>
                    <div>
                      <Link
                        to="/markets/etfs/top-losers"
                        className="page-subtitle-overview small"
                        aria-label="Go to Top Losers ETFs page"
                      >
                        Top Losers &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={etfsLosers}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      minWidth: "450px",
                      marginRight: "14px",
                      marginLeft: "14px"
                    }}
                  >
                    <div>
                      <Link
                        to="/markets/etfs/top-performing"
                        className="page-subtitle-overview small"
                        aria-label="Go to Top Performing ETFs page"
                      >
                        Top Performing &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      {" "}
                      {/* Permite scroll orizontal pe container */}
                      <Table
                        data={etfsTopPerforming}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }} // Asigură-te că tabelul se ajustează corect
                      />
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{ minWidth: "450px", marginRight: "14px" }}
                  >
                    <div>
                      <Link
                        to="/markets/etfs/trending-now"
                        className="page-subtitle-overview small"
                        aria-label="Go to Trending Now ETFs page"
                      >
                        Trending Now &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={etfsTrending}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3" style={{ minWidth: "450px" }}>
                    <div>
                      <Link
                        to="/markets/etfs/best-historical-performance"
                        className="page-subtitle-overview small"
                        aria-label="Go to Best Historical Performance ETFs page"
                      >
                        Best Historical Performance &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={etfsBestHPerformance}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />

          {/* --------------------- */}
          {/* Mutual Funds Section  */}
          {/* --------------------- */}

          <div>
            <h2 style={{ marginBottom: "15px", fontSize: "24px" }}>
              Mutual Funds
            </h2>

            <div className="row">
              <div className="col-12">
                {" "}
                {/* Folosește col-12 pentru a ocupa întreaga lățime */}
                <div className="d-flex overflow-auto hide-scrollbar">
                  {" "}
                  {/* Flexbox pentru a permite derularea orizontală */}
                  <div
                    className="col-md-3"
                    style={{ minWidth: "450px", marginRight: "14px" }}
                  >
                    <div>
                      <Link
                        to="/markets/mutual-funds/top-gainers"
                        className="page-subtitle-overview small"
                        aria-label="Go to Top Gainers Mutual Funds page"
                      >
                        Top Gainers &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      {" "}
                      {/* Permite scroll orizontal pe container */}
                      <Table
                        data={mutualFundsGainers}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }} // Asigură-te că tabelul se ajustează corect
                      />
                    </div>
                  </div>
                  <div className="col-md-3" style={{ minWidth: "450px" }}>
                    <div>
                      <Link
                        to="/markets/mutual-funds/top-losers"
                        className="page-subtitle-overview small"
                        aria-label="Go to Top Losers Mutual Funds page"
                      >
                        Top Losers &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={mutualFundsLosers}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div
                    className="col-md-3"
                    style={{
                      minWidth: "450px",
                      marginRight: "14px",
                      marginLeft: "14px"
                    }}
                  >
                    <div>
                      <Link
                        to="/markets/mutual-funds/top-performing"
                        className="page-subtitle-overview small"
                        aria-label="Go to Top Performing Mutual Funds page"
                      >
                        Top Performing &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      {" "}
                      {/* Permite scroll orizontal pe container */}
                      <Table
                        data={mutualFundsTopPerforming}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }} // Asigură-te că tabelul se ajustează corect
                      />
                    </div>
                  </div>
                  <div className="col-md-3" style={{ minWidth: "450px" }}>
                    <div>
                      <Link
                        to="/markets/mutual-funds/best-historical-performance"
                        className="page-subtitle-overview small"
                        aria-label="Go to Best Historical Performance Mutual Funds page"
                      >
                        Best Historical Performance &rarr;
                      </Link>
                    </div>
                    <div style={{ overflowX: "hidden" }}>
                      <Table
                        data={mutualFundsBestHistoricalPerformance}
                        columns={["Symbol", "Name", "Price", "Change %"]}
                        formatTypeForNumbers={"normal"}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MarketOverview;
