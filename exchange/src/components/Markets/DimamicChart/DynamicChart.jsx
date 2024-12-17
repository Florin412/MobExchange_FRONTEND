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
        const response = await axios.get(
          `https://yahoo-finance166.p.rapidapi.com/api/stock/get-chart?region=US&range=1d&symbol=${symbol}&interval=1m`,
          {
            headers: {
              "X-RapidAPI-Key":
                "7a9e286ae5mshc4b30cf1ca2dbcap1dce89jsn96bd6cb77d14", // Înlocuiește cu API Key-ul tău
              "X-RapidAPI-Host": "yahoo-finance166.p.rapidapi.com" // Hostul corect pentru RapidAPI
            }
          }
        );

        const data = response.data.chart.result[0].indicators.quote[0].close; // Extrage datele de închidere
        // console.log("Mai jos ai datele istorice pentru moneda ", symbol);
        // console.log(data);
        setChartData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol]); // Dependință la simbol, se va reîncărca datele când simbolul se schimbă

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
