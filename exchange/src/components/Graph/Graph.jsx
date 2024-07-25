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

  const handleRefreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await axios.post(
        "http://192.168.170.158:8080/auth/getNewAccessToken",
        { refreshToken }
      );
      if (response.status === 200 || response.status === 201) {
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
      }
    } catch (error) {
      console.error("Refresh token invalid. Please log in again.", error);
      return null;
    }
  };

  const fetchApiData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const url = `http://192.168.170.158:8080/exchange-rates/historical/${startDate}/${baseCurrency}/${targetCurrency}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        const exchangeRates = response.data.rates;
        const dates = Object.keys(exchangeRates);
        const rates = dates.map((date) => exchangeRates[date][targetCurrency]);
        setChartDataDates(dates);
        setChartDataRates(rates);
      } else if (response.status === 401) {
        const newAccessToken = await handleRefreshToken();
        if (newAccessToken) {
          fetchApiData(); // Retry the request with the new access token
        } else {
          console.error("Failed to refresh token");
        }
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  useEffect(() => {
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
