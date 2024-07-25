import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import axios from "axios";
import apiUrl from "../../assets/api_url";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

  const handleRefreshToken = async () => {
    // Retrieve the refresh token from local storage
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      // Make a POST request to the API to get a new access token by using our refresh token.
      const response = await axios.post(`${apiUrl}/auth/getNewAccessToken`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      });

      // If the request was successful, extract the new access token
      if (response.status === 200 || response.status === 201) {
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        return newAccessToken;
      } else {
        return null;
      }
    } catch (error) {
      // Handle errors, such as invalid or expired refresh token
      console.error("Refresh token invalid. Please log in again.", error);
      //signOut(); // Function that logs out the user
    }
  };

  const fetchApiData = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const url = `${apiUrl}/exchange-rates/historical/${startDate}/${baseCurrency}/${targetCurrency}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log("am intrat in 200");

        const exchangeRates = response.data.rates;
        const dates = Object.keys(exchangeRates);
        const rates = dates.map((date) => exchangeRates[date][targetCurrency]);
        setChartDataDates(dates);
        setChartDataRates(rates);

        console.log(exchangeRates, dates, rates);
      } else if (response.status === 400 || response.status === 401) {
        // If access token is expired creat a new one.
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
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

Graph.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired
};

export default Graph;
