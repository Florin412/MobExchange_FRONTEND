import { useRef, useState } from "react";
import Footer from "../footer/Footer";
import "./Home.css";

function Home() {
  const fromCurr = useRef(null);

  const [numberToConvert, setNumberToConvert] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("$");
  const [currencyTo, setCurrencyTo] = useState("");

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
      console.log(numberToConvert);
      // Logic to perform the conversion can go here
      // For now, we are just resetting the values

      setCurrencyTo(numberToConvert);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCurrencyFromChange = (e) => {
    setCurrencyFrom(e.target.value);
  };

  const handleCurrencyToChange = (e) => {
    setCurrencyTo(e.target.value);
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
              value={currencyTo}
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
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col" className="colorTh">
                <span className="spanTh">#</span>
              </th>
              <th scope="col" className="colorTh">
                <span className="spanTh">CurrName</span>
              </th>
              <th scope="col" className="colorTh">
                <span className="spanTh">Price</span>
              </th>
              <th scope="col" className="colorTh">
                <span className="spanTh">Percent</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="colorTh">
                1
              </th>
              <td className="colorTh">Mark</td>
              <td className="colorTh">Otto</td>
              <td className="colorTh">
                <span className="percent percentGreen">+0.075%</span>
              </td>
            </tr>
            <tr>
              <th scope="row" className="colorTh">
                2
              </th>
              <td className="colorTh">Jacob</td>
              <td className="colorTh">Thornton</td>
              <td className="colorTh">
                <span className="percent percentRed">-0.055%</span>
              </td>
            </tr>
            <tr>
              <th scope="row" className="colorTh">
                3
              </th>
              <td className="colorTh">fsafa</td>
              <td className="colorTh">the Bird</td>
              <td className="colorTh">
                <span className="percent percentGreen">+0.002%</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="div_table_button">
          <button className="button_table">
            <span className="button_span">+</span>
          </button>
          <p className="table_p">Add Currency</p>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
