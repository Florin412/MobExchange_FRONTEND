import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import axios from "axios";
import Table from "../TableForAssets/Table";
import { getNewAccessToken } from "../../Auth/auth_functions";
import LeftSidebarWithLinks from "../LeftSidebarWithLinks/LeftSidebarWithLinks";
import SpecificNewsForSymbols from "../../SpecificNewsForSymbols/SpecificNewsForSymbols";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Bonds = () => {
  // data este un array cu 40 de obiecte, obiecte ce reprezinta cate un asset, iar in obiect sunt date generale despre asset.
  // NU contine date istorice, deci nu se poate crea coloana pentru graph !!
  const [data, setData] = useState([]);
  const [activeButton1, setActiveButton1] = useState("Bonds");

  const defaultSymbols = ["^IRX", "^FVX", "^TNX", "^TYX", "2YY=F", "ZN=F"];

  useEffect(() => {
    const fetchMarketData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          "http://localhost:8080/markets/bonds",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status === 200 || response.status === 201) {
          // console.log(
          //   "Salut, acces token bun, mai jos ai raspunsul pentru Bonds: "
          // );
          // console.log(response.data.quoteResponse.result);
          setData(response.data.quoteResponse.result); // Stocăm datele în state
        } else if (response.status === 400 || response.status === 401) {
          // If access token is expired, lets creat a new one.
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            fetchMarketData(); // Retry the request with the new access token
          } else {
            console.error("Failed to refresh token");
          }
        }
      } catch (error) {
        console.error("Error fetching market data for Bonds:", error);
      }
    };

    fetchMarketData();
  }, []);

  const handleLinkClick = (buttonName) => {
    setActiveButton1(buttonName);
  };

  // Array cu numele coloanelor
  const columns = [
    "Symbol",
    "Name",
    "Graph",
    "Price",
    "Change",
    "Change %",
    "52 Wk Range"
  ];

  const exportToPDF = () => {
    const input = document.getElementById("my-bonds-table"); // ID-ul tabelului

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190; // Lățimea imaginii în PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("table_report.pdf");
    });
  };

  return (
    <div>
      <div className="quote-container">
        {/* Mai jos vine acel left-side-links doar pentru DESKTOP */}
        <LeftSidebarWithLinks
          activeButton1={activeButton1}
          handleLinkClick={handleLinkClick}
        />

        {/* Mai jos ai tabelul efectiv */}
        <div className="market-container" id="my-bonds-table">
          <h1 className="page-title">
            Bonds
            <span>
              <button
                style={{ fontSize: "16px", padding: "5px 15px" }}
                onClick={exportToPDF}
              >
                Descarcă PDF
              </button>
            </span>
          </h1>
          <Table data={data} columns={columns} formatTypeForNumbers={"long"} />{" "}
          {/* News for World Indices */}
          <div style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }} />
          <SpecificNewsForSymbols
            symbols={defaultSymbols}
            data={data}
            newsTitle="Bonds News"
          ></SpecificNewsForSymbols>
          <div
            className="hide-on-mobile"
            style={{ borderBottom: "1px solid #ddd", margin: "30px 0" }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bonds;
