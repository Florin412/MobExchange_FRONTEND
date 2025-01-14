import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import PropTypes from "prop-types";

import "./QuoteChart.css";

const QuoteChart = ({ symbol, change }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("1d");
  const [interval, setInterval] = useState("1m");
  const [activeButton, setActiveButton] = useState("1d");

  const fetchChartData = async () => {
    try {
      const encodedSymbol = encodeURIComponent(symbol);
      const response = await axios.get(
        `http://localhost:8080/markets/stock-chart?symbol=${encodedSymbol}&range=${range}&interval=${interval}`
      );

      const data = response.data;
      const closeData = data.chart.result[0].indicators.quote[0].close;
      const highData = data.chart.result[0].indicators.quote[0].high;
      const lowData = data.chart.result[0].indicators.quote[0].low;
      const openData = data.chart.result[0].indicators.quote[0].open;
      const volumeData = data.chart.result[0].indicators.quote[0].volume;
      const timestampData = data.chart.result[0].timestamp;

      const processedData = {
        labels: timestampData.map((timestamp) => {
          const date = new Date(timestamp * 1000);
          return date.toLocaleTimeString("ro-RO", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          });
        }),
        datasets: [
          {
            label: "Price",
            data: closeData,
            borderColor: change >= 0 ? "#4CAF50" : "#F44336",
            backgroundColor:
              change >= 0 ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)",
            fill: true,
            pointRadius: 0,
            borderWidth: 2
          }
        ],
        highData,
        lowData,
        openData,
        volumeData,
        timestampData
      };

      setChartData(processedData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [symbol, change, range, interval]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            const price = tooltipItem.raw;
            const timestamp = chartData.timestampData[index]; // Obține timestamp-ul
            const date = new Date(timestamp * 1000).toLocaleDateString("en-US"); // Folosește formatul american
            const open = chartData.openData[index].toLocaleString("en-US", {
              minimumFractionDigits: 2
            });
            const high = chartData.highData[index].toLocaleString("en-US", {
              minimumFractionDigits: 2
            });
            const low = chartData.lowData[index].toLocaleString("en-US", {
              minimumFractionDigits: 2
            });
            const volume = chartData.volumeData[index].toLocaleString("en-US");

            return [
              `Date: ${date}`,
              `Close: ${price.toLocaleString("en-US", {
                minimumFractionDigits: 2
              })}`,
              `Open: ${open}`,
              `High: ${high}`,
              `Low: ${low}`,
              `Volume: ${volume}`
            ];
          }
        }
      },
      legend: { display: false }
    },
    elements: {
      point: { radius: 0 }
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart"
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true
        },
        ticks: {
          color: "#aaa"
        }
      },
      y: {
        display: true,
        grid: {
          display: true
        },
        ticks: {
          color: "#aaa"
        }
      }
    }
  };

  const handleButtonClick = (newRange, newInterval) => {
    setRange(newRange);
    setInterval(newInterval);
    setActiveButton(newRange);
  };

  return (
    <div style={{ width: "100%", minHeight: "150px" }}>
      <div className="chart-controls">
        <button
          className={activeButton === "1d" ? "active" : ""}
          onClick={() => handleButtonClick("1d", "1m")}
        >
          1D
        </button>
        <button
          className={activeButton === "5d" ? "active" : ""}
          onClick={() => handleButtonClick("5d", "10m")}
        >
          5D
        </button>
        <button
          className={activeButton === "20d" ? "active" : ""}
          onClick={() => handleButtonClick("20d", "1d")}
        >
          1M
        </button>
        <button
          className={activeButton === "120d" ? "active" : ""}
          onClick={() => handleButtonClick("120d", "1d")}
        >
          6M
        </button>
        <button
          className={activeButton === "240d" ? "active" : ""}
          onClick={() => handleButtonClick("240d", "1d")}
        >
          1Y
        </button>
        <button
          className={activeButton === "1200d" ? "active" : ""}
          onClick={() => handleButtonClick("1200d", "1d")}
        >
          5Y
        </button>
        <button
          className={activeButton === "max" ? "active" : ""}
          onClick={() => handleButtonClick("max", "1mo")}
        >
          ALL
        </button>
      </div>

      <Line data={chartData} options={options} className="full-size" />
    </div>
  );
};

QuoteChart.propTypes = {
  symbol: PropTypes.string.isRequired,
  change: PropTypes.number.isRequired
};

export default QuoteChart;
