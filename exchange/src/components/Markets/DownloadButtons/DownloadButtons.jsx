/* eslint-disable react/prop-types */
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

const formatVolume = (volume) => {
  if (typeof volume !== "number" || isNaN(volume)) return ""; // Verifică valabilitatea
  if (volume >= 1e12) {
    return (volume / 1e12).toFixed(3) + "T"; // Formatează trilioane
  } else if (volume >= 1e9) {
    return (volume / 1e9).toFixed(3) + "B"; // Formatează miliarde
  } else if (volume >= 1e6) {
    return (volume / 1e6).toFixed(3) + "M"; // Formatează milioane
  } else {
    return volume.toLocaleString(); // Formatează cu separatoare pentru mii
  }
};

const DownloadButtons = ({ tableId, data }) => {
  const exportToPDF = () => {
    const input = document.getElementById(tableId);
    if (!input) return; // Verifică dacă tabelul există

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
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

  const exportToCSV = () => {
    if (!data || data.length === 0) return; // Verifică dacă datele există

    const exportData = data
      .map((item) => {
        let marketTime = "-"; // Valoare implicită
        if (item.regularMarketTime) {
          const date = new Date(item.regularMarketTime * 1000); // Convertim din secunde în milisecunde
          const options = {
            hour: "numeric",
            minute: "numeric",
            hour12: true, // Setăm la true pentru format de 12h
            timeZone: "America/New_York" // Setăm fusul orar pe EST
          };
          marketTime = date.toLocaleString("en-US", options) + " EST"; // Adăugăm "EST" la sfârșit
        }

        // Structura comună pentru Futures
        const commonDataFutures = {
          Symbol: item.symbol || "",
          Name: item.longName || item.shortName || "",
          Price:
            typeof item.regularMarketPrice === "number" &&
            !isNaN(item.regularMarketPrice)
              ? parseFloat(item.regularMarketPrice).toFixed(2)
              : "", // Formatează prețul sau returnează un string gol
          MarketTime: marketTime, // Aici adăugăm logica pentru "Market Time"
          Change:
            typeof item.regularMarketChange === "number" &&
            !isNaN(item.regularMarketChange)
              ? parseFloat(item.regularMarketChange).toFixed(2)
              : "", // Formatează schimbarea cu 2 zecimale sau returnează un string gol
          ChangePercent:
            typeof item.regularMarketChangePercent === "number" &&
            !isNaN(item.regularMarketChangePercent)
              ? parseFloat(item.regularMarketChangePercent).toFixed(2) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol
          Volume: formatVolume(item.regularMarketVolume), // Apelăm funcția de formatare pentru Volume
          OpenInterest: formatVolume(item.openInterest), // Apelăm funcția pentru Open Interest
          // Adaugă alte coloane pentru Futures, de exemplu
          FuturesSpecificColumn1: item.futuresSpecificField1 || "",
          FuturesSpecificColumn2: item.futuresSpecificField2 || ""
        };

        // Structura comună pentru World Indices
        const commonDataWorldIndices = {
          Symbol: item.symbol || "",
          Name: item.longName || item.shortName || "",
          Price:
            typeof item.regularMarketPrice === "number" &&
            !isNaN(item.regularMarketPrice)
              ? parseFloat(item.regularMarketPrice).toFixed(2)
              : "", // Formatează prețul sau returnează un string gol
          Change:
            typeof item.regularMarketChange === "number" &&
            !isNaN(item.regularMarketChange)
              ? parseFloat(item.regularMarketChange).toFixed(2)
              : "", // Formatează schimbarea cu 2 zecimale sau returnează un string gol
          ChangePercent:
            typeof item.regularMarketChangePercent === "number" &&
            !isNaN(item.regularMarketChangePercent)
              ? parseFloat(item.regularMarketChangePercent).toFixed(2) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol
          Volume: formatVolume(item.regularMarketVolume), // Apelăm funcția de formatare pentru Volume
          Day_Range: item.regularMarketDayRange || "", // Adaugă Day Range
          _52_Wk_Range: item.fiftyTwoWeekRange || ""
        };

        // Structura comună pentru Options
        const commonDataOptions = {
          Symbol: item.symbol || "",
          Name: item.longName || item.shortName || "",
          Underlying_Symbol: item.underlyingSymbol || "",
          Strike: item.strike || "",
          Expiration_Date: item.expireIsoDate || "",
          Price:
            typeof item.regularMarketPrice === "number" &&
            !isNaN(item.regularMarketPrice)
              ? parseFloat(item.regularMarketPrice).toFixed(4)
              : "", // Formatează prețul sau returnează un string gol
          Change:
            typeof item.regularMarketChange === "number" &&
            !isNaN(item.regularMarketChange)
              ? parseFloat(item.regularMarketChange).toFixed(4)
              : "", // Formatează schimbarea cu 2 zecimale sau returnează un string gol
          ChangePercent:
            typeof item.regularMarketChangePercent === "number" &&
            !isNaN(item.regularMarketChangePercent)
              ? parseFloat(item.regularMarketChangePercent).toFixed(4) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol
          Bid: item.bid || "",
          Ask: item.ask || "",
          Volume: formatVolume(item.regularMarketVolume), // Apelăm funcția de formatare pentru Volume
          Open_Interest: formatVolume(item.openInterest)
        };

        // Structura comună pentru Equity
        const commonDataEquity = {
          Symbol: item.symbol || "",
          Name: item.longName || item.shortName || "",
          Price:
            typeof item.regularMarketPrice === "number" &&
            !isNaN(item.regularMarketPrice)
              ? parseFloat(item.regularMarketPrice).toFixed(2)
              : "", // Formatează prețul sau returnează un string gol
          Change:
            typeof item.regularMarketChange === "number" &&
            !isNaN(item.regularMarketChange)
              ? parseFloat(item.regularMarketChange).toFixed(2)
              : "", // Formatează schimbarea cu 2 zecimale sau returnează un string gol
          ChangePercent:
            typeof item.regularMarketChangePercent === "number" &&
            !isNaN(item.regularMarketChangePercent)
              ? parseFloat(item.regularMarketChangePercent).toFixed(2) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol
          Volume: formatVolume(item.regularMarketVolume), // Apelăm funcția de formatare pentru Volume
          Avg_Vol_3M: formatVolume(item.averageDailyVolume3Month), // Apelăm funcția de formatare pentru Volume
          Market_Cap: formatVolume(item.marketCap),
          PE_Ratio: parseFloat(item.trailingPE).toFixed(2),
          _52_Wk_Change_Procent:
            typeof item.fiftyTwoWeekChangePercent === "number" &&
            !isNaN(item.fiftyTwoWeekChangePercent)
              ? parseFloat(item.fiftyTwoWeekChangePercent).toFixed(2) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol
          _52_Wk_Range: item.fiftyTwoWeekRange || ""
        };

        // Structura comună pentru CryptoCurrency
        const commonDataCrypto = {
          Symbol: item.symbol || "",
          Name: item.longName || item.shortName || "",
          Price:
            typeof item.regularMarketPrice === "number" &&
            !isNaN(item.regularMarketPrice)
              ? parseFloat(item.regularMarketPrice).toFixed(8)
              : "", // Formatează prețul sau returnează un string gol
          Change:
            typeof item.regularMarketChange === "number" &&
            !isNaN(item.regularMarketChange)
              ? parseFloat(item.regularMarketChange).toFixed(8)
              : "", // Formatează schimbarea cu 2 zecimale sau returnează un string gol
          ChangePercent:
            typeof item.regularMarketChangePercent === "number" &&
            !isNaN(item.regularMarketChangePercent)
              ? parseFloat(item.regularMarketChangePercent).toFixed(8) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol
          Market_Cap: formatVolume(item.marketCap),
          Volume: formatVolume(item.regularMarketVolume),
          Volume_in_Currency_24hr: formatVolume(item.volume24Hr),
          Total_Volume_all_Currency_24hr: formatVolume(
            item.volumeAllCurrencies
          ),
          Circulating_Supply: formatVolume(item.circulatingSupply),

          _52_Wk_Change_Procent:
            typeof item.fiftyTwoWeekChangePercent === "number" &&
            !isNaN(item.fiftyTwoWeekChangePercent)
              ? parseFloat(item.fiftyTwoWeekChangePercent).toFixed(2) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol
          _52_Wk_Range: item.fiftyTwoWeekRange || ""
        };

        // Structura comună pentru ETF
        const commonDataETF = {
          Symbol: item.symbol || "",
          Name: item.longName || item.shortName || "",
          Price:
            typeof item.regularMarketPrice === "number" &&
            !isNaN(item.regularMarketPrice)
              ? parseFloat(item.regularMarketPrice).toFixed(2)
              : "", // Formatează prețul sau returnează un string gol
          Change:
            typeof item.regularMarketChange === "number" &&
            !isNaN(item.regularMarketChange)
              ? parseFloat(item.regularMarketChange).toFixed(2)
              : "", // Formatează schimbarea cu 2 zecimale sau returnează un string gol
          ChangePercent:
            typeof item.regularMarketChangePercent === "number" &&
            !isNaN(item.regularMarketChangePercent)
              ? parseFloat(item.regularMarketChangePercent).toFixed(2) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol
          Volume: formatVolume(item.regularMarketVolume),
          _50_Day_Average: parseFloat(item.fiftyDayAverage).toFixed(2),
          _200_Day_Average: parseFloat(item.twoHundredDayAverage).toFixed(2),
          _3_Month_Return:
            typeof item.trailingThreeMonthReturns === "number" &&
            !isNaN(item.trailingThreeMonthReturns)
              ? parseFloat(item.trailingThreeMonthReturns).toFixed(2) + "%"
              : "",
          YTD_Return:
            typeof item.ytdReturn === "number" && !isNaN(item.ytdReturn)
              ? parseFloat(item.ytdReturn).toFixed(2) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol

          _52_Wk_Change_Procent:
            typeof item.fiftyTwoWeekChangePercent === "number" &&
            !isNaN(item.fiftyTwoWeekChangePercent)
              ? parseFloat(item.fiftyTwoWeekChangePercent).toFixed(2) + "%"
              : "", // Formatează % cu 2 zecimale sau returnează un string gol
          _52_Wk_Range: item.fiftyTwoWeekRange || ""
        };

        // Alege structura în funcție de tipul de date
        if (item.typeDisp === "Futures") {
          return commonDataFutures;
        } else if (item.typeDisp === "Index") {
          return commonDataWorldIndices;
        } else if (item.typeDisp === "Currency") {
          return commonDataWorldIndices;
        } else if (item.typeDisp === "Option") {
          return commonDataOptions;
        } else if (item.typeDisp === "Equity") {
          return commonDataEquity;
        } else if (item.typeDisp === "Cryptocurrency") {
          return commonDataCrypto;
        } else if (item.typeDisp === "ETF" || item.typeDisp === "Fund") {
          return commonDataETF;
        } else {
          return null; // Sau poți gestiona cazurile neprevăzute
        }
      })
      .filter((item) => item !== null); // Filtrăm elementele nevalide

    // Crează un nou workbook și o foaie de lucru
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Scrie fișierul Excel
    XLSX.writeFile(wb, "data_export.xlsx");
  };

  return (
    <span>
      <button
        className="pdf-button"
        onClick={exportToPDF}
         aria-label="Download table data as PDF"
        title="Download a PDF report"
      >
        PDF
      </button>
      <button
        className="csv-button"
        onClick={exportToCSV}
         aria-label="Download table data as CSV"
        title="Download a CSV report"
      >
        CSV
      </button>
    </span>
  );
};

export default DownloadButtons;
