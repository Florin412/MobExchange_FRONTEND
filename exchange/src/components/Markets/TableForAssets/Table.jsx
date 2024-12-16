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
              {columns.map((col, colIndex) => {
                let value = "";
                switch (col) {
                  case "Symbol":
                    value = (
                      <a
                        href={`/details/${item.symbol}`}
                        className="symbol-link"
                      >
                        {item.symbol || "-"}
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
                          )}B` // Format pentru miliarde
                        : item.regularMarketVolume >= 1_000_000
                        ? `${(item.regularMarketVolume / 1_000_000).toFixed(
                            3
                          )}M` // Format pentru milioane
                        : item.regularMarketVolume.toLocaleString() // În cazul în care valoarea este mai mică de 1 milion
                      : "0";
                    break;

                  case "Day Range":
                    value = item.regularMarketDayRange || "-";
                    break;
                  case "52 Wk Range":
                    value = item.fiftyTwoWeekRange || "-";
                    break;
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
