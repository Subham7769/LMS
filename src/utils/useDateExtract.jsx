import { useEffect, useState } from "react";

const useDateExtract = (date) => {
  const [regDate, setRegDate] = useState("");

  useEffect(() => {
    handleExtractDate(date);
  }, [date]);

  const handleExtractDate = (date) => {
    if (!date) {
      setRegDate("Invalid Date");
      return;
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      setRegDate("Invalid Date");
      return;
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const monthNameSubmit = dateObj.toLocaleString("en-US", { month: "short" });

    const formattedDate = `${day} ${monthNameSubmit} ${year}`;
    setRegDate(formattedDate);
  };

  return regDate;
};

export default useDateExtract;
