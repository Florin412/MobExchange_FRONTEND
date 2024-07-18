import { useRef, useState } from "react";
import Footer from "../footer/Footer";
import "./Home.css";

function Home() {
  //default pentru fiecare moneda
  // verificare daca moneda este mai mare sau mai mica decat cea cu care vrem sa facem convert
  // mai mare /
  // mai mic *

  const exchangeRates = {
    USD: { RON: 4.1, EUR: 0.85, GBP: 0.75, USD: 1 },
    RON: { USD: 0.24, EUR: 0.21, GBP: 0.18, RON: 1 },
    EUR: { USD: 1.18, RON: 4.88, GBP: 0.88, EUR: 1 },
    GBP: { USD: 1.34, RON: 5.56, EUR: 1.14, GBP: 1 },
  };

  const tableInfo = [
    [1, "RON", 1, "+0.075%"],
    [2, "USD", 0.24, "+0.075%"],
    [3, "EUR", 0.21, "-0.055%"],
    [4, "GBP", 0.75, "+0.002%"],
  ];

  const allCurrenciesAvailable = [
    [1, "RON", 1, "+0.075%"],
    [2, "USD", 0.24, "+0.075%"],
    [3, "EUR", 0.21, "-0.055%"],
    [4, "GBP", 0.75, "+0.002%"],
    [5, "TEST", 1.11, "-0.001%"],
  ];

  const availableCurrencies = ["RON", "USD", "EUR", "GBP", "TEST"];

  const titlesTables = ["#", "CurrName", "Price", "Percent"];

  const fromCurr = useRef(null);
  //salut

  const [numberToConvert, setNumberToConvert] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyFinal, setCurrencyFinal] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("");
  const [clickAddCurrency, setClickAddCurrency] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState(allCurrenciesAvailable);
  const [liveExchange, setLiveExchange] = useState();
  const [tableInfoState, setTableInfoState] = useState(tableInfo);

  const handleChange = (e) => {
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

  const convertHandler = () => {
    try {
      console.log(
        `Converting from ${currencyFrom} to ${currencyFinal} with amount ${numberToConvert}`
      );
      const rate = exchangeRates[currencyFrom]?.[currencyFinal];
      console.log(rate + " rate");
      if (rate === undefined) {
        throw new Error("Conversion rate not found");
      }
      const convertedValue = (Number(numberToConvert) * rate).toFixed(2);
      setCurrencyTo(convertedValue);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCurrencyFromChange = (e) => {
    setCurrencyFrom(e.target.value);
  };

  const handleCurrencyToChange = (e) => {
    setCurrencyFinal(e.target.value);
    console.log(e.target.value);
  };

  const handleClickAddCurrency = (e) => {
    e.preventDefault();
    setClickAddCurrency(true);
    console.log(clickAddCurrency + " add curency");
  };

  const handleLiveExchange = (e) => {
    const value = e.target.value;
    setLiveExchange(value);
    const [filteredInfo] = allCurrencies.filter((item) => item[1] === value);
    console.log(filteredInfo);

    const isAlreadyListed = tableInfoState.some((item) => item[1] === value);
    console.log(isAlreadyListed);

    if (isAlreadyListed === false) {
      const [idTemp, currency, price, percent] = filteredInfo;
      console.log(setAllCurrencies, liveExchange, idTemp);
      let id = tableInfoState.length + 1;
      tableInfo.push[(currency, price, percent)];
      setTableInfoState((prevTableInfo) => [
        ...prevTableInfo,
        [id, currency, price, percent],
      ]);
    } else {
      alert("You have that selected the currency in the table");
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
              <option value="RON" id="fromCurr0">
                RON
              </option>
              <option value="USD" id="fromCurr1">
                $ - US Dollar
              </option>
              <option value="EUR" id="fromCurr2">
                € - Euro
              </option>
              <option value="GBP" id="fromCurr3">
                £ - British Pound
              </option>
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
              <option value="RON" id="toCurr0">
                RON
              </option>
              <option value="USD" id="toCurr1">
                $ - US Dollar
              </option>
              <option value="EUR" id="toCurr2">
                € - Euro
              </option>
              <option value="GBP" id="toCurr3">
                £ - British Pound
              </option>
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
        <h2 className="second-header">Live Exchange Value</h2>
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
