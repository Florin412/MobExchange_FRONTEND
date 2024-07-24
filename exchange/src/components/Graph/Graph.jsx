import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ baseCurrency, startDate, targetCurrency }) => {
  const [chartDataDates, setChartDataDates] = useState([]);
  const [chartDataRates, setChartDataRates] = useState([]);
  console.log(startDate);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        console.log(baseCurrency, startDate, targetCurrency);
        const url = `http://192.168.170.158:8080/exchange-rates/historical/${startDate}/${baseCurrency}/${targetCurrency}`;
        const response = await axios.get(url);
        const data = await response.data;

        const exchangeRates = data.rates;

        const dates = Object.keys(exchangeRates);
        const rates = dates.map((date) => exchangeRates[date][targetCurrency]);

        // Process the data here and update chartData accordingly

        setChartDataDates(dates);
        setChartDataRates(rates);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchApiData();
  }, [baseCurrency, targetCurrency, startDate]);

  const data = {
    labels: chartDataDates.map((item) => item),
    datasets: [
      {
        label: `${targetCurrency} value in ${baseCurrency}`,
        data: chartDataRates.map((item) => item),
        borderColor: "#FFD824",
        backgroundColor: "blue",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

Graph.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired,
};
export default Graph;
