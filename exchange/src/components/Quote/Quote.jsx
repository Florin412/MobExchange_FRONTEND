// Quote.jsx
import { useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import QuoteChart from "./QuoteChart/QuoteChart";
import "./Quote.css";

const Quote = () => {
  const location = useLocation();
  const item = location.state.item;

  // Funcție pentru formatarea numerelor în stilul US
  const formatNumber = (num) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div>
      <div className="quote-container">
        <div className="market-container">
          <div className="header">
            <span className="exchange">
              {item.fullExchangeName} - Delayed Quote • {item.currency}
            </span>
            <h1 className="symbol-title">
              {item.shortName} ({item.symbol})
            </h1>
            <hr />
          </div>

          <div className="asset-details">
            <div className="asset-price">
              <div className="price-change">
                <span className="price">
                  {formatNumber(item.regularMarketPrice)}
                </span>
                <span
                  className={`change ${
                    item.regularMarketChange >= 0 ? "positive" : "negative"
                  }`}
                >
                  {item.regularMarketChange >= 0
                    ? "+" + formatNumber(item.regularMarketChange)
                    : formatNumber(item.regularMarketChange)}{" "}
                  {/* Adaugă "+" fără spațiu */}(
                  {item.regularMarketChangePercent >= 0
                    ? "+" + formatNumber(item.regularMarketChangePercent)
                    : formatNumber(item.regularMarketChangePercent)}
                  %{/* Elimină spațiul înainte de paranteză */})
                </span>
              </div>
              <div className="close-time">
                At close:{" "}
                {new Date(item.regularMarketTime * 1000).toLocaleString(
                  "ro-RO",
                  {
                    timeZone: item.exchangeTimezoneName,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false // Asigură-te că ora este în format 24 de ore
                  }
                )}
              </div>
            </div>

            {/* Graficul plasat sub "At close" */}
            <QuoteChart
              symbol={item.symbol}
              change={item.regularMarketChange}
            />

            <div className="asset-stats">
              <div className="stat">
                <span className="label">Previous Close:</span>
                <span className="value">
                  {formatNumber(item.regularMarketPreviousClose)}
                </span>
              </div>
              <div className="stat">
                <span className="label">Volume:</span>
                <span className="value">
                  {formatNumber(item.regularMarketVolume)}
                </span>
              </div>
              <div className="stat">
                <span className="label">52 Week Range:</span>
                <span className="value">
                  {formatNumber(item.fiftyTwoWeekLow)} -{" "}
                  {formatNumber(item.fiftyTwoWeekHigh)}
                </span>
              </div>
              <div className="stat">
                <span className="label">Open:</span>
                <span className="value">
                  {formatNumber(item.regularMarketOpen)}
                </span>
              </div>

              <div className="stat">
                <span className="label">Day&rsquo;s Range:</span>
                <span className="value">
                  {formatNumber(item.regularMarketDayLow)} -{" "}
                  {formatNumber(item.regularMarketDayHigh)}
                </span>
              </div>

              <div className="stat">
                <span className="label">Avg Volume:</span>
                <span className="value">
                  {formatNumber(item.averageDailyVolume3Month)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quote;
