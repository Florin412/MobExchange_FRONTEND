import { useEffect, useRef, useState } from "react";
import Footer from "../footer/Footer";
import "./Home.css";
import axios from "axios";
import Graph from "../Graph/Graph";

function Home() {
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
  let date = new Date();
  date.setMonth(date.getMonth() - 6);
  let dateMinusSix = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getDate()}`;

  useEffect(() => {
    const fetchExchangeApi = async () => {
      // const url = `http://192.168.170.144:8080/exchange-rates/latest/${currencyFrom}`;
      const url = `http://192.168.170.158:8080/exchange-rates/latest/${currencyFrom}`;

      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const rates = response.data.rates;
          const baseCurrency = response.data.base;

          setExchangeRatesState(response.data.rates);

          setAvailableCurrencies([baseCurrency, ...Object.keys(rates)]);

          const currencies = [
            [0, baseCurrency, 1], // Moneda de bază cu rată 1
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
    fetchExchangeApi();
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
        [id, currency, price],
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
        <Graph
          baseCurrency={currencyFrom}
          startDate={dateMinusSix}
          targetCurrency={currencyFinal}
        />
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
                  <td key={index}>{cell}</td>
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
}

export default Home;
