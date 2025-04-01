/* eslint-disable react/prop-types */
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DownloadButtons = ({ tableId, data, columns }) => {
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

    const csvRows = [];
    const headers = columns.join(",") + "\n"; // Antetul CSV
    csvRows.push(headers); // Adaugă antetul

    data.forEach((item) => {
      const values = [
        item.symbol || "",
        item.longName || item.shortName || "",
        item.graph || "",
        item.regularMarketPrice || "",
        item.regularMarketChange || "",
        item.regularMarketChangePercent || "",
        item.fiftyTwoWeekRange || ""
      ];
      csvRows.push(values.join(",")); // Adaugă fiecare rând în CSV
    });

    // Crearea fișierului CSV folosind Blob
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv"); // Numele fișierului CSV
    link.style.visibility = "hidden"; // Ascunde linkul

    // Adăugarea link-ului în DOM și declanșarea descărcării
    document.body.appendChild(link);
    link.click();

    // Curățarea URL-ului și eliminarea link-ului din DOM
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <span>
      <button
        className="pdf-button"
        onClick={exportToPDF}
        title="Download a PDF report"
      >
        PDF
      </button>
      <button
        className="csv-button"
        onClick={exportToCSV}
        title="Download a CSV report"
      >
        CSV
      </button>
    </span>
  );
};

export default DownloadButtons;
