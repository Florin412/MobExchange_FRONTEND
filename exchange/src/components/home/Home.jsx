/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Footer from "../footer/Footer";
import "./Home.css";
import axios from "axios";
import apiUrl from "../../assets/api_url";
import Graph from "../Graph/Graph";

const Home = ({ setRoute, setIsSignedIn, signOut }) => {
  const [exchangeRatesState, setExchangeRatesState] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [allCurrenciesAvailable, setAllCurrenciesAvailable] = useState([]);
  const [tableInfo, setTableInfo] = useState([]);
  const [numberToConvert, setNumberToConvert] = useState("");
  const [currencyFinal, setCurrencyFinal] = useState("RON");
  const [currencyTo, setCurrencyTo] = useState("");
  const [clickAddCurrency, setClickAddCurrency] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState(allCurrenciesAvailable);
  const [liveExchange, setLiveExchange] = useState();
  const [tableInfoState, setTableInfoState] = useState(tableInfo);
  const [monthButton, setMonthButton] = useState(6);
  const [dateButton, setDateButton] = useState("");
  console.log(dateButton);

  const today = new Date();

  // Extrage anul, luna și ziua
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // getMonth() returnează luna de la 0 la 11
  const day = String(today.getDate()).padStart(2, "0");

  useEffect(() => {
    let date = new Date();
    date.setMonth(date.getMonth() - monthButton);
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setDateButton(formattedDate);
  }, [monthButton]);

  const handleRefreshToken = async () => {
    // Retrieve the refresh token from local storage
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      // Make a POST request to the API to get a new access token by using our refresh token.
      const response = await axios.post(`${apiUrl}/auth/getNewAccessToken`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      });

      // If the request was successful, extract the new access token
      if (response.status === 200 || response.status === 201) {
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // You can resume the previously failed request
        await fetchExchangeApi();
      }
    } catch (error) {
      // Handle errors, such as invalid or expired refresh token
      console.error("Refresh token invalid. Please log in again.", error);
      signOut(); // Function that logs out the user
    }
  };

  const fetchExchangeApi = async () => {
    const url = apiUrl + "/exchange-rates/latest/" + `${currencyFrom}`;

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add Authorization header with Bearer token
        },
      });

      if (response.status === 200 || response.status === 201) {
        const rates = response.data.rates;
        const baseCurrency = response.data.base;

        setExchangeRatesState(response.data.rates);

        setAvailableCurrencies([baseCurrency, ...Object.keys(rates)]);

        const currencies = [
          [0, baseCurrency, 1], // Base currency with rate 1
          ...Object.entries(rates).map(([currency, rate], index) => [
            index + 1,
            currency,
            rate,
          ]),
        ];
        setAllCurrenciesAvailable(currencies);

        const filteredCurrencies = currencies
          .filter(([_, currency]) =>
            ["RON", "EUR", "USD", "GBP"].includes(currency)
          )
          .map(([_, currency, rate], index) => [index + 1, currency, rate]);

        setTableInfoState(filteredCurrencies);
      } else if (response.status === 401) {
        // Auth error (token expired)
        await handleRefreshToken();
      } else {
        console.error(
          "Error fetching exchange rates:",
          response.data["error-type"]
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExchangeApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyFrom]);

  let titlesTables = ["#", "Currency Name", "Price"];

  let fromCurr = useRef(null);

  const handleChange = (e) => {
    console.log(
      setTableInfoState,
      setAllCurrencies,
      setTableInfo,
      liveExchange
    );
    const value = e.target.value;
    try {
      if (isNaN(Number(value))) {
        throw new Error("Not a valid number");
      } else {
        setNumberToConvert(value);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //convertHandler with api data
  const convertHandler = () => {
    try {
      console.log(`The conversion is from ${currencyFrom} to ${currencyFinal}`);

      // Convert exchangeRatesState to an array of objects
      let result = Object.keys(exchangeRatesState).map((key) => {
        return { currency: key, rate: exchangeRatesState[key] };
      });
      console.log(result);

      // Find the exchange rate for the final currency
      let exchangeRateTo = result.find(
        (item) => item.currency.toLowerCase() === currencyFinal.toLowerCase()
      );
      console.log(exchangeRateTo);

      if (
        !exchangeRateTo &&
        currencyFrom.toLowerCase() !== currencyFinal.toLowerCase()
      ) {
        throw new Error("We don't have that currency status");
      }

      let convertedValue;
      if (currencyFrom.toLowerCase() === currencyFinal.toLowerCase()) {
        convertedValue = numberToConvert;
      } else {
        convertedValue = (
          Number(numberToConvert) * exchangeRateTo.rate
        ).toFixed(2);
      }

      console.log(convertedValue);
      setCurrencyTo(convertedValue);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCurrencyFromChange = (e) => {
    setCurrencyFrom(e.target.value);
    console.log(e.target.value);
  };

  const handleCurrencyToChange = (e) => {
    setCurrencyFinal(e.target.value);
  };

  const handleClickAddCurrency = (e) => {
    e.preventDefault();
    setClickAddCurrency(true);
    console.log(clickAddCurrency + " add curency");
  };

  const handleLiveExchange = (e) => {
    const value = e.target.value;
    console.log(allCurrenciesAvailable);

    setLiveExchange(value);
    const [filteredInfo] = allCurrenciesAvailable.filter(
      (item) => item[1] === value
    );
    console.log(filteredInfo);

    const isAlreadyListed = tableInfoState.some((item) => item[1] === value);
    console.log(isAlreadyListed);

    if (isAlreadyListed === false) {
      const [idTemp, currency, price, percent] = filteredInfo;
      console.log(idTemp, allCurrencies);
      let id = tableInfoState.length + 1;
      tableInfo.push[(currency, price, percent)];
      setTableInfoState((prevTableInfo) => [
        ...prevTableInfo,
        [id, currency, price],
      ]);
      setClickAddCurrency(false);
    } else {
      alert("You have that selected the currency in the table");
      setClickAddCurrency(false);
    }
  };

  const handleDateFunction = (e) => {
    const value = Number(e.target.value);

    if ([1, 3, 6, 12].includes(value)) {
      setMonthButton(value);
      console.log(true);
    }

    console.log(value);
  };

  return (
    <>
      <div className="container my-5">
        {/* Page Header */}
        <div className="container my-5 d-flex flex-column align-items-center justify-content-center">
          <h1
            style={{
              marginTop: "50px",
              fontSize: "4.5rem",
              color: "#FFD824", // Text color
              textShadow:
                "0 1px 3px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1), 0 8px 12px rgba(0,0,0,0.1)", // Multi-layered shadow for a sophisticated effect
              fontWeight: "bold",
              position: "relative",
              display: "inline-block",
              textAlign: "center",
              zIndex: "1", // Ensure the text is on top
            }}
          >
            Currency Converter
          </h1>
        </div>

        {/* Introductory Text */}
        <div className="text-center mb-5">
          <p
            style={{
              fontSize: "2.1rem",
              margin: "0 auto",
              maxWidth: "90%",
              marginTop: "50px",
              textAlign: "justify",
              textAlignLast: "left",
            }}
          >
            Welcome to the Currency Converter tool. Easily convert between
            various currencies with real-time exchange rates. Select the
            currencies you wish to convert from and to, input the amount, and
            get instant results. Our tool provides accurate conversions to help
            you manage your finances more efficiently.
          </p>
        </div>

        {/* Conversion Form */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div
              className="card shadow-lg p-4"
              style={{
                backgroundColor: "transparent",
                border: "2px solid #FFD824",
                borderRadius: "15px",
                marginTop: "40px",
              }}
            >
              <div className="card-body">
                <div className="form-group mb-5">
                  <label
                    htmlFor="fromCurr"
                    className="form-label fs-1"
                    style={{
                      color: "#FFD824",
                      marginTop: "20px",
                      marginLeft: "30px",
                    }}
                  >
                    From Currency
                  </label>
                  <select
                    id="fromCurr"
                    className="form-select form-select-lg"
                    style={{
                      fontSize: "2rem",
                      borderRadius: "25px",
                      borderColor: "#FFD824",
                      backgroundColor: "#FFF9E5",
                      padding: "0.75rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                    value={currencyFrom}
                    onChange={handleCurrencyFromChange}
                  >
                    {availableCurrencies.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-5">
                  <label
                    htmlFor="fromInput"
                    className="form-label fs-1"
                    style={{ color: "#FFD824", marginLeft: "30px" }}
                  >
                    Amount to Convert
                  </label>
                  <input
                    type="text"
                    id="fromInput"
                    className="form-control form-control-lg"
                    style={{ fontSize: "2rem", borderRadius: "25px" }}
                    ref={fromCurr}
                    onChange={handleChange}
                    value={numberToConvert}
                    placeholder="0"
                  />
                </div>
                <div className="form-group mb-5">
                  <label
                    htmlFor="toCurr"
                    className="form-label fs-1"
                    style={{ color: "#FFD824", marginLeft: "30px" }}
                  >
                    To Currency
                  </label>
                  <select
                    id="toCurr"
                    className="form-select form-select-lg"
                    style={{
                      fontSize: "2rem",
                      borderRadius: "25px",
                      borderColor: "#FFD824",
                      backgroundColor: "#FFF9E5",
                      padding: "0.75rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                    value={currencyFinal}
                    onChange={handleCurrencyToChange}
                  >
                    {availableCurrencies.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-5">
                  <label
                    htmlFor="toInput"
                    className="form-label fs-1"
                    style={{ color: "#FFD824", marginLeft: "30px" }}
                  >
                    Converted Amount
                  </label>
                  <input
                    type="text"
                    id="toInput"
                    className="form-control form-control-lg"
                    style={{ fontSize: "2rem", borderRadius: "25px" }}
                    value={currencyTo}
                    readOnly
                    placeholder="0"
                  />
                </div>
                <div className="text-center mb-5">
                  <button
                    className="btn btn-warning rounded-pill shadow-lg"
                    style={{
                      padding: "12px 40px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    onClick={convertHandler}
                  >
                    Convert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="graph graph_display">
          <h1>
            Acest graph contine datele din {dateButton} pana in prezent {year}-
            {month}-{day}
          </h1>
          <div className="flexButtons">
            <button value={1} onClick={handleDateFunction}>
              1 Luna
            </button>
            <button value={3} onClick={handleDateFunction}>
              3 Luni
            </button>
            <button value={6} onClick={handleDateFunction}>
              6 Luni
            </button>
            <button value={12} onClick={handleDateFunction}>
              1 an
            </button>
          </div>
          <Graph
            baseCurrency={currencyFrom}
            startDate={dateButton}
            targetCurrency={currencyFinal}
          />
        </div>

        {/* Table Section */}
        <div className="container my-5">
          <div className="text-center mb-5">
            <h2
              className="text-center mb-5"
              style={{
                marginTop: "50px",
                fontSize: "4.5rem",
                color: "#FFD824", // Text color
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Simple and subtle shadow
                fontWeight: "bold",
                position: "relative",
                display: "inline-block",
                textAlign: "center",
                zIndex: "1", // Ensure the text is on top
              }}
            >
              Live Exchange Rates
            </h2>
            <p
              style={{
                fontSize: "2.1rem",
                margin: "0 auto",
                maxWidth: "90%",
                marginTop: "50px",
                textAlign: "justify",
                textAlignLast: "left",
                marginBottom: "50px",
              }}
            >
              Check the latest exchange rates and compare the values of
              different currencies. The table below provides real-time
              information to help you make informed decisions.
            </p>
          </div>
          <div className="table-responsive mb-5">
            <table className="table table-hover table-bordered">
              <thead className="thead-light">
                <tr>
                  {titlesTables.map((title) => (
                    <th
                      scope="col"
                      key={title}
                      style={{
                        backgroundColor: "#FFD700",
                        color: "#333",
                        fontWeight: "bold",
                        textAlign: "center",
                        borderBottom: "2px solid black",
                        borderRadius: "0.5rem",
                        padding: "1rem",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        transform: "perspective(500px) rotateX(0deg)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "perspective(500px) rotateX(-5deg)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 16px rgba(0, 0, 0, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "perspective(500px) rotateX(0deg)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 8px rgba(0, 0, 0, 0.2)";
                      }}
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableInfoState.map((row, rowIndex) => (
                  <tr
                    key={row[0]}
                    style={{
                      textAlign: "center",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFACD";
                      e.currentTarget.style.color = "black";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "white";
                    }}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{
                          padding: "1rem",
                          borderBottom: "1px solid #EEE",
                          backgroundColor: "transparent",
                          color: "inherit",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Currency Button */}
          <div className="text-center mb-5">
            <button
              className="btn btn-success btn-lg shadow-sm"
              onClick={handleClickAddCurrency}
              style={{
                fontSize: "2rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <span className="font-weight-bold" style={{ fontSize: "2rem" }}>
                +
              </span>
              <span style={{ fontSize: "2rem" }}> Add Currency</span>
            </button>
          </div>

          {/* Conditional Currency Selector */}
          {clickAddCurrency && (
            <div className="text-center mb-5">
              <select
                className="form-select form-select-lg"
                aria-label="Default select example"
                onChange={handleLiveExchange}
                defaultValue=""
                style={{
                  maxWidth: "300px",
                  margin: "auto",
                  fontSize: "2rem",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  borderColor: "#DDD",
                }}
              >
                <option disabled value="">
                  Open this select menu
                </option>
                {availableCurrencies.map((curr, index) => (
                  <option value={curr} key={index}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
