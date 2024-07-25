/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Footer from "../footer/Footer";
import "./Home.css";
import axios from "axios";
import apiUrl from "../../assets/api_url";

const Home = ({ setRoute, setIsSignedIn, signOut }) => {
  const [exchangeRatesState, setExchangeRatesState] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [allCurrenciesAvailable, setAllCurrenciesAvailable] = useState([]);
  const [tableInfo, setTableInfo] = useState([]);
  const [numberToConvert, setNumberToConvert] = useState("");
  const [currencyFinal, setCurrencyFinal] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("");
  const [clickAddCurrency, setClickAddCurrency] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState(allCurrenciesAvailable);
  const [liveExchange, setLiveExchange] = useState();
  const [tableInfoState, setTableInfoState] = useState(tableInfo);

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

    console.log(url);

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}` // Add Authorization header with Bearer token
        }
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
            rate
          ])
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

  let titlesTables = ["#", "CurrName", "Price"];

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
        [id, currency, price]
      ]);
      setClickAddCurrency(false);
    } else {
      alert("You have that selected the currency in the table");
      setClickAddCurrency(false);
    }
  };

  return (
    <>
      <h1 className="mainHeader">Currency Converter</h1>
      <div className="mainDiv">
        <div>
          <div>
            <label htmlFor="fromCurr">From</label>
          </div>
          <div className="divSelect">
            <select
              id="fromCurr"
              className="labelFromSelect"
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

          <input
            type="text"
            id="fromInput"
            ref={fromCurr}
            onChange={handleChange}
            value={numberToConvert}
          />
        </div>
        <div>
          <button className="convertorButton" onClick={convertHandler}>
            Convertor
          </button>
        </div>
        <div>
          <div>
            <label htmlFor="toCurr">To</label>
          </div>
          <div className="divSelect">
            <select
              id="toCurr"
              className="labelFromSelect"
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

          <input type="text" value={currencyTo} readOnly />
        </div>
      </div>

      <div className="graph">
        <img
          src="https://static.vecteezy.com/system/resources/previews/008/530/537/non_2x/currency-exchange-graph-transparent-png.png"
          className="graph_img"
        ></img>
      </div>

      <div className="second-header-div">
        <h2 className="second-header">Live Exchange Value ${currencyFrom}</h2>
      </div>

      <div className="mainDiv tableDiv">
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              {titlesTables.map((title) => (
                <th scope="col" key={title}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableInfoState.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  <td key={index}>
                    {cell}
                    {console.log(tableInfoState)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="div_table_button">
          <button className="button_table" onClick={handleClickAddCurrency}>
            <span className="button_span">+</span>
          </button>
          {clickAddCurrency ? (
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleLiveExchange}
              defaultValue={""}
            >
              <option disabled value={""}>
                Open this select menu
              </option>
              {availableCurrencies.map((curr, index) => (
                <option value={curr} key={index}>
                  {curr}
                </option>
              ))}
            </select>
          ) : (
            <p className="table_p">Add Currency</p>
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
