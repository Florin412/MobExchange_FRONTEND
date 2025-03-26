/* eslint-disable react/prop-types */
import { useState } from "react";
import "./IndicatorControls.css";

const IndicatorControls = ({ indicators, handleIndicatorToggle }) => {
  const [tooltip, setTooltip] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

  // Descrierile pentru fiecare indicator
  const tooltips = {
    sma: "SMA (Simple Moving Average) is a technical indicator used to evaluate the average price of an asset over a specified period, helping traders identify long-term trends. It provides a smooth line on the chart, making it easier to observe whether the price is in an upward or downward trend.",

    ema: "EMA (Exponential Moving Average) is similar to SMA but gives more weight to recent prices, making it react more quickly to price changes. It is useful for spotting quick buy or sell signals due to its higher sensitivity compared to SMA.",

    rsi: "RSI (Relative Strength Index) is an oscillator that measures the speed and changes of price movements on a scale from 0 to 100. An RSI above 70 indicates that an asset is overbought, while below 30 suggests it is oversold. It is used to identify extreme market conditions and potential reversals."
  };

  // Funcția pentru a seta tooltip-ul la hover
  const handleMouseOver = (indicator, event) => {
    setTooltip(tooltips[indicator]);

    // Ajustează poziția tooltip-ului pentru a fi ușor vizibil
    setTooltipPosition({
      left: event.clientX + 10, // Ajustare horizontală
      top: event.clientY + 30 // Ajustare verticală
    });
  };

  const handleMouseOut = () => {
    setTooltip("");
  };

  return (
    <div className="indicator-controls" style={{ position: "relative" }}>
      {/* Mapează indicatorii și adaugă un checkbox */}
      {Object.keys(indicators).map((key) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={indicators[key]}
            onChange={() => handleIndicatorToggle(key)}
          />
          {key.toUpperCase()}
          <span
            className="info-icon"
            onMouseOver={(e) => handleMouseOver(key, e)}
            onMouseOut={handleMouseOut}
          >
            ℹ️
          </span>
        </label>
      ))}
      {/* Afișează tooltip-ul dacă există */}
      {tooltip && (
        <div
          className="tooltip"
          style={{
            left: 10,
            top: 40
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default IndicatorControls;
