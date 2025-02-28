export const lhaBranchOptions = [
  { value: "Lusaka", label: "Lusaka" },
  { value: "Kitwe", label: "Kitwe" },
  { value: "Solwezi", label: "Solwezi" },
]

export const borrowerTypeOptions = [
  { value: "PERSONAL_BORROWER", label: "PERSONAL BORROWER" },
  { value: "COMPANY_BORROWER", label: "COMPANY BORROWER" },
];

export const eligibiltyOptions = [
  { value: "ELIGIBILITY", label: "ELIGIBILITY" },
  { value: "REGISTRATION", label: "REGISTRATION" },
  { value: "BORROWER_OFFERS", label: "BORROWER OFFERS" },
];

export const loanTypeOptions = [
  { value: "asset", label: "Asset" },
  { value: "cash", label: "Cash" },
];

export const interestPeriodOptions = [
  { value: "Monthly", label: "Monthly" },
  { value: "Weekly", label: "Weekly" },
  { value: "Fortnightly", label: "Fortnightly" },
];

export const tenureOptions = [
  { value: "CORPORATE", label: "CORPORATE" },
  { value: "E_COMMERCE", label: "E_COMMERCE" },
  { value: "CONSUMER", label: "CONSUMER" },
];

export const tenureTypeOptions = [
  { value: "DAY", label: "DAY" },
  { value: "WEEK", label: "WEEK" },
  { value: "MONTH", label: "MONTH" },
  { value: "YEAR", label: "YEAR" },
];

export const options = [
  { value: "DAILY", label: "DAILY" },
  { value: "WEEKLY", label: "WEEKLY" },
  { value: "MONTHLY", label: "MONTHLY" },
  { value: "YEARLY", label: "YEARLY" },
];

export const empOptions = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
];

export const operatorOptions = [
  { value: "==", label: "==" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

export const maritalOptions = [
  { value: "SINGLE", label: "SINGLE" },
  { value: "MARRIED", label: "MARRIED" },
  { value: "DIVORCED", label: "DIVORCED" },
];

export const booleanOptions = [
  { value: true, label: "true" },
  { value: false, label: "false" },
];

export const loanStatusOptions = [
  { value: 0, label: "All" },
  { value: 1, label: "Pending Approval" },
  { value: 2, label: "Activated" },
  { value: 3, label: "Closed" },
  { value: 4, label: "Frozen" },
  { value: 5, label: "Roll Overed" },
  { value: 6, label: "Cancelled" },
  { value: 7, label: "Late" },
  { value: 8, label: "Returned" },
  { value: 9, label: "Defaulted" },
];

export const loanStatusOptionsNew = [
  { value: "", label: "ALL" },
  { value: "PENDING", label: "PENDING" },
  { value: "ACTIVATED", label: "ACTIVATED" },
  { value: "CLOSED", label: "CLOSED" },
  { value: "FROZEN", label: "FROZEN" },
  { value: "ROLL OVERED", label: "ROLL OVERED" },
  { value: "CANCELLED", label: "CANCELLED" },
  { value: "LATE", label: "LATE" },
  { value: "RETURNED", label: "RETURNED" },
  { value: "DEFAULTED", label: "DEFAULTED" },
];

export const nationalityOptions = [
  { value: "Indian", label: "Indian" },
  { value: "American", label: "American" },
  { value: "Russian", label: "Russian" },
  { value: "African", label: "African" },
  { value: "Japanese", label: "Japanese" },
  { value: "Chinese", label: "Chinese" },
];

export const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const maritalStatusOptions = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
  { value: "Widowed", label: "Widowed" },
  { value: "Separated", label: "Separated" },
  { value: "Unknown", label: "Unknown" },
];

export const residantialStatusOptions = [
  { value: "Rent", label: "Rent" },
  { value: "Own", label: "Own" },
];

export const productOptions = [
  { value: "Consumer", label: "Consumer" },
  { value: "Non-Consumer", label: "Non-Consumer" },
];

export const issuerOptions = [
  { value: "Bank", label: "Bank" },
  { value: "Other", label: "Other" },
  { value: "Bank,Other", label: "Bank, Other" },
];

export const gdbrWoMortageOptions = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "N/A" },
  { value: "BANK", label: "Yes if issuer is bank" },
];

export const gdbrWMortageOptions = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "N/A" },
];

export const defaultScoreOptions = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "N/A" },
];

export const optionsTwo = [
  { value: "Days", label: "Days" },
  { value: "Weeks", label: "Weeks" },
  { value: "Months", label: "Months" },
];

export const typeOptions = [
  { value: "LOAN", label: "Loan" },
  { value: "DEPENDENTS", label: "Dependents" },
  { value: "CHILDREN", label: "Children" },
  { value: "DOMESTIC_WORKERS", label: "Domestic Workers" },
];

export const notiChannelOptions = [
  { value: "PUSH", label: "Push" },
  { value: "SMS", label: "SMS" },
  { value: "BOTH", label: "Both" },
];

export const StringArray = [
  { label: "nationality", value: "nationality" },
  { label: "gender", value: "gender" },
  { label: "maritalStatus", value: "maritalStatus" },
  { label: "occupation", value: "occupation" },
  { label: "region", value: "region" },
  { label: "sector", value: "sector" },
  { label: "panVerified", value: "panVerified" },
  { label: "panStatus", value: "panStatus" },
];

export const NumberArray = [
  { label: "grossSalary", value: "grossSalary" },
  { label: "age", value: "age" },
  { label: "creditScore", value: "creditScore" },
  { label: "dependents", value: "dependents" },
  { label: "disposableIncome", value: "disposableIncome" },
  { label: "basicToGross", value: "basicToGross" },
  { label: "lengthOfService", value: "lengthOfService" },
  { label: "simahScore", value: "simahScore" },
  { label: "writeOff", value: "writeOff" },
  { label: "activeRule", value: "activeRule" },
];

export const statusOption = [
  { label: "ACTIVE", value: "ACTIVE" },
  { label: "FROZEN", value: "FROZEN" },
  { label: "CLOSED", value: "CLOSED" },
  { label: "PENDING", value: "PENDING" },
  { label: "EXPIRED", value: "EXPIRED" },
  { label: "REACTIVATED", value: "REACTIVATED" },
];

export const transactionTypeOption = [
  { label: "ALL", value: "ALL" },
  { label: "DEPOSIT", value: "DEPOSIT" },
  { label: "WITHDRAW", value: "WITHDRAW" },
];

export const interestMethodOptions = [
  { label: "FLAT", value: "FLAT" },
  { label: "REDUCING", value: "REDUCING" },
];

export const conditionsOptions = [
  { label: "Less than", value: "Less than" },
  { label: "Less than or equal to", value: "Less than or equal to" },
  { label: "Between", value: "Between" },
  { label: "Equal to", value: "Equal to" },
  { label: "Greater than", value: "Greater than" },
  { label: "Greater than or equal to", value: "Greater than or equal to" },
];

export const sectorOptions = [
  { label: "Construction", value: "Construction" },
  { label: "Education", value: "Education" },
  { label: "Energy", value: "Energy" },
  { label: "Health", value: "Health" },
  { label: "ICT", value: "ICT" },
  { label: "Insurance and Finance", value: "Insurance and Finance" },
  { label: "Livestock and Agriculture", value: "Livestock and Agriculture" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Mining", value: "Mining" },
  { label: "Tourism", value: "Tourism" },
  { label: "Trading", value: "Trading" },
  { label: "Transport", value: "Transport" },
];

export const trueFalseOptions = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];