import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import PropTypes from "prop-types";
import { FaMountain, FaChartLine } from "react-icons/fa"; // Importă iconițele
import "./QuoteChart.css";
import { getNewAccessToken } from "../../Auth/auth_functions";
import IndicatorControls from "./IndicatorControls";

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
  const [showRSI, setShowRSI] = useState(true); // Asigură-te că există această linie

  const [indicators, setIndicators] = useState({
    sma: false,
    ema: false,
    rsi: false
  });
  const [indicatorData, setIndicatorData] = useState({
    rsi: [],
    sma: [],
    ema: []
  });

  // Calculează Media Mobilă Simplă (SMA)
  const calculateSMA = (data, period) => {
    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
      const slice = data.slice(i - period + 1, i + 1);
      const average = slice.reduce((acc, val) => acc + val, 0) / period;
      sma.push(average);
    }
    return sma;
  };

  // Calculează Media Mobilă Exponențială (EMA)
  const calculateEMA = (data, period) => {
    const ema = [];
    const k = 2 / (period + 1);
    ema[period - 1] =
      data.slice(0, period).reduce((acc, val) => acc + val, 0) / period; // media inițială
    for (let i = period; i < data.length; i++) {
      ema[i] = (data[i] - ema[i - 1]) * k + ema[i - 1];
    }
    return ema;
  };

  const calculateRSI = (data, period) => {
    if (data.length < period) return []; // Asigură-te că ai suficiente date

    const gains = [];
    const losses = [];
    for (let i = 1; i < data.length; i++) {
      const change = data[i] - data[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }

    const avgGain = calculateSMA(gains, period);
    const avgLoss = calculateSMA(losses, period);

    if (avgLoss.some((loss) => loss === 0)) {
      return avgGain.map((gain) => (gain ? 100 : 0)); // Evită diviziunea cu zero
    }

    return avgGain.map((gain, idx) => {
      const rs = gain / avgLoss[idx];
      return 100 - 100 / (1 + rs);
    });
  };

  const fetchChartData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setError(null);

    try {
      const encodedSymbol = encodeURIComponent(symbol);
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
                change >= 0
                  ? "rgba(76, 175, 80, 0.2)"
                  : "rgba(244, 67, 54, 0.2)",
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

        // mai jos adauga codul
        // Procesare date de preț pentru indicatori
        //const closeData = processedData.datasets[0].data; // Prețurile de închidere

        // Dacă indicatorii SMA sau EMA sunt activi, recalculează-i
        if (indicators.sma) {
          const smaValues = calculateSMA(closeData, 14);
          setIndicatorData((prev) => ({ ...prev, sma: smaValues }));
        }

        if (indicators.ema) {
          const emaValues = calculateEMA(closeData, 14);
          setIndicatorData((prev) => ({ ...prev, ema: emaValues }));
        }

        if (indicators.rsi) {
          const rsiPeriod = 14; // poți schimba perioada după cum dorești
          const rsiValues = calculateRSI(closeData, rsiPeriod);
          setIndicatorData((prev) => ({ ...prev, rsi: rsiValues }));
        }

        setChartData(processedData);

        // Dezactivează SMA și EMA atunci când primești date noi
        setIndicators({ sma: false, ema: false, rsi: indicators.rsi });

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

  const calculatePercentageChange = () => {
    const closeData = chartData.datasets[0].data;
    const openPrice = closeData[0]; // Prețul de deschidere
    const closePrice = closeData[closeData.length - 1]; // Prețul de închidere

    if (openPrice && closePrice) {
      const change = ((closePrice - openPrice) / openPrice) * 100;
      setPercentageChange(change.toFixed(2)); // Păstrează două zecimale
    }
  };

  // Calculate RSI when data is available
  const calculateRSIData = () => {
    const closeData = chartData.datasets[0].data; // Prețurile de închidere
    if (closeData && closeData.length > 0) {
      const rsiValues = calculateRSI(closeData, 14); // Perioada RSI
      setIndicatorData({ rsi: rsiValues });
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

  useEffect(() => {
    if (chartData.datasets.length > 0) {
      calculateRSIData(); // Calculăm RSI după ce avem datele
    }
  }, [chartData]);

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
            const date = new Date(timestamp * 1000).toLocaleDateString("ro-RO");
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

  const chartDataset = [];
  chartDataset.push({
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
  });

  // Adaugă SMA
  if (indicators.sma) {
    chartDataset.push({
      label: "SMA",
      data: indicatorData.sma,
      borderColor: "#0000FF",
      borderWidth: 1,
      fill: false
    });
  }

  // Adaugă EMA
  if (indicators.ema) {
    chartDataset.push({
      label: "EMA",
      data: indicatorData.ema,
      borderColor: "#FF8000",
      borderWidth: 1,
      fill: false
    });
  }

  const formatNumber = (num, formatType = "normal") => {
    const options = {
      minimumFractionDigits: formatType === "long" ? 4 : 2,
      maximumFractionDigits: formatType === "long" ? 4 : 2
    };

    return new Intl.NumberFormat("en-US", options).format(num);
  };

  // Logic to handle toggle for RSI
  // const handleIndicatorToggle = (indicator) => {
  //   if (indicator === "rsi") {
  //     setShowRSI((prev) => !prev); // Toggle visibility for RSI graph
  //   }
  // };

  const handleIndicatorToggle = (indicator) => {
    setIndicators((prevState) => ({
      ...prevState,
      [indicator]: !prevState[indicator]
    }));

    // Recalculăm indicatori după fiecare activare
    if (indicator === "sma" || indicator === "ema" || indicator === "rsi") {
      const closeData = chartData.datasets[0].data;

      if (indicator === "sma") {
        const smaValues = calculateSMA(closeData, 14);
        setIndicatorData((prev) => ({
          ...prev,
          sma: indicators.sma ? [] : smaValues // Dacă era activ, resetează la [] la dezactivare
        }));
      } else if (indicator === "ema") {
        const emaValues = calculateEMA(closeData, 14);
        setIndicatorData((prev) => ({
          ...prev,
          ema: indicators.ema ? [] : emaValues // La fel ca la SMA
        }));
      } else if (indicator === "rsi") {
        setShowRSI((prev) => !prev); // Toggle visibility for RSI graph
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
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
        <div className="hide-on-mobile">
          {percentageChange !== null && (
            <span
              style={{
                backgroundColor: percentageChange >= 0 ? "#4CAF50" : "#F44336",
                color: "white",
                padding: "8px 10px",
                borderRadius: "5px",
                fontWeight: "bold"
              }}
            >
              {formatNumber(percentageChange)}%
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

      {/* Mai jos ai componenta care afiseaza cele 3 butoane pentru indicatori avansati: SMA, EMA, RSI */}
      <IndicatorControls
        indicators={indicators}
        handleIndicatorToggle={handleIndicatorToggle}
      ></IndicatorControls>

      {/* Graficul cu date istorice */}
      <Line
        data={{ labels: chartData.labels, datasets: chartDataset }}
        options={options}
        className="full-size"
      />

      {/* Graficul RSI */}
      {!showRSI && indicatorData.rsi.length > 0 && (
        <Line
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: "RSI Indicator",
                data: indicatorData.rsi,
                borderColor: "#FFA500",
                borderWidth: 2,
                fill: false
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const index = tooltipItem.dataIndex;
                    const value = tooltipItem.raw;

                    // Asumăm că labels sunt timestampuri în secunde, astfel înmulțim cu 1000 pentru milisecunde
                    const timestamp = chartData.timestampData[index] * 1000;
                    const date = new Date(timestamp).toLocaleDateString(
                      "ro-RO"
                    );

                    return [
                      `Data: ${date}`, // Afișează data
                      `RSI: ${value.toFixed(0)}`
                    ];
                  }
                }
              }
            },
            scales: {
              y: {
                min: 0,
                max: 100
              }
            }
          }}
        />
      )}

      <div className="chart-controls for-mobile">
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
      <div className="for-mobile a">
        {percentageChange !== null && (
          <span
            style={{
              backgroundColor: percentageChange >= 0 ? "#4CAF50" : "#F44336",
              color: "white",
              padding: "8px 10px",
              borderRadius: "5px",
              fontWeight: "bold"
            }}
          >
            {formatNumber(percentageChange)}%
          </span>
        )}
      </div>
    </div>
  );
};

QuoteChart.propTypes = {
  symbol: PropTypes.string.isRequired,
  change: PropTypes.number.isRequired
};

export default QuoteChart;
