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
              <th key={index}>{col}</th> // Afișăm numele coloanelor
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                // Obținem valorile corespunzătoare coloanelor
                let value = "";
                switch (col) {
                  case "Symbol":
                    value = item.symbol || "-";
                    break;
                  case "Name":
                    value = item.shortName || "-";
                    break;
                  case "Price":
                    value = item.regularMarketPrice || "-";
                    break;
                  case "Change":
                    value = item.regularMarketChange || "-";
                    break;
                  case "Change%":
                    value = item.regularMarketChangePercent
                      ? `${item.regularMarketChangePercent.toFixed(2)}%`
                      : "-";
                    break;
                  case "Volume":
                    value = item.regularMarketVolume || "0";
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
                  <td key={colIndex} className={className}>
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
