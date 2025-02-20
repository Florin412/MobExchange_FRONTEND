/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importă Link
import { getNewAccessToken } from "../../../Auth/auth_functions";
import axios from "axios";
import "./TrendingNowCards.css";

const Card = ({
  symbol,
  shortName,
  longName,
  currentPrice,
  changePercent,
  item
}) => {
  const formatType = "normal"; // Valoare implicită

  // Afișează shortName sau longName cu limită de caractere
  const displayName =
    shortName && shortName.length > 22
      ? `${shortName.slice(0, 24)}...`
      : shortName || longName || "-";

  // Formatează currentPrice și changePercent
  const formattedPrice = currentPrice
    ? formatNumber(currentPrice, formatType)
    : "-";
  const formattedChangePercent =
    changePercent !== undefined
      ? `${changePercent > 0 ? "+" : ""}${formatNumber(
          changePercent,
          formatType
        )}%`
      : "-";

  // Determină stilul pentru changePercent
  const changePercentStyle = {
    color: changePercent > 0 ? "green" : changePercent < 0 ? "red" : "black",
    fontSize: "14px" // Adaugă această linie pentru a mări fontul
  };

  return (
    <Link
      to={`/quote/${symbol}`}
      state={{ item, formatType }}
      title={shortName || symbol}
      style={{ textDecoration: "none", color: "inherit" }} // Stilizare pentru link
    >
      <div
        className="card"
        style={{
          marginRight: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "190px"
        }}
      >
        <h3 style={{ color: "#1967d2", fontWeight: "600" }}>{symbol}</h3>
        <p title={shortName || longName || ""} style={{ color: "#333" }}>
          {displayName}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center" // Centrează vertical
          }}
        >
          <span
            style={{
              fontWeight: "600",
              fontSize: "17px",
              marginRight: "8px",
              color: "#333"
            }}
          >
            {formattedPrice}{" "}
          </span>
          <span style={changePercentStyle}>{formattedChangePercent} </span>
        </div>
      </div>
    </Link>
  );
};

const formatNumber = (num, formatType = "normal") => {
  const options = {
    minimumFractionDigits:
      formatType === "veryLong" ? 8 : formatType === "long" ? 4 : 2,
    maximumFractionDigits:
      formatType === "veryLong" ? 8 : formatType === "long" ? 4 : 2
  };

  return new Intl.NumberFormat("en-US", options).format(num);
};

const TrendingNowCards = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 24; // Numărul de carduri de afișat simultan

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const url = "http://localhost:8080/markets/stocks/trending";

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.status === 200 || response.status === 201) {
          setCards(response.data.finance.result[0].quotes.slice(0, 20));
        } else if (response.status === 400 || response.status === 401) {
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            fetchData(); // Retry the request with the new access token
          } else {
            console.error("Failed to refresh token");
          }
        }
      } catch (error) {
        console.error(
          "Error fetching stocks data for trending now cards:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + (cardsToShow - 19)) % cards.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - (cardsToShow - 19) + cards.length) % cards.length
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Adaugă spațiu între elemente
          alignItems: "center", // Centrează vertical
          marginBottom: "10px"
        }}
      >
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>Trending Now</div>
        <div
          style={{
            display: "flex",
            gap: "20px" // Adaugă spațiu între elemente
          }}
        >
          <button onClick={handlePrev} className="button-prev">
            &lt;
          </button>
          <button onClick={handleNext} className="button-next">
            &gt;
          </button>
        </div>
      </div>

      <div
        style={{ display: "flex", overflowX: "auto", width: "100%" }}
        className="hide-scrollbar"
      >
        {cards
          .slice(currentIndex, currentIndex + cardsToShow)
          .map((card, index) => (
            <Card
              key={index}
              symbol={card.symbol}
              shortName={card.shortName}
              longName={card.longName}
              currentPrice={card.regularMarketPrice}
              changePercent={card.regularMarketChangePercent}
              item={card}
            />
          ))}
      </div>
    </div>
  );
};

export default TrendingNowCards;
