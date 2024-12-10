/* eslint-disable react/prop-types */
import "./Table.css";

const Table = ({ title, data, columns }) => {
  return (
    <div className="table-container">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={
                    column === "Change%" && item.change.startsWith("-")
                      ? "negative"
                      : column === "Change%" && !item.change.startsWith("-")
                      ? "positive"
                      : ""
                  }
                >
                  {column === "Change%"
                    ? item.change
                    : item[column.toLowerCase()]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
