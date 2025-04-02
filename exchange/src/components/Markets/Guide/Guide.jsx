import { useState } from "react";
import Footer from "../../footer/Footer";
import "./Guide.css";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";
import chartImg from "../../../assets/chart_img.png"; // Ajustează calea, dacă este necesar
import hover_peste_grafic from "../../../assets/hover_peste_grafic.png"; // Ajustează calea, dacă este necesar
import buttons_for_chart from "../../../assets/buttons_for_chart.png"; // Ajustează calea, dacă este necesar
import mountain_line from "../../../assets/mountain_line.png"; // Ajustează calea, dacă este necesar
import indicators1 from "../../../assets/butoane_indicatori_avansati_grafic.png"; // Ajustează calea, dacă este necesar
import ema from "../../../assets/ema.png"; // Ajustează calea, dacă este necesar
import sma from "../../../assets/sma.png"; // Ajustează calea, dacă este necesar
import sma_ema from "../../../assets/sma_ema.png"; // Ajustează calea, dacă este necesar
import rsi from "../../../assets/rsi.png"; // Ajustează calea, dacă este necesar
import world_indices from "../../../assets/world_indices.png"; // Ajustează calea, dacă este necesar
import futures from "../../../assets/futures.png"; // Ajustează calea, dacă este necesar
import bonds from "../../../assets/bonds.jpg"; // Ajustează calea, dacă este necesar
import option from "../../../assets/option.jpg"; // Ajustează calea, dacă este necesar
import currency from "../../../assets/currency.png"; // Ajustează calea, dacă este necesar
import stocks from "../../../assets/stocks.png"; // Ajustează calea, dacă este necesar
import crypto from "../../../assets/crypto.png"; // Ajustează calea, dacă este necesar
import etf from "../../../assets/etf.png"; // Ajustează calea, dacă este necesar
import mutualFund from "../../../assets/mutual_fund.png"; // Ajustează calea, dacă este necesar

