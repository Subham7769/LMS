import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import formateDataForExcelFile from "./formateDataForExcelFile"; // Import the formatting function

const exportToExcel = (jsonData, columnMapping, fileName = "data.xlsx") => {
  // Format the data dynamically based on column Mapping
  const formattedData = formateDataForExcelFile(jsonData, columnMapping);

  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write and save the Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  saveAs(data, fileName);
};

export default exportToExcel;
