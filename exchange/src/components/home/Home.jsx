import { useEffect, useRef, useState } from "react";
import Footer from "../footer/Footer";
import "./Home.css";
import axios from "axios";

function Home() {
  const [exchangeRatesState, setExchangeRatesState] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [allCurrenciesAvailable, setAllCurrenciesAvailable] = useState([]);  
  const [tableInfo, setTableInfo] = useState([]);


  useEffect(() => {
    const fetchExchangeApi = async () => {
      const api_key = "ddf8050f97a99073d99d4dcf";
      const url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/${currencyFrom}`;
      try {
        const response = await axios.get(url);
        if (response.data.result === "success") {
          setExchangeRatesState(response.data.conversion_rates);
          setAvailableCurrencies(Object.keys(response.data.conversion_rates));

          const currencies = Object.entries(response.data.conversion_rates).map(
            ([currency, rate], index) => [index + 1, currency, rate]
          );
          setAllCurrenciesAvailable(currencies);

          const filteredCurrencies = currencies.filter(
            ([_, currency]) => ["RON", "EUR", "USD", "GBP"].includes(currency)
          ).map(([_, currency, rate], index) => [index + 1, currency, rate]);

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



  // const exchangeRates = {
  //   USD: { RON: 4.1, EUR: 0.85, GBP: 0.75, USD: 1 },
  //   RON: { USD: 0.24, EUR: 0.21, GBP: 0.18, RON: 1 },
  //   EUR: { USD: 1.18, RON: 4.88, GBP: 0.88, EUR: 1 },
  //   GBP: { USD: 1.34, RON: 5.56, EUR: 1.14, GBP: 1 },
  // };

  // const tableInfo = [
  //   [1, "RON", 1, "+0.075%"],
  //   [2, "USD", 0.24, "+0.075%"],
  //   [3, "EUR", 0.21, "-0.055%"],
  //   [4, "GBP", 0.75, "+0.002%"],
  // ];

  // const allCurrenciesAvailable = [
  //   [1, "RON", 1, "+0.075%"],
  //   [2, "USD", 0.24, "+0.075%"],
  //   [3, "EUR", 0.21, "-0.055%"],
  //   [4, "GBP", 0.75, "+0.002%"],
  //   [5, "TEST", 1.11, "-0.001%"],
  // ];

  //let availableCurrencies = ["RON", "USD", "EUR", "GBP", "TEST"];

  let titlesTables = ["#", "CurrName", "Price", "Percent"];

  let fromCurr = useRef(null);



  const [numberToConvert, setNumberToConvert] = useState("");
  const [currencyFinal, setCurrencyFinal] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("");
  const [clickAddCurrency, setClickAddCurrency] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState(allCurrenciesAvailable);
  const [liveExchange, setLiveExchange] = useState();
  const [tableInfoState, setTableInfoState] = useState(tableInfo);

  const availableCurrenciesFunction = () =>{
    console.log('available curr')
  }

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

  //convertHandler with api data
  const convertHandler = () => {
    try {
      console.log(`The conversion is from ${currencyFrom} to ${currencyFinal}`)
     
      let result = Object.keys(exchangeRatesState).map(key => {
        return { currency: key, rate: exchangeRatesState[key] };});

      let exchangeRateTo = result.filter(item => item.currency.toLowerCase() === currencyFinal.toLowerCase())
      console.log(exchangeRateTo)

      if(exchangeRateTo === undefined){
        throw new Error("We dont have that currency status")
      }

      let convertedValue = (Number(numberToConvert) * exchangeRateTo.map((item)=> item.rate)).toFixed(2);
      console.log(convertedValue)
      setCurrencyTo(convertedValue)
     
    } catch (err) {
      console.error(err);
    }
  };



  // converthandler with dummy data
  // const convertHandler = () => {
  //   try {
  //     console.log(exchangeRatesState)
  //     console.log(
  //       `Converting from ${currencyFrom} to ${currencyFinal} with amount ${numberToConvert}`
  //     );
  //     const rate = exchangeRates[currencyFrom]?.[currencyFinal];
  //     console.log(rate + " rate");
  //     if (rate === undefined) {
  //       throw new Error("Conversion rate not found");
  //     }
  //     const convertedValue = (Number(numberToConvert) * rate).toFixed(2);
  //     console.log(convertedValue);
  //     setCurrencyTo(convertedValue);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleCurrencyFromChange = (e) => {
    setCurrencyFrom(e.target.value);
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
   
    setLiveExchange(value);
    const [filteredInfo] = allCurrenciesAvailable.filter((item) => item[1] === value);
    console.log(filteredInfo);

    const isAlreadyListed = tableInfoState.some((item) => item[1] === value);
    console.log(isAlreadyListed);

    if (isAlreadyListed === false) {
      const [idTemp, currency, price, percent] = filteredInfo;
      let id = tableInfoState.length + 1;
      tableInfo.push[(currency, price, percent)];
      setTableInfoState((prevTableInfo) => [
        ...prevTableInfo,
        [id, currency, price, percent],
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
