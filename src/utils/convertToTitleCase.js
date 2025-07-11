const convertToTitleCase = (text) => {
  return text
    .toLowerCase()
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

export default convertToTitleCase;
