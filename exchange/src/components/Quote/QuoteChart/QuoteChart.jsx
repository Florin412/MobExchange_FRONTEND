// QuoteChart.jsx
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import PropTypes from "prop-types";

import "./QuoteChart.css";

const QuoteChart = ({ symbol, change }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const encodedSymbol = encodeURIComponent(symbol);
        const range = "1d";
        const interval = "1m";

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
              hour12: false // Asigură-te că ora este în format 24 de ore
            });
          }),
          datasets: [
            {
              label: "Price",
              data: closeData,
              borderColor: change >= 0 ? "#4CAF50" : "#F44336", // Verde pentru pozitiv, roșu pentru negativ
              backgroundColor:
                change >= 0
                  ? "rgba(76, 175, 80, 0.2)"
                  : "rgba(244, 67, 54, 0.2)",
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

    fetchChartData();
  }, [symbol, change]); // Adaugă change în array-ul de dependențe

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
            const price = tooltipItem.raw;
            return `Price: $${price.toFixed(2)}`;
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
    <div style={{ width: "100%", height: "300px" }}>
      <Line data={chartData} options={options} className="full-size" />
    </div>
  );
};

QuoteChart.propTypes = {
  symbol: PropTypes.string.isRequired,
  change: PropTypes.number.isRequired // Adaugă propType pentru change
};

export default QuoteChart;
