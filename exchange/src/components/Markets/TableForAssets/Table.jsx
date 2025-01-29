/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import "./Table.css";
import DynamicChart from "../DimamicChart/DynamicChart";
import { Link, useLocation } from "react-router-dom";

// Funcție pentru a clampa valorile între un minim și un maxim
const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

// Funcție pentru a formata numerele

const formatNumber = (num, formatType = "normal") => {
  const options = {
    minimumFractionDigits: formatType === "long" ? 4 : 2,
    maximumFractionDigits: formatType === "long" ? 4 : 2
  };

  return new Intl.NumberFormat("en-US", options).format(num);
};

// Funcție pentru a reda coloanele de tip range
const renderRangeColumn = (
  range,
  currentValue,
  rowIndex,
  colIndex,
  columnKey
) => {
  if (range && currentValue) {
    const [minRange, maxRange] = range
      .split("-")
      .map((val) => parseFloat(val.trim()));

    currentValue = parseFloat(currentValue);

    // Determinarea valorilor pentru slider
    const sliderValue = clampValue(currentValue, minRange, maxRange);

    return (
      <td key={`${columnKey}-${rowIndex}-${colIndex}`}>
        <div className="range-container">
          <input
            type="range"
            className="form-range"
            id={`${columnKey}-${rowIndex}`}
            min={minRange}
            max={maxRange}
            value={sliderValue}
            readOnly // Face sliderul să fie doar informativ
            step={0.01} // Setează pasul pentru a permite zecimale
          />
          <div className="range-labels">
            <span>{formatNumber(minRange)}</span>
            <span>{formatNumber(maxRange)}</span>
          </div>
        </div>
      </td>
    );
  } else {
    return <td key={`${columnKey}-${rowIndex}-${colIndex}`}>-</td>;
  }
};

// Componenta principală Table
const Table = ({ data, columns, formatTypeForNumbers }) => {
  const location = useLocation();
  let formatType = "normal"; // Valoare implicită

  // Verifică ruta curentă pentru a putea asigna tipul de formatare a numerelor potrivit.
  if (
    location.pathname.includes("/markets/bonds") ||
    location.pathname.includes("/markets/currencies")
  ) {
    formatType = "long"; // Setează la "long" dacă ruta se potrivește
  }

  console.log(formatType);

  return (
    <div className="table-container">
      <table className="custom-table">
        {/* Header */}
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={
                  col === "Symbol"
                    ? "symbol-column"
                    : col === "Name"
                    ? "name-column"
                    : ""
                }
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                let value = "";

                switch (col) {
                  case "Symbol":
                    value = (
                      <Link
                        to={`/quote/${item.symbol}`}
                        className="symbol-link"
                        state={{ item, formatType }}
                      >
                        {item.symbol && item.symbol.length > 9
                          ? `${item.symbol.slice(0, 9)}...`
                          : item.symbol || "-"}
                      </Link>
                    );
                    break;

                  case "Name":
                    value = (
                      <p title={item.shortName || ""}>
                        {item.shortName || "-"}
                      </p>
                    );
                    break;

                  case "Graph": // Cazul pentru coloana graficului
                    return (
                      <td key={colIndex}>
                        <DynamicChart
                          symbol={item.symbol}
                          change={item.regularMarketChange}
                        />{" "}
                      </td>
                    );

                  case "Price":
                    value = item.regularMarketPrice
                      ? formatNumber(
                          item.regularMarketPrice,
                          formatTypeForNumbers
                        )
                      : "-";
                    break;

                  case "Change":
                    value = item.regularMarketChange
                      ? item.regularMarketChange > 0
                        ? `+${formatNumber(
                            item.regularMarketChange,
                            formatTypeForNumbers
                          )}`
                        : formatNumber(
                            item.regularMarketChange,
                            formatTypeForNumbers
                          )
                      : "0.00";
                    break;

                  case "Change %":
                    const decimalPlaces =
                      formatTypeForNumbers === "long" ? 4 : 2;
                    value = item.regularMarketChangePercent
                      ? item.regularMarketChangePercent > 0
                        ? `+${item.regularMarketChangePercent.toFixed(
                            decimalPlaces
                          )}%`
                        : `${item.regularMarketChangePercent.toFixed(
                            decimalPlaces
                          )}%`
                      : "0.00%";
                    break;

                  case "Volume":
                    value = item.regularMarketVolume
                      ? item.regularMarketVolume >= 1_000_000_000
                        ? `${(item.regularMarketVolume / 1_000_000_000).toFixed(
                            3
                          )}B`
                        : item.regularMarketVolume >= 1_000_000
                        ? `${(item.regularMarketVolume / 1_000_000).toFixed(
                            3
                          )}M`
                        : item.regularMarketVolume.toLocaleString()
                      : "0";
                    break;

                  case "Day Range":
                    return renderRangeColumn(
                      item.regularMarketDayRange,
                      item.regularMarketPrice,
                      rowIndex,
                      colIndex,
                      "dayRange"
                    );

                  case "52 Wk Range":
                    return renderRangeColumn(
                      item.fiftyTwoWeekRange,
                      item.regularMarketPrice,
                      rowIndex,
                      colIndex,
                      "52WkRange"
                    );

                  case "Open Interest":
                    value = item.openInterest
                      ? item.openInterest >= 1_000_000_000
                        ? `${(item.openInterest / 1_000_000_000).toFixed(3)}B`
                        : item.openInterest >= 1_000_000
                        ? `${(item.openInterest / 1_000_000).toFixed(3)}M`
                        : item.openInterest.toLocaleString()
                      : "0";
                    break;

                  case "Market Time":
                    const date = new Date(item.regularMarketTime * 1000); // Convertim din secunde în milisecunde
                    const options = {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true, // Setăm la true pentru format de 12h
                      timeZone: "America/New_York" // Setăm fusul orar pe EST
                    };
                    value = date.toLocaleString("en-US", options) + " EST"; // Adăugăm "EST" la sfârșit
                    break;

                  default:
                    value = "-";
                }

                // Aplicăm stiluri condiționate pentru schimbări pozitive/negative
                const className =
                  (col === "Change" || col === "Change %") && value
                    ? String(value).includes("-")
                      ? "negative"
                      : "positive"
                    : "";

                return (
                  <td
                    key={colIndex}
                    className={`${className} ${
                      col === "Symbol"
                        ? "symbol-column"
                        : col === "Name"
                        ? "name-column"
                        : ""
                    }`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
