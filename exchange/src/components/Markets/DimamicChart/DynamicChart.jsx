import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import PropTypes from "prop-types";
import { getNewAccessToken } from "../../Auth/auth_functions";

import "./DynamicChart.css";

const DynamicChart = ({ symbol, change }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const encodedSymbol = encodeURIComponent(symbol);

        // Vreau sa primesc date de la API pentru o zi, iar distanta dintre date sa fie de 1 minut.
        const range = "1d";
        const interval = "1m";

        const response = await axios.get(
          `http://localhost:8080/markets/stock-chart?symbol=${encodedSymbol}&range=${range}&interval=${interval}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status === 200 || response.status === 201) {
          const data = response.data;

          // Extrage datele de închidere și timp
          const closeData = data.chart.result[0].indicators.quote[0].close;
          const timestampData = data.chart.result[0].timestamp;

          // timestamp este un array cu cateva sute de date numerice, aceste date numerice, daca sunt convertite cu un algoritm,
          // ele semnifica o data calendarisitica: 08/01/2025 16:41:00,
          // fiecare valore din array reprezinta o data cu un interval de x minute/ore/zile diferenta dintre ele.
          // closeData reprezinta valorile de închidere ale acelui interval de timp pentru un asset.

          // daca am 480 de date in timestampData, si in closeData o sa am tot 480 de valori

          // Determină culorile liniei în funcție de trend
          const isPositive = change >= 0; // Verifică dacă change este pozitiv
          const lineColor = isPositive ? "#4CAF50" : "#F44336"; // Verde pentru pozitiv, roșu pentru negativ
          const fillColor = isPositive
            ? "rgba(76, 175, 80, 0.2)"
            : "rgba(244, 67, 54, 0.2)";

          // Procesează datele pentru grafic
          // slice are valoarea -30, asta inseamna ca graficul va afisa doar ULTIMELE 30 de elemente, deci ultimele 30 de MINUTE
          // pentru ca este o distanta de 1 minut intre date.
          const processedData = {
            labels: timestampData
              .slice(-60)
              .map((timestamp) =>
                new Date(timestamp * 1000).toLocaleDateString()
              ),
            datasets: [
              {
                label: "", // Fără etichetă
                data: closeData.slice(-60),
                borderColor: lineColor,
                backgroundColor: fillColor,
                fill: true,
                pointRadius: 0, // Elimină punctele de pe grafic
                pointHoverRadius: 0, // Elimină punctele la hover
                borderWidth: 2 // Grosimea liniei graficului
              }
            ]
          };

          setChartData(processedData);
          setLoading(false);
        } else if (response.status === 400 || response.status === 401) {
          // If access token is expired, lets creat a new one.
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            fetchChartData(); // Retry the request with the new access token
          } else {
            console.error("Failed to refresh token");
          }
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol, change]); // Adaugă change în array-ul de dependențe

  if (loading) return <div>Loading...</div>;
  if (error) return <div></div>;

  const options = {
    responsive: true,
    plugins: {
      tooltip: { enabled: false }, // Dezactivează tooltip-urile
      legend: { display: false } // Ascunde legenda
    },
    elements: {
      point: { radius: 0 } // Elimină punctele
    },
    animation: {
      duration: 1000, // Durata animației
      easing: "easeOutQuart" // Efectul animației
    },
    scales: {
      x: {
        display: false, // Ascunde axa x
        grid: {
          display: false // Ascunde liniile grilei pe axa x
        },
        ticks: {
          display: false // Ascunde valorile de pe axa x
        }
      },
      y: {
        display: false, // Ascunde axa y
        grid: {
          display: false // Ascunde liniile grilei pe axa y
        },
        ticks: {
          display: false // Ascunde valorile de pe axa y
        }
      }
    }
  };

  return (
    <div style={{ width: "100%", height: "45px" }}>
      <Line data={chartData} options={options} className="full-size" />
    </div>
  );
};

DynamicChart.propTypes = {
  symbol: PropTypes.string.isRequired,
  change: PropTypes.number.isRequired
};

export default DynamicChart;
