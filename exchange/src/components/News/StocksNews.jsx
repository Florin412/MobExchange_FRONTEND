import { useEffect, useState } from "react";
import NewsTemplate from "./NewsTemplate";
import axios from "axios"; // Asigură-te că ai axios instalat

const StocksNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/news/stocks");
        setNewsData(response.data); // Păstrează doar data
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1>Stock Market News</h1>
      <NewsTemplate newsData={newsData} />
    </div>
  );
};

export default StocksNews;
