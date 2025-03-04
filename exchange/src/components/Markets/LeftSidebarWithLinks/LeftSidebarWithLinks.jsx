/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const LeftSidebarWithLinks = ({ activeButton1, handleLinkClick }) => {
  return (
    <div className="hide-on-mobile">
      <div className="button-group1 overflow-auto">
        <div className="d-flex flex-column">
          <Link
            to="/markets/overview"
            className={`option-button1 ${
              activeButton1 === "Overview" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Overview")}
          >
            Overview
          </Link>
          <Link
            to="/markets/world-indices"
            className={`option-button1 ${
              activeButton1 === "World Indices" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("World Indices")}
          >
            World Indices
          </Link>
          <Link
            to="/markets/commodities"
            className={`option-button1 ${
              activeButton1 === "Futures" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Futures")}
          >
            Futures
          </Link>
          <Link
            to="/markets/bonds"
            className={`option-button1 ${
              activeButton1 === "Bonds" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Bonds")}
          >
            Bonds
          </Link>
          <Link
            to="/markets/currencies"
            className={`option-button1 ${
              activeButton1 === "Currencies" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Currencies")}
          >
            Currencies
          </Link>
          <Link
            to="/markets/options/most-active"
            className={`option-button1 ${
              activeButton1 === "Options" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Options")}
          >
            Options
          </Link>
          <Link
            to="/markets/stocks/most-active"
            className={`option-button1 ${
              activeButton1 === "Stocks" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Stocks")}
          >
            Stocks
          </Link>
          <Link
            to="/markets/crypto/most-active"
            className={`option-button1 ${
              activeButton1 === "Crypto" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Crypto")}
          >
            Crypto
          </Link>
          <Link
            to="/markets/etfs/most-active"
            className={`option-button1 ${
              activeButton1 === "ETFs" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("ETFs")}
          >
            ETFs
          </Link>
          <Link
            to="/markets/mutual-funds/top-gainers"
            className={`option-button1 ${
              activeButton1 === "Mutual Funds" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Mutual Funds")}
          >
            Mutual Funds
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebarWithLinks;
