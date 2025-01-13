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

  const fetchChartData = async () => {
    try {
      const encodedSymbol = encodeURIComponent(symbol);
      const response = await axios.get(
        `http://localhost:8080/markets/stock-chart?symbol=${encodedSymbol}&range=${range}&interval=${interval}`
      );

      const data = response.data;
      const closeData = data.chart.result[0].indicators.quote[0].close;

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
        ]
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
            const date = chartData.labels[index];
            const open = chartData.datasets[0].data[index]; // Folosește datele corespunzătoare
            const high = chartData.datasets[0].data[index]; // Folosește datele corespunzătoare
            const low = chartData.datasets[0].data[index]; // Folosește datele corespunzătoare
            const volume = chartData.datasets[0].data[index]; // Folosește datele corespunzătoare

            return [
              `Date: ${date}`,
              `Close: $${price.toFixed(2)}`,
              `Open: $${open.toFixed(2)}`,
              `High: $${high.toFixed(2)}`,
              `Low: $${low.toFixed(2)}`,
              `Volume: ${volume.toLocaleString()}`
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

  return (
    <div style={{ width: "100%", minHeight: "150px" }}>
      {/* Butoanele pentru interval și gamă */}
      <div className="chart-controls">
        <button
          onClick={() => {
            setRange("1d");
            setInterval("1m");
          }}
        >
          1D
        </button>
        <button
          onClick={() => {
            setRange("5d");
            setInterval("10m");
          }}
        >
          5D
        </button>
        <button
          onClick={() => {
            setRange("20d");
            setInterval("1d");
          }}
        >
          1M
        </button>
        <button
          onClick={() => {
            setRange("120d");
            setInterval("1d");
          }}
        >
          6M
        </button>
        <button
          onClick={() => {
            setRange("240d");
            setInterval("1d");
          }}
        >
          1Y
        </button>
        <button
          onClick={() => {
            setRange("1200d");
            setInterval("1d");
          }}
        >
          5Y
        </button>
        <button
          onClick={() => {
            setRange("max");
            setInterval("1mo");
          }}
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
