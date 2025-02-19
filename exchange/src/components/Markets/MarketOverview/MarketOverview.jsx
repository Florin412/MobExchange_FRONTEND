import Footer from "../../footer/Footer";
import "./MarketOverview.css";
import Table from "../TableForAssets/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getNewAccessToken } from "../../Auth/auth_functions";
import "../Options/Options.css";
import { Link } from "react-router-dom";

const MarketOverview = () => {
  const [usWorldIndices, setUSWorldIndices] = useState([]);
  const [europaWorldIndices, setEuropaWorldIndices] = useState([]);
  const [asiaWorldIndices, setAsiaWorldIndices] = useState([]);
  const [commoditiesOverview, setCommoditiesOverview] = useState([]);
  const [currenciesOverview, setCurrenciesOverview] = useState([]);
  const [bondsOverview, setBondsOverview] = useState([]);

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
        console.log(response.data.quoteResponse.result);

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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MarketOverview;
