const calculateAging = (date) => {
  const loanCreationDate = new Date(date); // Convert loanCreationDate to Date object
  const currentDate = new Date(); // Get the current date
  const timeDifference = currentDate - loanCreationDate; // Difference in milliseconds
  const aging = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

  return aging >= 0 ? aging : 0;
};

export default calculateAging;
