/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import "./Table.css";
import DynamicChart from "../DimamicChart/DynamicChart";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Funcție pentru a clampa valorile între un minim și un maxim
const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

// Funcție pentru a formata numerele

const formatNumber = (num, formatType = "normal") => {
  const options = {
    minimumFractionDigits:
      formatType === "veryLong" ? 8 : formatType === "long" ? 4 : 2,
    maximumFractionDigits:
      formatType === "veryLong" ? 8 : formatType === "long" ? 4 : 2
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
  const navigate = useNavigate();

  let formatType = "normal"; // Valoare implicită

  // Verifică ruta curentă pentru a putea asigna tipul de formatare a numerelor potrivit.
  if (
    location.pathname.includes("/markets/bonds") ||
    location.pathname.includes("/markets/currencies") ||
    location.pathname.includes("/markets/options/most-active")
  ) {
    formatType = "long"; // Setează la "long" dacă ruta se potrivește
  }

  // console.log(formatType);

  const decimalPlaces = 2; // Setează numărul de zecimale la 2

  const formatNumberWithCommas = (num) => {
    const parts = num.toFixed(decimalPlaces).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Adaugă virgule la mii
    return parts.join("."); // Reunește partea întreagă cu partea zecimală
  };

  const handleUnderlyingSymbolClick = async (symbol) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://localhost:8080/markets/options/get-general-data-for-1-asset?symbol=${symbol}`,
        {
          method: "GET",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(
        "Salut varule, uite ca am primit datele generale pentru 1 asset, hai noroc !!"
      );
      console.log(data); // Procesați datele după cum este necesar
      // Navigăm către pagina Quote și trimitem datele prin state
      navigate(`/quote/${symbol}`, {
        state: { item: data.quoteResponse.result[0] }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
                  // case "Symbol":
                  //   value = (
                  //     <Link
                  //       to={`/quote/${item.symbol}`}
                  //       className="symbol-link"
                  //       state={{ item, formatType }}
                  //       title={item.symbol || ""} // Aici adăugăm atributul title
                  //     >
                  //       {item.logoUrl && item.logoUrl !== undefined ? (
                  //         <img
                  //           src={item.logoUrl}
                  //           alt={item.symbol}
                  //           className="logo-image"
                  //           style={{
                  //             marginRight: "5px",
                  //             verticalAlign: "middle"
                  //           }}
                  //         />
                  //       ) : null}
                  //       {item.symbol && item.symbol.length > 7
                  //         ? `${item.symbol.slice(0, 7)}...`
                  //         : item.symbol || "-"}
                  //     </Link>
                  //   );
                  //   break;

                  case "Symbol":
                    const currentPath = window.location.pathname; // Obținem ruta curentă

                    value = (
                      <Link
                        to={`/quote/${item.symbol}`}
                        className="symbol-link"
                        state={{ item, formatType }}
                        title={
                          currentPath === "/markets/overview"
                            ? item.shortName || ""
                            : item.symbol || ""
                        } // Atribuim title în funcție de ruta curentă
                      >
                        {item.logoUrl && item.logoUrl !== undefined ? (
                          <img
                            src={item.logoUrl}
                            alt={item.symbol}
                            className="logo-image"
                            style={{
                              marginRight: "5px",
                              verticalAlign: "middle"
                            }}
                          />
                        ) : null}
                        {currentPath === "/markets/overview"
                          ? item.shortName && item.shortName.length > 10
                            ? `${item.shortName.slice(0, 10)}...` // Afișăm primele 10 caractere + "..."
                            : item.shortName || "-" // Afișăm întregul shortName sau "-"
                          : item.symbol && item.symbol.length > 7
                          ? `${item.symbol.slice(0, 7)}...` // Afișăm simbolul cu truncare
                          : item.symbol ||
                            "-" // Afișăm simbolul sau "-"
                        }
                      </Link>
                    );
                    break;

                  case "Name":
                    value = (
                      <p title={item.shortName || item.longName || ""}>
                        {item.shortName || item.longName || "-"}
                      </p>
                    );
                    break;

                  case "Underlying Symbol":
                    value = (
                      <span
                        className="underlying-symbol-link"
                        onClick={() =>
                          handleUnderlyingSymbolClick(item.underlyingSymbol)
                        } // Apelează funcția la clic
                      >
                        {item.underlyingSymbol
                          ? `${item.underlyingSymbol}`
                          : "-"}
                      </span>
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

                  case "50 Day Average":
                    value = item.fiftyDayAverage
                      ? formatNumber(item.fiftyDayAverage, formatTypeForNumbers)
                      : "-";
                    break;

                  case "200 Day Average":
                    value = item.twoHundredDayAverage
                      ? formatNumber(
                          item.twoHundredDayAverage,
                          formatTypeForNumbers
                        )
                      : "-";
                    break;

                  case "Avg Vol (3M)":
                    value = item.averageDailyVolume3Month
                      ? item.averageDailyVolume3Month >= 1_000_000
                        ? `${(
                            item.averageDailyVolume3Month / 1_000_000
                          ).toFixed(3)}M`
                        : item.averageDailyVolume3Month.toLocaleString()
                      : "0";
                    break;

                  case "Market Cap":
                    value = item.marketCap
                      ? item.marketCap >= 1_000_000_000_000
                        ? `${(item.marketCap / 1_000_000_000_000).toFixed(3)}T`
                        : item.marketCap >= 1_000_000_000
                        ? `${(item.marketCap / 1_000_000_000).toFixed(3)}B`
                        : item.marketCap >= 1_000_000
                        ? `${(item.marketCap / 1_000_000).toFixed(3)}M`
                        : item.marketCap.toLocaleString()
                      : "0";
                    break;

                  case "Volume in Currency (24hr)":
                    value = item.volume24Hr
                      ? item.volume24Hr >= 1_000_000_000_000
                        ? `${(item.volume24Hr / 1_000_000_000_000).toFixed(3)}T`
                        : item.volume24Hr >= 1_000_000_000
                        ? `${(item.volume24Hr / 1_000_000_000).toFixed(3)}B`
                        : item.volume24Hr >= 1_000_000
                        ? `${(item.volume24Hr / 1_000_000).toFixed(3)}M`
                        : item.volume24Hr.toLocaleString()
                      : "0";
                    break;

                  case "Total Volume All Currencies (24hr)":
                    value = item.volumeAllCurrencies
                      ? item.volumeAllCurrencies >= 1_000_000_000_000
                        ? `${(
                            item.volumeAllCurrencies / 1_000_000_000_000
                          ).toFixed(3)}T`
                        : item.volumeAllCurrencies >= 1_000_000_000
                        ? `${(item.volumeAllCurrencies / 1_000_000_000).toFixed(
                            3
                          )}B`
                        : item.volumeAllCurrencies >= 1_000_000
                        ? `${(item.volumeAllCurrencies / 1_000_000).toFixed(
                            3
                          )}M`
                        : item.volumeAllCurrencies.toLocaleString()
                      : "0";
                    break;

                  case "Circulating Supply":
                    value = item.circulatingSupply
                      ? item.circulatingSupply >= 1_000_000_000_000
                        ? `${(
                            item.circulatingSupply / 1_000_000_000_000
                          ).toFixed(3)}T`
                        : item.circulatingSupply >= 1_000_000_000
                        ? `${(item.circulatingSupply / 1_000_000_000).toFixed(
                            3
                          )}B`
                        : item.circulatingSupply >= 1_000_000
                        ? `${(item.circulatingSupply / 1_000_000).toFixed(3)}M`
                        : item.circulatingSupply.toLocaleString()
                      : "0";
                    break;

                  case "P/E Ratio (TTM)":
                    value =
                      item.trailingPE !== undefined
                        ? item.trailingPE.toFixed(2) // Formatează cu 2 zecimale
                        : "-"; // Valoare implicită dacă nu există
                    break;

                  case "52 Wk Change %":
                    value =
                      item.fiftyTwoWeekChangePercent !== undefined
                        ? `${formatNumber(item.fiftyTwoWeekChangePercent)}%` // Apelează funcția pentru a formata procentul
                        : "-"; // Valoare implicită dacă nu există
                    break;

                  case "3 Month Return":
                    value =
                      item.trailingThreeMonthReturns !== undefined
                        ? `${formatNumber(item.trailingThreeMonthReturns)}%` // Apelează funcția pentru a formata procentul
                        : "-"; // Valoare implicită dacă nu există
                    break;

                  case "Bid":
                    value = item.bid ? formatNumber(item.bid) : "0.00";
                    break;

                  case "Ask":
                    value = item.ask ? formatNumber(item.bid) : "-";
                    break;

                  case "Strike":
                    value = item.strike ? formatNumber(item.strike) : "-";
                    break;

                  case "Expiration Date":
                    const expirationDate =
                      item.expireDate || item.expireIsoDate; // Alege proprietatea corectă
                    if (expirationDate) {
                      const date = new Date(expirationDate * 1000); // Convertim din secunde în milisecunde dacă este cazul
                      value = date.toISOString().split("T")[0]; // Formatează data ca YYYY-MM-DD
                    } else {
                      value = "-"; // Fallback în cazul în care nu există o dată
                    }
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
                    value = item.regularMarketChangePercent
                      ? item.regularMarketChangePercent > 0
                        ? `+${formatNumberWithCommas(
                            item.regularMarketChangePercent
                          )}%`
                        : `${formatNumberWithCommas(
                            item.regularMarketChangePercent
                          )}%`
                      : "0.00%";
                    break;

                  case "YTD Return":
                    value = item.ytdReturn
                      ? item.ytdReturn > 0
                        ? `+${formatNumberWithCommas(item.ytdReturn)}%`
                        : `${formatNumberWithCommas(item.ytdReturn)}%`
                      : "--";
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
                  (col === "Change" ||
                    col === "Change %" ||
                    col === "YTD Return") &&
                  value &&
                  value !== "--"
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
