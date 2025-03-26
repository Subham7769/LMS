const isDateString = (value) => {
  return (
    typeof value === "string" &&
    (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) || // YYYY-MM-DD HH:MM:SS
      /^\d{4}-\d{2}-\d{2}$/.test(value)) // YYYY-MM-DD
  );
};

export default isDateString;
