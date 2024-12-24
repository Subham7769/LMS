const convertToReadableString = (str) => {
  return (
    str
      // Replace underscores with spaces
      .replace(/_/g, " ")
      // Insert a space before each uppercase letter that follows a lowercase letter
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Capitalize the first letter of the string
      .replace(/^./, (str) => str.toUpperCase())
      // Ensure uppercase sequences remain intact
      .replace(/(?<=[a-z])([A-Z]{2,})/g, " $1")
      .trim()
  ); // Remove any leading or trailing whitespace
};

export default convertToReadableString;