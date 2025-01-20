// Quote.jsx
import { useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import QuoteChart from "./QuoteChart/QuoteChart";
import "./Quote.css";

const Quote = () => {
  const location = useLocation();

  // item contine informatii generale despre un asset, NU contine date istorice !!
  // item contine date de la World Indices component, acolo se face un request iar datele sunt pasate pana aici.
  // asta sincronizeaza datele in aplicatie, incat sa fie peste tot aceleasi date.
  const item = location.state.item;

  console.log("Date generale snp: ", item);

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
              {item.fullExchangeName} - {item.quoteSourceName} • {item.currency}
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
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // Asigură-te că ora este în format 24 de ore
                  timeZone: item.exchangeTimezoneName
                }).format(new Date(item.regularMarketTime * 1000))}
              </div>
            </div>

            {/* Graficul plasat sub "At close" */}
            <QuoteChart
              symbol={item.symbol}
              change={item.regularMarketChange}
            />

            {/* MAI JOS E ASSET-STATS PENTRU WORLD INDICES */}
            {(item.quoteType === "INDEX" || item.quoteType === "EQUITY") && (
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
            )}

            {/* MAI JOS E ASSET-STATS PENTRU Futures */}
            {(item.quoteType === "FUTURE" ||
              item.quoteType === "ALTSYMBOL") && (
              <div className="asset-stats">
                <div className="stat">
                  <span className="label">Pre. Settlement:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketPreviousClose)}{" "}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Open:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketOpen)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Last Price:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketPrice)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Volume:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketVolume)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Settlement Date:</span>
                  <span className="value">
                    {new Date(item.expireIsoDate).toISOString().split("T")[0]}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Bid:</span>
                  <span className="value">{formatNumber(item.bid)}</span>
                </div>
                <div className="stat">
                  <span className="label">Day&rsquo;s Range:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketDayLow)} -{" "}
                    {formatNumber(item.regularMarketDayHigh)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Ask:</span>
                  <span className="value">{formatNumber(item.ask)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quote;
