import React from "react";

/**
 * Reusable Table component
 * Props:
 * - columns: array of column headers
 * - data: array of objects (rows)
 * - className: optional class for the table
 * - rowClassName: optional function to customize row classes
 * - cellClassName: optional function to customize cell classes
 */
export default function Table({ columns, data, className, rowClassName, cellClassName }) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full text-sm border-collapse ${className || ""}`}>
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="h-10 px-4 text-left font-medium text-gray-700 border-b"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b hover:bg-gray-50 ${
                rowClassName ? rowClassName(row, rowIndex) : ""
              }`}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`p-2 align-middle ${
                    cellClassName ? cellClassName(row[col], row, colIndex) : ""
                  }`}
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
