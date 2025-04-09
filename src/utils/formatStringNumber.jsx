const formatStringNumber = (rate) => {
  if (!rate) return "";
  const numeric = parseFloat(rate.replace("%", ""));
  return `${numeric.toFixed(2)}%`;
};

export default formatStringNumber;
