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
  const formatType = location.state.formatType;
  console.log("Salut, aici aici formatul: ", formatType);

  console.log("Date generale asset !!!!!!!!!!!: ", item);

  const formatNumber = (num, formatType = "normal") => {
    const options = {
      minimumFractionDigits: formatType === "long" ? 4 : 2,
      maximumFractionDigits: formatType === "long" ? 4 : 2
    };

    return new Intl.NumberFormat("en-US", options).format(num);
  };

  const formatOpenInterest = (number) => {
    if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + "M"; // Formatează în milioane
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(2) + "k"; // Formatează în mii
    }
    return number.toString(); // Returnează numărul ca string
  };

  const formatMarketCap = (value) => {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)} T`; // Trilioane
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)} B`; // Miliarde
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)} M`; // Milioane
    } else {
      return value.toString(); // Returnează valoarea originală dacă este mai mică de 1 milion
    }
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
              {item.longName} ({item.symbol})
            </h1>
            <hr />
          </div>

          <div className="asset-details">
            <div className="asset-price">
              <div className="price-change">
                <span className="price">
                  {formatNumber(item.regularMarketPrice, formatType)}
                </span>
                <span
                  className={`change ${
                    item.regularMarketChange >= 0 ? "positive" : "negative"
                  }`}
                >
                  {item.regularMarketChange >= 0
                    ? "+" + formatNumber(item.regularMarketChange, formatType)
                    : formatNumber(item.regularMarketChange, formatType)}{" "}
                  {/* Adaugă "+" fără spațiu */}(
                  {item.regularMarketChangePercent >= 0
                    ? "+" +
                      formatNumber(item.regularMarketChangePercent, formatType)
                    : formatNumber(item.regularMarketChangePercent, formatType)}
                  %{/* Elimină spațiul înainte de paranteză */})
                </span>
              </div>
              {/* <div className="close-time">
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
              </div> */}
            </div>

            {/* Graficul plasat sub "At close" */}
            <QuoteChart
              symbol={item.symbol}
              change={item.regularMarketChange}
            />

            {/* MAI JOS E ASSET-STATS PENTRU WORLD INDICES */}
            {(item.quoteType === "INDEX" || item.quoteType === "EQUITY") &&
              item.trailingPE === undefined && (
                <div className="asset-stats">
                  <div className="stat">
                    <span className="label">Previous Close:</span>
                    <span className="value">
                      {formatNumber(
                        item.regularMarketPreviousClose,
                        formatType
                      )}
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
                      {formatNumber(item.fiftyTwoWeekLow, formatType)} -{" "}
                      {formatNumber(item.fiftyTwoWeekHigh, formatType)}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="label">Open:</span>
                    <span className="value">
                      {formatNumber(item.regularMarketOpen, formatType)}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="label">Day&rsquo;s Range:</span>
                    <span className="value">
                      {formatNumber(item.regularMarketDayLow, formatType)} -{" "}
                      {formatNumber(item.regularMarketDayHigh, formatType)}
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

            {/* MAI JOS E ASSET-STATS PENTRU Currency */}
            {item.quoteType === "CURRENCY" && (
              <div className="asset-stats">
                <div className="stat">
                  <span className="label">Previous Close:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketPreviousClose, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Open:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketOpen, formatType)}
                  </span>
                </div>

                <div className="stat">
                  <span className="label">52 Week Range:</span>
                  <span className="value">
                    {formatNumber(item.fiftyTwoWeekLow, formatType)} -{" "}
                    {formatNumber(item.fiftyTwoWeekHigh, formatType)}
                  </span>
                </div>

                <div className="stat">
                  <span className="label">Bid:</span>
                  <span className="value">
                    {formatNumber(item.bid, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Day&rsquo;s Range:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketDayLow, formatType)} -{" "}
                    {formatNumber(item.regularMarketDayHigh, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Ask:</span>
                  <span className="value">
                    {formatNumber(item.ask, formatType)}
                  </span>
                </div>
              </div>
            )}

            {/* MAI JOS E ASSET-STATS PENTRU OPTIONS */}
            {item.quoteType === "OPTION" && (
              <div className="asset-stats">
                <div className="stat">
                  <span className="label">Previous Close:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketPreviousClose, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Open:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketOpen, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Bid:</span>
                  <span className="value">
                    {formatNumber(item.bid, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Ask:</span>
                  <span className="value">
                    {formatNumber(item.ask, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Strike:</span>
                  <span className="value">{formatNumber(item.strike)}</span>
                </div>
                <div className="stat">
                  <span className="label">Expire Date:</span>
                  <span className="value">
                    {item.expireIsoDate
                      ? item.expireIsoDate.split("T")[0] // Extrage partea de dată din formatul ISO
                      : "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Day’s Range:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketDayLow, formatType)} -{" "}
                    {formatNumber(item.regularMarketDayHigh, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Contract Range:</span>
                  <span className="value">
                    {item.contractRange
                      ? `${item.contractRange.min} - ${item.contractRange.max}`
                      : "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Volume:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketVolume)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Open Interest:</span>
                  <span className="value">
                    {formatOpenInterest(item.openInterest)}
                  </span>
                </div>
              </div>
            )}

            {/* MAI JOS E ASSET-STATS PENTRU ETF */}
            {item.quoteType === "ETF" && (
              <div className="asset-stats">
                <div className="stat">
                  <span className="label">Previous Close:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketPreviousClose)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Day&apos;s Range:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketDayLow)} -{" "}
                    {formatNumber(item.regularMarketDayHigh)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Open:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketOpen)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Net Assets:</span>
                  <span className="value">
                    {item.netAssets
                      ? item.netAssets >= 1_000_000_000
                        ? `${(item.netAssets / 1_000_000_000).toFixed(1)}B`
                        : item.netAssets >= 1_000_000
                        ? `${(item.netAssets / 1_000_000).toFixed(1)}M`
                        : item.netAssets.toLocaleString()
                      : "0"}
                  </span>
                </div>

                <div className="stat">
                  <span className="label">Volume:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketVolume)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Avg. Volume:</span>
                  <span className="value">
                    {formatNumber(item.averageDailyVolume3Month)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">PE Ratio (TTM):</span>
                  <span className="value">
                    {item.trailingPE !== undefined
                      ? formatNumber(item.trailingPE)
                      : "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Yield:</span>
                  <span className="value">
                    {item.yield !== undefined
                      ? formatNumber(item.yield) + "%"
                      : "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Expense Ratio (net):</span>
                  <span className="value">
                    {formatNumber(item.netExpenseRatio)}%
                  </span>
                </div>
                <div className="stat">
                  <span className="label">YTD Daily Total Return:</span>
                  <span className="value">{formatNumber(item.ytdReturn)}</span>
                </div>
                <div className="stat">
                  <span className="label">Beta (5Y Monthly):</span>
                  <span className="value">
                    {item.beta !== undefined ? formatNumber(item.beta) : "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">52 Week Range:</span>
                  <span className="value">
                    {formatNumber(item.fiftyTwoWeekLow)} -{" "}
                    {formatNumber(item.fiftyTwoWeekHigh)}
                  </span>
                </div>
              </div>
            )}

            {/* MAI JOS E ASSET-STATS PENTRU Mutual Funds */}
            {item.quoteType === "MUTUALFUND" && (
              <div className="asset-stats">
                <div className="stat">
                  <span className="label">Previous Close:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketPreviousClose)}
                  </span>
                </div>

                <div className="stat">
                  <span className="label">Last Dividend:</span>
                  <span className="value">
                    {formatNumber(item.dividendRate)}
                  </span>
                </div>

                <div className="stat">
                  <span className="label">Net Assets:</span>
                  <span className="value">
                    {item.netAssets
                      ? item.netAssets >= 1_000_000_000
                        ? `${(item.netAssets / 1_000_000_000).toFixed(1)}B`
                        : item.netAssets >= 1_000_000
                        ? `${(item.netAssets / 1_000_000).toFixed(1)}M`
                        : item.netAssets.toLocaleString()
                      : "0"}
                  </span>
                </div>

                <div className="stat">
                  <span className="label">PE Ratio (TTM):</span>
                  <span className="value">
                    {item.trailingPE !== undefined
                      ? formatNumber(item.trailingPE)
                      : "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Yield:</span>
                  <span className="value">
                    {item.yield !== undefined
                      ? formatNumber(item.yield) + "%"
                      : "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Expense Ratio:</span>
                  <span className="value">
                    {formatNumber(item.netExpenseRatio)}%
                  </span>
                </div>
                <div className="stat">
                  <span className="label">YTD Return:</span>
                  <span className="value">{formatNumber(item.ytdReturn)}%</span>
                </div>
                <div className="stat">
                  <span className="label">Beta (5Y Monthly):</span>
                  <span className="value">
                    {item.beta !== undefined ? formatNumber(item.beta) : "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">52 Week Range:</span>
                  <span className="value">
                    {formatNumber(item.fiftyTwoWeekLow)} -{" "}
                    {formatNumber(item.fiftyTwoWeekHigh)}
                  </span>
                </div>
              </div>
            )}

            {/* MAI JOS E ASSET-STATS PENTRU STOCKS */}
            {item.quoteType === "EQUITY" && item.trailingPE !== undefined && (
              <div className="asset-stats grid grid-cols-4 gap-4">
                <div className="stat">
                  <span className="label">Previous Close:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketPreviousClose, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Day&rsquo;s Range:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketDayLow, formatType)} -{" "}
                    {formatNumber(item.regularMarketDayHigh, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Open:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketOpen, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Market Cap (intraday):</span>
                  <span className="value">
                    {formatMarketCap(item.marketCap)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Bid:</span>
                  <span className="value">
                    {formatNumber(item.bid)} x {formatNumber(item.bidSize)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">52 Week Range:</span>
                  <span className="value">
                    {formatNumber(item.fiftyTwoWeekLow, formatType)} -{" "}
                    {formatNumber(item.fiftyTwoWeekHigh, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Ask:</span>
                  <span className="value">
                    {formatNumber(item.ask)} x {formatNumber(item.askSize)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Beta (5Y Monthly):</span>
                  <span className="value">{formatNumber(item.beta)}</span>
                </div>
                <div className="stat">
                  <span className="label">PE Ratio (TTM):</span>
                  <span className="value">
                    {item.trailingPE !== undefined
                      ? formatNumber(item.trailingPE)
                      : "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Avg Volume:</span>
                  <span className="value">
                    {formatNumber(item.averageDailyVolume3Month)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">EPS (TTM):</span>
                  <span className="value">
                    {formatNumber(item.epsTrailingTwelveMonths)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Earnings Date:</span>
                  <span className="value">
                    {item.earningsDate
                      ? new Date(item.earningsDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                          }
                        )
                      : "N/A"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Forward Dividend & Yield:</span>
                  <span className="value">
                    {formatNumber(item.dividendRate)} ({item.dividendYield}%)
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Ex-Dividend Date:</span>
                  <span className="value">
                    {item.exDividendDate
                      ? new Date(item.exDividendDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                          }
                        )
                      : "N/A"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">1y Target Est:</span>
                  <span className="value">
                    {formatNumber(item.targetEstimate)}
                  </span>
                </div>
              </div>
            )}

            {/* MAI JOS E ASSET-STATS PENTRU CRYPTO */}
            {item.quoteType === "CRYPTOCURRENCY" && (
              <div className="asset-stats">
                <div className="stat">
                  <span className="label">Previous Close:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketPreviousClose, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Open:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketOpen, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Day&rsquo;s Range:</span>
                  <span className="value">
                    {formatNumber(item.regularMarketDayLow, formatType)} -{" "}
                    {formatNumber(item.regularMarketDayHigh, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">52 Week Range:</span>
                  <span className="value">
                    {formatNumber(item.fiftyTwoWeekLow, formatType)} -{" "}
                    {formatNumber(item.fiftyTwoWeekHigh, formatType)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Start Date:</span>
                  <span className="value">
                    {item.startDate
                      ? new Date(item.startDate).toLocaleDateString("en-US")
                      : "N/A"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Algorithm:</span>
                  <span className="value">{item.algorithm || "--"}</span>
                </div>
                <div className="stat">
                  <span className="label">Market Cap:</span>
                  <span className="value">
                    {formatMarketCap(item.marketCap)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Max Supply:</span>
                  <span className="value">
                    {formatNumber(item.maxSupply) || "--"}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Volume:</span>
                  <span className="value">
                    {item.regularMarketVolume.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Volume (24hr):</span>
                  <span className="value">
                    {formatMarketCap(item.volume24Hr)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Circulating Supply:</span>
                  <span className="value">
                    {formatMarketCap(item.circulatingSupply)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Volume (24hr) All Currencies:</span>
                  <span className="value">
                    {formatMarketCap(item.volumeAllCurrencies)}
                  </span>
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