const Guide = () => {
  const [activeButton1, setActiveButton1] = useState("Guide");

  const handleLinkClick = (buttonName) => {
    setActiveButton1(buttonName);
  };

  return (
    <div>
      <div className="quote-container">
        {/* Mai jos vine acel left-side-links doar pentru DESKTOP */}
        <LeftSidebarWithLinks
          activeButton1={activeButton1}
          handleLinkClick={handleLinkClick}
        />

        <div className="market-container">
          <div id="ss-mutual-funds">
            <h1 className="page-title">Guide</h1>

            <div className="button-group overflow-auto">
              <div className="d-flex">
                {/* Modificăm butoanele pentru a naviga la secțiuni */}
                <button
                  className={`option-button`}
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById("how-to-read-chart")
                        .offsetTop,
                      behavior: "smooth"
                    })
                  }
                >
                  How to Read a Chart
                </button>

                <button
                  className={`option-button`}
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById("advanced-indicators")
                        .offsetTop,
                      behavior: "smooth"
                    })
                  }
                >
                  Advanced Indicators
                </button>

                <button
                  className={`option-button`}
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById("financial-terms-glossary")
                        .offsetTop,
                      behavior: "smooth"
                    })
                  }
                >
                  Financial Terms Glossary
                </button>
                <button
                  className={`option-button`}
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById("trading-strategies")
                        .offsetTop,
                      behavior: "smooth"
                    })
                  }
                >
                  Trading Strategies
                </button>
                <button
                  className={`option-button`}
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById(
                        "best-historical-performance"
                      ).offsetTop,
                      behavior: "smooth"
                    })
                  }
                >
                  Best Historical Performance
                </button>

                <button
                  className={`option-button`}
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById("asset-meanings").offsetTop,
                      behavior: "smooth"
                    })
                  }
                >
                  What Assets Mean in This Application
                </button>
              </div>
            </div>

            {/* ------------ */}
            {/* Conținut pentru secțiuni */}
            {/* ------------ */}

            <div id="introduction" className="guide-section introduction">
              <h2>Introduction</h2>
              <p>
                <strong>Welcome to our investment guide!</strong> This guide is
                designed to provide you with essential information about
                financial markets and the tools available for successfully
                navigating the world of investing. Whether you are a beginner
                looking to learn about the basics of trading or a more
                experienced investor seeking advanced strategies, this guide
                will equip you with the knowledge needed to make informed
                decisions.
              </p>
              <p>In the following pages, you will discover:</p>
              <ul>
                <li>How to read stock charts and technical indicators.</li>
                <li>
                  A variety of asset offerings, including stocks, options,
                  futures, cryptocurrencies, and mutual funds.
                </li>
                <li>
                  Clear definitions and relevant examples for essential
                  financial concepts.
                </li>
                <li>
                  Strategies and terms that will help you navigate financial
                  markets with confidence.
                </li>
              </ul>
              <p>
                By the end of this guide, you will have a deeper understanding
                of the financial markets and the various tools you can use to
                maximize your investment potential. Get ready to explore and
                learn how to become an informed and successful investor!
              </p>
            </div>

            {/* Cum sa citesti un chart */}
            <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
            <div id="how-to-read-chart" className="guide-section">
              <h2>How to Read a Stock Chart</h2>
              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={chartImg}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                The chart displayed shows the price movement of NVIDIA
                Corporation (NVDA) over a one-day period. Here&rsquo;s how to
                interpret the various elements of this chart:
              </p>
              <h3>1. Overall Appearance of the Chart</h3>
              <p>
                <strong>Time:</strong> The horizontal axis (X) represents the
                time interval (in this case, one day). It can range from 1
                minute to 1 year, and in this example, we have a short-term view
                (1D).
              </p>
              <p>
                <strong>Price:</strong> The vertical axis (Y) shows the stock
                price. The price ranges from $106.79 to $121.20 throughout the
                day.
              </p>
              <h3>2. Current Price and Key Variables</h3>
              <p>
                <strong>Current Price:</strong> In the top left corner, you see
                the current price of the stock, which is $110.89, with a
                percentage change of +0.67% from the previous day.
              </p>
              <p>
                <strong>Key Data:</strong> Important information often included
                are &ldquo;Previous Close&rdquo; (the closing price from
                yesterday), &ldquo;Open&rdquo; (the opening price),
                &ldquo;High&rdquo; (daily high), and &ldquo;Low&rdquo; (daily
                low), providing a quick snapshot of the stock&rsquo;s
                performance.
              </p>
              <h3>3. Body of the Chart</h3>
              <p>
                <strong>Line of the Chart:</strong> The curve of the chart
                reflects the price fluctuations of the stock over time. An
                ascending line indicates a price increase, while a descending
                line shows a decrease.
              </p>
              <p>
                <strong>Shaded Areas:</strong> In this chart, the shaded area
                below the line suggests volume or trading density, helping the
                user better visualize trends.
              </p>
              <h3>4. Chart Types</h3>
              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={mountain_line}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Mountain Chart:</strong> This type of chart fills the
                area below the line with color, providing a more dramatic visual
                representation of price movement. It highlights price variations
                over time, making it easy to perceive general trends.
              </p>
              <p>
                <strong>Line Chart:</strong> Unlike the mountain chart, the line
                chart displays a simple line connecting data points without
                filling the area below. This type is preferred by users who want
                to examine specific price details without distraction from
                shaded areas.
              </p>
              <h3>5. Price Change Percentage</h3>
              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={buttons_for_chart}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Percentage Change:</strong> In the center of the screen,
                the percentage shown (e.g., +0.95%) reflects the stock's price
                change over the selected time period (1D in this case). A
                positive percentage indicates an increase in the stock's value,
                while a negative percentage would indicate a decrease.
              </p>
              <h3>Detail Information</h3>
              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={hover_peste_grafic}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Hover Indicator:</strong> When you hover over the chart,
                an indicator appears showing the date, closing price for that
                day, open, high, low, and volume (number of shares traded).
              </p>
              <p>
                For example, on 04.02.2025 at 18:30, the closing price was
                $119.89, with a high of $120.17 and a low of $119.885.
              </p>
              <h3>Statistical Data</h3>
              <p>
                Additional information, such as &ldquo;Market Cap&rdquo; (market
                capitalization), &ldquo;Bid&rdquo; (any price offer),
                &ldquo;Ask&rdquo; (the requested price), and &ldquo;P/E
                Ratio&rdquo; (price/earnings ratio), provides an overview of the
                company&rsquo;s financial health.
              </p>
              <p>
                For example, the Market Cap is $2.71 T, indicating a high
                company valuation.
              </p>
            </div>

            <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />

            {/* Despre indicatori avansati */}
            <div id="advanced-indicators" className="guide-section">
              <h2>Advanced Indicators</h2>
              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={indicators1}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                In technical analysis, advanced indicators are essential for
                making informed trading decisions. These indicators provide
                insights into market trends and the health of stocks in
                real-time. Here are three of the most used indicators: SMA, EMA,
                and RSI.
              </p>

              <h3>1. SMA (Simple Moving Average)</h3>
              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={sma}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> SMA is the arithmetic average of an
                asset's prices over a specific period. It is simple to calculate
                and helps smooth price fluctuations to highlight trends.
              </p>
              <p>
                <strong>Role:</strong>
                <ul>
                  <li>
                    <strong>Identifying Trends:</strong> SMA can help traders
                    identify whether an asset is in an upward, downward, or
                    sideways trend.
                  </li>
                  <li>
                    <strong>Support and Resistance:</strong> SMA is often used
                    as support and resistance levels.
                  </li>
                </ul>
              </p>
              <p>
                <strong>Usage:</strong>
                <ul>
                  <li>
                    <strong>Common Periods:</strong> 50-day and 200-day SMAs are
                    widely used to assess medium- and long-term trends.
                  </li>
                  <li>
                    <strong>Crossovers:</strong> When a short-term SMA crosses a
                    long-term SMA, it can signal a buy or sell opportunity.
                  </li>
                </ul>
              </p>

              <h3>2. EMA (Exponential Moving Average)</h3>

              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={ema}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={sma_ema}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> EMA is similar to SMA but gives
                greater weight to recent prices, making it more responsive to
                price changes.
              </p>
              <p>
                <strong>Role:</strong>
                <ul>
                  <li>
                    <strong>Rapid Reaction:</strong> EMA provides a quicker
                    reaction to price changes, making it useful for traders
                    looking to capture short-term opportunities.
                  </li>
                  <li>
                    <strong>Indicates Timing:</strong> It is used to determine
                    entry and exit points in a position.
                  </li>
                </ul>
              </p>
              <p>
                <strong>Usage:</strong>
                <ul>
                  <li>
                    <strong>Common Periods:</strong> Traders often use 12-day
                    and 26-day EMAs for short-term strategies.
                  </li>
                  <li>
                    <strong>Crossovers:</strong> Similar to SMA, crossovers
                    between EMAs of different periods can indicate trading
                    signals.
                  </li>
                </ul>
              </p>

              <h3>3. RSI (Relative Strength Index)</h3>
              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={rsi}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> RSI is a momentum indicator that
                measures the speed and changes of price movements to evaluate
                overbought or oversold conditions of an asset.
              </p>
              <p>
                <strong>Role:</strong>
                <ul>
                  <li>
                    <strong>Identifying Market Conditions:</strong> RSI helps
                    traders determine if an asset is overbought (usually when
                    RSI is above 70) or oversold (when RSI is below 30).
                  </li>
                  <li>
                    <strong>Reversal Signals:</strong> RSI can be used to
                    identify potential trend reversals.
                  </li>
                </ul>
              </p>
              <p>
                <strong>Usage:</strong>
                <ul>
                  <li>
                    <strong>Range of 0-100:</strong> RSI values are calculated
                    on a scale of 0 to 100. Extreme values can indicate a future
                    trend change.
                  </li>
                  <li>
                    <strong>Divergences:</strong> Divergences between RSI and
                    price action can provide strong reversal signals.
                  </li>
                </ul>
              </p>
            </div>

            <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />

            {/* Similar changes for other sections */}
            <div id="financial-terms-glossary" className="guide-section">
              <h2>Financial Terms Glossary</h2>
              <p>
                Understanding financial terminology is crucial in the world of
                finance. Here are some essential terms explained:
              </p>
              <ul>
                <li>
                  <strong>Volatility:</strong> A statistical measure of the
                  dispersion of returns for a given security or market index.
                </li>
                <li>
                  <strong>Liquidity:</strong> The ease with which an asset can
                  be quickly bought or sold in the market without affecting its
                  price.
                </li>
                <li>
                  <strong>Market Capitalization:</strong> The total value of a
                  company's outstanding shares of stock.
                </li>
              </ul>
            </div>

            <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />

            <div id="trading-strategies" className="guide-section">
              <h2>Trading Strategies</h2>
              <p>
                There are numerous trading strategies that can be adopted based
                on your risk tolerance and market conditions:
              </p>
              <ul>
                <li>
                  <strong>Day Trading:</strong> Buying and selling financial
                  instruments within the same trading day.
                </li>
                <li>
                  <strong>Swing Trading:</strong> Short-term trading strategy
                  aimed at capturing gains in an asset over a few days to
                  several weeks.
                </li>
                <li>
                  <strong>Scalping:</strong> A strategy that attempts to profit
                  from small price changes over short time frames.
                </li>
              </ul>
            </div>

            <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />

            <div id="best-historical-performance" className="guide-section">
              <h2>Best Historical Performance</h2>
              <p>
                Historical performance can provide insights into how an asset
                has performed over time. Analyze historical data to identify
                trends and make informed decisions. Consider factors like:
              </p>
              <ul>
                <li>Consistency of returns over multiple time frames.</li>
                <li>Comparative performance against benchmarks.</li>
                <li>
                  Impact of significant market events on asset performance.
                </li>
              </ul>
            </div>

            <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />

            <div id="asset-meanings" className="guide-section">
              <h2>Types of assets</h2>
              <p>
                In the world of investing, assets represent any resource of
                value held by an individual or entity. In our application, users
                can explore various financial assets, each with unique
                characteristics, opportunities, and risks. Here’s an overview of
                the most relevant types of assets available:
              </p>

              <h3>1. World Indices</h3>
              <div style={{ maxWidth: "800px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={world_indices}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> World indices are statistics that
                reflect the performance of a group of stocks from a specific
                region or sector. Popular examples include S&P 500, Dow Jones
                Industrial Average, and FTSE 100.
              </p>
              <p>
                <strong>How They Work:</strong> These indices are calculated
                based on the stock prices of listed companies and provide an
                overview of the state of their respective economies.
              </p>
              <p>
                <strong>How to Buy:</strong> Investors can invest in indices
                through index funds or ETFs that track the performance of these
                indices.
              </p>

              <h3>2. Futures</h3>
              <div style={{ maxWidth: "400px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={futures}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> Futures contracts are agreements to
                buy or sell a specific asset at an established price at a
                specified date in the future.
              </p>
              <p>
                <strong>How They Work:</strong> These are used to hedge against
                price fluctuations or to speculate on future price movements.
              </p>
              <p>
                <strong>How to Buy:</strong> Futures trades are made in
                regulated markets through brokers specializing in derivatives.
              </p>

              <h3>3. US Treasury Bonds</h3>
              <div style={{ maxWidth: "400px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={bonds}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> US Treasury bonds are financial
                instruments issued by the US government to finance national
                debt.
              </p>
              <p>
                <strong>How They Work:</strong> They provide periodic interest
                payments and are considered some of the safest investments due
                to government backing.
              </p>
              <p>
                <strong>How to Buy:</strong> They can be purchased directly from
                the government or through securities brokers.
              </p>

              <h3>4. Currency</h3>
              <div style={{ maxWidth: "400px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={currency}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> Forex, or the foreign exchange
                market, involves exchanges between different currencies.
                Currencies are traded in pairs (e.g., EUR/USD).
              </p>
              <p>
                <strong>How They Work:</strong> The price of a currency is
                determined by supply and demand in the market.
              </p>
              <p>
                <strong>How to Buy:</strong> Currency trades are executed
                through forex trading platforms.
              </p>

              <h3>5. Options</h3>
              <div style={{ maxWidth: "400px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={option}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> Options are financial instruments
                that offer investors the right, but not the obligation, to buy
                or sell an asset at a fixed price before a specified date.
              </p>
              <p>
                <strong>How They Work:</strong> Options are used to speculate on
                future price movements or to hedge other investments.
              </p>
              <p>
                <strong>How to Buy:</strong> They can be bought and sold on
                options markets and require a broker that provides access to
                these instruments.
              </p>

              <h3>6. Stocks</h3>
              <div style={{ maxWidth: "400px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={stocks}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> Stocks represent a share in the
                capital of a company. Buyers become shareholders and have rights
                to the company’s profits and assets.
              </p>
              <p>
                <strong>How They Work:</strong> The value of stocks fluctuates
                according to the company's performance and overall market
                conditions.
              </p>
              <p>
                <strong>How to Buy:</strong> Stocks are purchased through a
                brokerage account.
              </p>

              <h3>7. Crypto</h3>
              <div style={{ maxWidth: "400px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={crypto}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>
              <p>
                <strong>Definition:</strong> Cryptocurrencies are digital
                currencies that use encryption technologies for security.
                Bitcoin and Ethereum are the most well-known examples.
              </p>
              <p>
                <strong>How They Work:</strong> They operate on blockchain
                technology, which ensures transparency and security of
                transactions.
              </p>
              <p>
                <strong>How to Buy:</strong> Cryptocurrencies can be purchased
                on trading platforms, known as exchanges.
              </p>

              <h3>8. ETFs (Exchange-Traded Funds)</h3>
              <div style={{ maxWidth: "400px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={etf}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>

              <p>
                <strong>Definition:</strong> Exchange-traded funds are
                investment funds that are traded on exchanges like regular
                stocks.
              </p>
              <p>
                <strong>How They Work:</strong> ETFs can contain a variety of
                assets, including stocks, bonds, commodities, etc., and provide
                diversification in a single instrument.
              </p>
              <p>
                <strong>How to Buy:</strong> They are purchased through
                brokerage accounts, just like stocks.
              </p>

              <h3>9. Mutual Funds</h3>
              <div style={{ maxWidth: "400px" }}>
                <img
                  style={{
                    maxWidth: "100%", // Asigură-te că imaginea nu depășește lățimea containerului
                    height: "auto" // Păstrează proporțiile imaginii
                  }}
                  src={mutualFund}
                  alt="Description of the chart"
                  className="chart-image"
                />
              </div>

              <p>
                <strong>Definition:</strong> Mutual funds are professionally
                managed investment funds that pool money from multiple investors
                to invest in various assets.
              </p>
              <p>
                <strong>How They Work:</strong> They offer investors a way to
                invest in a diversified range of assets without needing to buy
                each individual asset.
              </p>
              <p>
                <strong>How to Buy:</strong> Mutual funds can be purchased
                directly from fund managers or through brokers.
              </p>
            </div>
          </div>

          {/* Divider for Mutual Funds */}
          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Guide;
