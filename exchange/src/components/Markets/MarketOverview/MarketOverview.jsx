import Footer from "../../footer/Footer";
import "./MarketOverview.css";
import Table from "../TableForAssets/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { getNewAccessToken } from "../../Auth/auth_functions";
import "../Options/Options.css";
import { Link } from "react-router-dom";
import TrendingNowCards from "./TrendingNowCards/TrendingNowCards";

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
  const [activeButton, setActiveButton] = useState("Most Active"); // Butonul activ

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
        console.log(logMessage);
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
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsMostActive(response.data.finance.result[0].quotes.slice(0, 5));
        } else if (region === "etfs-gainers") {
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsGainers(response.data.finance.result[0].quotes.slice(0, 5));
        } else if (region === "etfs-losers") {
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsLosers(response.data.finance.result[0].quotes.slice(0, 5));
        } else if (region === "etfs-top-performing") {
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsTopPerforming(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "etfs-trending") {
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsTrending(response.data.finance.result[0].quotes.slice(0, 5));
        } else if (region === "etfs-best-historical-performance") {
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setEtfsBestHPerformance(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "mutual-funds-gainers") {
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setMutualFundsGainers(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "mutual-funds-losers") {
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setMutualFundsLosers(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "mutual-funds-top-performing") {
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
          setMutualFundsTopPerforming(
            response.data.finance.result[0].quotes.slice(0, 5)
          );
        } else if (region === "mutual-funds-best-historical-performance") {
          console.log(response.data.finance.result[0].quotes.slice(0, 5));
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

  const fetchMarketData = async (url) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response.data.finance.result[0].quotes);
        setData(response.data.finance.result[0].quotes.slice(0, 6));
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
          console.log(response.data.finance.result[0].quotes.slice(0, 8));
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
    fetchMarketData("http://localhost:8080/markets/stocks/most-active");
  }, []);

  return (
    <div>
      <div className="quote-container">
        <div className="market-container">
          <h1 className="page-title-overview">Markets Overview</h1>

          {/* --------------------- */}
          {/* World Indices Section */}
          {/* --------------------- */}
          <div>
            <div style={{ padding: "15px 0" }}>
              <Link
                to="/markets/world-indices"
                className="page-subtitle-overview"
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
              >
                Stocks &rarr;
              </Link>
            </div>

            <div>
              <TrendingNowCards></TrendingNowCards>

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
                      onClick={() => handleButtonClick("Most Active")}
                    >
                      Most Active
                    </button>
                    <button
                      className={`option-button ${
                        activeButton === "Trending Now" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("Trending Now")}
                    >
                      Trending Now
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
                        activeButton === "52 Week Gainers" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("52 Week Gainers")}
                    >
                      52 Week Gainers
                    </button>
                    <button
                      className={`option-button ${
                        activeButton === "52 Week Losers" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("52 Week Losers")}
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
