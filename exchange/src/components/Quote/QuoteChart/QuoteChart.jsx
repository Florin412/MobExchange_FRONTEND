import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import PropTypes from "prop-types";
import { FaMountain, FaChartLine } from "react-icons/fa"; // Importă iconițele
import "./QuoteChart.css";

const QuoteChart = ({ symbol, change }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // validRanges: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max
  const [range, setRange] = useState("1d");
  // Valid intervals: [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]"
  const [interval, setInterval] = useState("1m");
  const [activeButton, setActiveButton] = useState("1d");
  const [chartType, setChartType] = useState("mountain"); // Tipul graficului default
  const [percentageChange, setPercentageChange] = useState(null); // Adăugat pentru procentaj

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

  const calculatePercentageChange = () => {
    const closeData = chartData.datasets[0].data;
    const openPrice = closeData[0]; // Prețul de deschidere
    const closePrice = closeData[closeData.length - 1]; // Prețul de închidere

    if (openPrice && closePrice) {
      const change = ((closePrice - openPrice) / openPrice) * 100;
      setPercentageChange(change.toFixed(2)); // Păstrează două zecimale
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [symbol, change, range, interval]);

  useEffect(() => {
    if (chartData.datasets.length > 0) {
      calculatePercentageChange();
    }
  }, [chartData, activeButton]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="error-message">
        <p>Volume Not Available</p>
        <p>
          Error fetching data, you may have exceeded the MONTHLY quota for
          Requests on your current plan.
        </p>
      </div>
    );

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
            const timestamp = chartData.timestampData[index];
            const date = new Date(timestamp * 1000).toLocaleDateString("en-US");
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
          display: false
        },
        ticks: {
          color: "#aaa",
          callback: (value, index) => {
            const date = new Date(chartData.timestampData[index] * 1000);

            if (activeButton === "max" || activeButton === "5y") {
              return date.getFullYear(); // Returnează anul
            } else if (activeButton === "ytd" || activeButton === "1mo") {
              return date.getDate(); // Returnează ziua lunii
            } else if (activeButton === "1y" || activeButton === "6mo") {
              const month = date.getMonth(); // Obține luna (0-11)
              const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ];
              return monthNames[month];
            } else if (activeButton === "1d") {
              const minutes = date.getMinutes();
              return minutes === 0 ||
                minutes === 5 ||
                minutes === 10 ||
                minutes === 15 ||
                minutes === 20 ||
                minutes === 25 ||
                minutes === 30 ||
                minutes === 35 ||
                minutes === 40 ||
                minutes === 45 ||
                minutes === 50 ||
                minutes === 55
                ? `${date.getHours().toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`
                : "";
            } else if (activeButton === "5d") {
              const minutes = date.getMinutes();
              return minutes === 0 ||
                minutes === 10 ||
                minutes === 20 ||
                minutes === 30 ||
                minutes === 40 ||
                minutes === 50
                ? `${date.getHours().toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`
                : "";
            }
            return ""; // Default
          }
        }
      },
      y: {
        display: true,
        position: "right",
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
    calculatePercentageChange(); // Calculează procentajul la apăsarea butonului
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  // Configurarea datelor pentru grafic în funcție de tipul selectat
  const chartDataset = {
    label: "Price",
    data: chartData.datasets[0].data,
    borderColor:
      chartType === "mountain"
        ? percentageChange >= 0
          ? "#4CAF50"
          : "#F44336"
        : "#398bff",
    backgroundColor:
      chartType === "mountain"
        ? percentageChange >= 0
          ? "rgba(76, 175, 80, 0.2)"
          : "rgba(244, 67, 54, 0.2)"
        : "rgba(255, 255, 255, 0.2)",
    fill: true,
    pointRadius: 0,
    borderWidth: 2
  };

  return (
    <div style={{ width: "100%", minHeight: "150px" }}>
      <div className="numeUnic">
        <div className="chart-controls">
          {/* Butoanele de timp */}
          <button
            className={activeButton === "1d" ? "active" : ""}
            onClick={() => handleButtonClick("1d", "1m")}
          >
            1D
          </button>
          <button
            className={activeButton === "5d" ? "active" : ""}
            onClick={() => handleButtonClick("5d", "15m")}
          >
            5D
          </button>
          <button
            className={activeButton === "1mo" ? "active" : ""}
            onClick={() => handleButtonClick("1mo", "1d")}
          >
            1M
          </button>
          <button
            className={activeButton === "6mo" ? "active" : ""}
            onClick={() => handleButtonClick("6mo", "1d")}
          >
            6M
          </button>
          <button
            className={activeButton === "ytd" ? "active" : ""}
            onClick={() => handleButtonClick("ytd", "1d")}
          >
            YTD
          </button>
          <button
            className={activeButton === "1y" ? "active" : ""}
            onClick={() => handleButtonClick("1y", "1d")}
          >
            1Y
          </button>
          <button
            className={activeButton === "5y" ? "active" : ""}
            onClick={() => handleButtonClick("5y", "1wk")}
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

        {/* Afișarea procentajului sub butoanele de timp */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {percentageChange !== null && (
            <span
              style={{
                backgroundColor: percentageChange >= 0 ? "#4CAF50" : "#F44336",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                marginLeft: "10px",
                fontWeight: "bold"
              }}
            >
              {percentageChange}%
            </span>
          )}
        </div>

        {/* Butoane pentru tipul graficului */}
        <div className="chart-type-controls">
          <button
            className={chartType === "mountain" ? "active" : ""}
            onClick={() => handleChartTypeChange("mountain")}
          >
            <FaMountain style={{ marginRight: "8px" }} />
            Mountain
          </button>
          <button
            className={chartType === "line" ? "active" : ""}
            onClick={() => handleChartTypeChange("line")}
          >
            <FaChartLine style={{ marginRight: "8px" }} />
            Line
          </button>
        </div>
      </div>

      <Line
        data={{ labels: chartData.labels, datasets: [chartDataset] }}
        options={options}
        className="full-size"
      />
    </div>
  );
};

QuoteChart.propTypes = {
  symbol: PropTypes.string.isRequired,
  change: PropTypes.number.isRequired
};

export default QuoteChart;
