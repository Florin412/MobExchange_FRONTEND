/* eslint-disable react/prop-types */
import "./Table.css";

const Table = ({ data, columns }) => {
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
              {" "}
              {/* Setează key-ul pentru fiecare tr */}
              {columns.map((col, colIndex) => {
                let value = "";
                switch (col) {
                  case "Symbol":
                    value = (
                      <a
                        href={`/details/${item.symbol}`}
                        className="symbol-link"
                      >
                        {item.symbol && item.symbol.length > 9
                          ? `${item.symbol.slice(0, 9)}...`
                          : item.symbol || "-"}
                      </a>
                    );
                    break;

                  case "Name":
                    value = item.shortName || "-";
                    break;
                  case "Price":
                    value = item.regularMarketPrice
                      ? new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }).format(item.regularMarketPrice)
                      : "-";
                    break;
                  case "Change":
                    value = item.regularMarketChange
                      ? item.regularMarketChange > 0
                        ? `+${new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }).format(item.regularMarketChange)}`
                        : new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }).format(item.regularMarketChange)
                      : "-";
                    break;
                  case "Change%":
                    value = item.regularMarketChangePercent
                      ? item.regularMarketChangePercent > 0
                        ? `+${item.regularMarketChangePercent.toFixed(2)}%`
                        : `${item.regularMarketChangePercent.toFixed(2)}%`
                      : "-";
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
                    if (item.regularMarketDayRange && item.regularMarketPrice) {
                      const [minRange, maxRange] = item.regularMarketDayRange
                        .split("-")
                        .map((val) => parseFloat(val.trim()));
                      const currentValue = item.regularMarketPrice;
                      const sliderValue =
                        currentValue >= minRange && currentValue <= maxRange
                          ? currentValue
                          : minRange;

                      return (
                        <td key={`dayRange-${rowIndex}-${colIndex}`}>
                          {" "}
                          {/* Atribuim key pentru <td> */}
                          <div className="range-container" key={colIndex}>
                            <input
                              type="range"
                              className="form-range"
                              id="weekRange"
                              min={minRange}
                              max={maxRange}
                              value={sliderValue}
                              disabled
                            />
                            <div className="range-labels">
                              <span>
                                {new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }).format(minRange)}
                              </span>
                              <span>
                                {new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }).format(maxRange)}
                              </span>
                            </div>
                          </div>
                        </td>
                      );
                    } else {
                      return (
                        <td key={`dayRange-${rowIndex}-${colIndex}`}>-</td>
                      );
                    }

                  case "52 Wk Range":
                    if (item.fiftyTwoWeekRange && item.regularMarketPrice) {
                      const [minRange, maxRange] = item.fiftyTwoWeekRange
                        .split("-")
                        .map((val) => parseFloat(val.trim()));
                      const currentValue = item.regularMarketPrice;
                      const sliderValue =
                        currentValue >= minRange && currentValue <= maxRange
                          ? currentValue
                          : minRange;

                      return (
                        <td key={`52WkRange-${rowIndex}-${colIndex}`}>
                          {" "}
                          {/* Atribuim key pentru <td> */}
                          <div className="range-container" key={colIndex}>
                            <input
                              type="range"
                              className="form-range"
                              id="weekRange"
                              min={minRange}
                              max={maxRange}
                              value={sliderValue}
                              disabled
                            />
                            <div className="range-labels">
                              <span>
                                {new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }).format(minRange)}
                              </span>
                              <span>
                                {new Intl.NumberFormat("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }).format(maxRange)}
                              </span>
                            </div>
                          </div>
                        </td>
                      );
                    } else {
                      return (
                        <td key={`52WkRange-${rowIndex}-${colIndex}`}>-</td>
                      );
                    }

                  default:
                    value = "-";
                }

                // Aplicăm stiluri condiționate pentru schimbări pozitive/negative
                const className =
                  (col === "Change" || col === "Change%") && value
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
