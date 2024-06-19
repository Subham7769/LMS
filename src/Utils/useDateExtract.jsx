import { useEffect, useState } from "react";

const useDateExtract = (date) => {
  const [regDate, setRegDate] = useState(date);
  useEffect(() => {
    handleExtractDate();
  }, []);
  async function handleExtractDate() {
    const dateObj = new Date(regDate);

    // Extract the year, month, and day components
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const monthNameSubmit = new Date(year, month - 1).toLocaleString("en-US", {
      month: "short",
    });
    const day = String(dateObj.getDate()).padStart(2, "0");

    // Format the date in YYYY-MM-DD
    const formattedDate = `${day} ${monthNameSubmit} ${year}`;

    // Update the state with the formatted date
    setRegDate(formattedDate);
  }
  return regDate;
};

export default useDateExtract;
