import { useEffect, useState } from "react";
import NewsTemplate from "./NewsTemplate";
import Footer from "../footer/Footer";
import axios from "axios";

const BusinessNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/news/business");
        setNewsData(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ width: "100%", backgroundColor: "#fafafa" }}>
      <NewsTemplate newsData={newsData} pageTitle={"Business News"} />
      <Footer></Footer>
    </div>
  );
};

export default BusinessNews;
