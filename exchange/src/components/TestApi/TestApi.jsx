import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const api_key = "ddf8050f97a99073d99d4dcf";
  const base_currency = "EUR";
  const url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/${base_currency}`;

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(url);
        if (response.data.result === "success") {
          setExchangeRates(response.data.conversion_rates);
        } else {
          console.error(
            "Error fetching exchange rates:",
            response.data["error-type"]
          );
        }
      } catch (error) {
        console.error("Error making API request:", error);
      }
    };

    fetchExchangeRates();
  }, [url]);

  return (
    <div>
      <h1>Exchange Rates for {base_currency}</h1>
      {exchangeRates ? (
        <ul>
          {Object.entries(exchangeRates).map(([currency, rate]) => (
            <li key={currency}>
              {currency}: {rate}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
