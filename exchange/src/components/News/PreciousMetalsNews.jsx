import { useEffect, useState } from "react";
import NewsTemplate from "./NewsTemplate";
import Footer from "../footer/Footer";
import axios from "axios";

const PreciousMetalsNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/news/precious-metals"
        );
        setNewsData(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <NewsTemplate newsData={newsData} pageTitle={"Precious Metals News"} />
      <Footer></Footer>
    </div>
  );
};

export default PreciousMetalsNews;
