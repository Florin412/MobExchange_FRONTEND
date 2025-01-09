import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import PropTypes from "prop-types";

const DynamicChart = ({ symbol }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const encodedSymbol = encodeURIComponent(symbol);
        const response = await axios.get(
          `http://localhost:8080/markets/stock-chart?symbol=${encodedSymbol}`
        );

        const data = response.data; // Extrage datele de închidere
        setChartData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // Verificăm dacă chartData este un array valid înainte de a folosi .map
  const data = {
    labels:
      Array.isArray(chartData) && chartData.length > 0
        ? chartData.map((_, index) => index + 1)
        : [], // Dacă chartData nu este un array sau este gol, setează etichetele ca un array gol
    datasets: [
      {
        label: `Price of ${symbol}`,
        data: chartData,
        borderColor: "#FFD824",
        backgroundColor: "rgba(255, 216, 36, 0.2)",
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ width: "100%", height: "50px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

DynamicChart.propTypes = {
  symbol: PropTypes.string.isRequired
};

export default DynamicChart;
