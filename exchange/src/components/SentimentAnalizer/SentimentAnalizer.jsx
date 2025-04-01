/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Sentiment from "sentiment";
import "./SentimentAnalizer.css";

const SentimentAnalyzer = ({ text }) => {
  const [score, setScore] = useState(null);
  const [tooltip, setTooltip] = useState("");

  // Descrierile pentru fiecare scor
  const tooltips = {
    positive:
      "Positive sentiment: Indicates a favorable opinion. This suggests that the article presents information in a way that resonates well with readers, highlighting optimism or achievements.",

    neutral:
      "Neutral sentiment: Indicates neither positive nor negative opinions. This shows that the article presents factual information without strong emotional bias, providing a balanced view.",

    negative:
      "Negative sentiment: Indicates an unfavorable opinion. This conveys that the article discusses issues or events that are likely to upset or concern readers, revealing problems or challenges."
  };

  useEffect(() => {
    const analyzeSentiment = () => {
      const sentiment = new Sentiment();
      const result = sentiment.analyze(text);
      setScore(result.score);
    };

    analyzeSentiment();
  }, [text]);

  // Funcția pentru a seta tooltip-ul la hover
  const handleMouseOver = () => {
    if (score > 0) {
      setTooltip("positive");
    } else if (score < 0) {
      setTooltip("negative");
    } else {
      setTooltip("neutral");
    }
  };

  const handleMouseOut = () => {
    setTooltip("");
  };

  return (
    <div className="article-description not-cursor">
      {score !== null && (
        <p className="d-flex name-good ">
          Sentiment score: <span className="span-cu-score-ul">{score}</span>
          <span
            className="info-icon"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            ℹ
          </span>
        </p>
      )}

      {/* Afișează tooltip-ul dacă există */}
      {tooltip && <div className="tooltip">{tooltips[tooltip]}</div>}
    </div>
  );
};

export default SentimentAnalyzer;
