import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import PropTypes from "prop-types";

import "./DynamicChart.css";

const DynamicChart = ({ symbol }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const encodedSymbol = encodeURIComponent(symbol);
        // Vreau sa primesc date de la API pentru o zi, iar distanta dintre date sa fie de 1 minut.
        const range = "60d";
        const interval = "1d";

        const response = await axios.get(
          `http://localhost:8080/markets/stock-chart?symbol=${encodedSymbol}&range=${range}&interval=${interval}`
        );

        const data = response.data;

        // Extrage datele de închidere și timp
        const closeData = data.chart.result[0].indicators.quote[0].close;
        const timestampData = data.chart.result[0].timestamp;

        // De obiecei, timestamp este un array cu cateva sute de date numerice, aceste date numerice, daca sunt convertite cu un algoritm,
        // ele semnifica o data calendarisitica: 08/01/2025 16:41:00,
        // fiecare valore din array reprezinta o data cu un interval de 1 MINUT diferenta dintre ele.
        // closeData reprezinta valorile de închidere ale acelui interval de timp pentru un asset.

        // daca am 480 de date in timestampData, si in closeData o sa am tot 480 de valori
        // se pare ca nu am date istorice de pe o periada mai mare de 1 zi...

        timestampData.forEach((timestamp) => {
          const date = new Date(timestamp * 1000);
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const seconds = date.getSeconds().toString().padStart(2, "0");
          console.log(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`);
        });

        // Determină culorile liniei în funcție de trend
        const isPositive = closeData[closeData.length - 1] > closeData[0];
        const lineColor = isPositive ? "#4CAF50" : "#F44336";
        const fillColor = isPositive
          ? "rgba(76, 175, 80, 0.2)"
          : "rgba(244, 67, 54, 0.2)";

        // Procesează datele pentru grafic (ultimele x puncte, unde distanta dintre ele este de 5 minute)
        // -10 e echivalent cu 1 minut intre puncte, -50 e echivalent cu 5 minute intre puncte
        const processedData = {
          labels: timestampData
            .slice(-50)
            .map((timestamp) =>
              new Date(timestamp * 1000).toLocaleDateString()
            ),
          datasets: [
            {
              label: "", // Fără etichetă
              data: closeData.slice(-50),
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
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

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
  symbol: PropTypes.string.isRequired
};

export default DynamicChart;
