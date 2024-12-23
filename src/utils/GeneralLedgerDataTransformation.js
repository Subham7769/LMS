export default function transformData(data) {
  // Group transactions by userId and loanId
  const transformed = [];

  data.forEach((item) => {
    const { userId, loanId, account } = item;

    // Find existing entry for the same userId and loanId
    let existingEntry = transformed.find(
      (entry) => entry.userId === userId && entry.loanId === loanId
    );

    if (!existingEntry) {
      // If no entry exists, create a new one
      existingEntry = {
        userId,
        loanId,
        accounts: [],
      };
      transformed.push(existingEntry);
    }

    // Add account to the accounts array
    existingEntry.accounts.push({ ...account });
  });

  return transformed;
}
