const [formData, setFormData] = useState({
  name: "",
  projectDescription: "",
  country: null,
  location: null,
  locationFlag: false,
  filteredLocations: [],
  currencyName: null,
  loanType: null,
  minLoanAmt: "",
  maxLoanAmt: "",
  flatInterestRate: 0,
  interestRatePeriod: 0,
  interestPeriodUnit: null,
  downRepaymentGracePeriod: 0,
  emiRepaymentGracePeriod: 0,//graceForEmis
  loanGracePeriod: 0,//loanGrace
  rollOverGracePeriod: 0,//rollOverP
  rollOverPenaltyFactor: 0,//rollOverF
  rollOverPenaltyFee: 0,
  rollOverInterestRate: 0,//rollOverIR
  lateEmiPenaltyFactor: 0,//lateEMIPenalty
  maxPaymetAttemps: 0,//maxPaymentAttempt  
  rollOverEquation: "",
  startDate: startDate,
  endDate: "",
  lateRepaymentPenalty: 0,
  tclAmount: 0,
  minLoanOperator: "",
  minLoanAmount: 0,
  maxLoanOperator: "",
  maxLoanAmount: 0,
  earlyRepaymentDiscount: "",
  tclOperator: "",
  minInstallmentsOperator: "",
  minInstallmentsAmount: 0,
  maxInstallmentsOperator: "",
  maxInstallmentsAmount: 0,
  serviceFee: 0,
  calculateInterest: false,//calInterest
  hasEarlyLateRepayment: false,//earlyPay
  hasDownPayment: true,//hasDownPayPer
  managementFee: "",
  tclRef:"",
  tclIncludeFee: true,//tclFee
  tclIncludeInterest: true,//tclInterest
  openLoanOperator: "",
  openLoanAmount: 0,
  vatFee: "",
  clientIds: "Darwinclient",
});




const abc = {
    "name": "Subham Jain",
    "projectDescription": "jain",
    "country": "United States",
    "location": "Alabama",
    "currencyName": "USD",
    "loanType": "asset",
    "flatInterestRate": 10,
    "interestRatePeriod": 10,
    "interestPeriodUnit": "Monthly",
    "downRepaymentGracePeriod": 10,
    "emiRepaymentGracePeriod": 10,
    "loanGracePeriod": 10,
    "rollOverGracePeriod": 10,
    "rollOverPenaltyFactor": 10,
    "rollOverPenaltyFee": 10,
    "rollOverInterestRate": 10,
    "lateEmiPenaltyFactor": "10",
    "maxPaymetAttemps": 10,
    "rollOverEquation": {
        "equation": "",
        "variables": []
    },
    "startDate": "2024-07-02T12:33:19.902Z 00:00:00",
    "endDate": "2024-07-02 00:00:00",
    "lateRepaymentPenalty": "10",
    "tclAmount": 10,
    "minLoanOperator": "==",
    "minLoanAmount": 10,
    "maxLoanOperator": "==",
    "maxLoanAmount": 10,
    "earlyRepaymentDiscount": 10,
    "tclOperator": "==",
    "minInstallmentsOperator": "==",
    "minInstallmentsAmount": 10,
    "maxInstallmentsOperator": "==",
    "maxInstallmentsAmount": 10,
    "serviceFee": 10,
    "calculateInterest": false,
    "downPaymentOperator": "==",
    "hasDownPayment": 10,
    "managementFee": 10,
    "tclRef": "",
    "tclIncludeFee": true,
    "tclIncludeInterest": true,
    "openLoanOperator": "==",
    "openLoanAmount": 10,
    "vatFee": 10,
    "clientIds": [],
    "projectTimeZone": "GMT-180",
    "paymentOption": [
        "mobile wallet",
        "top up",
        "credit card"
    ],
    "bearers": [
        "SMS",
        "USSD"
    ],
    "criteria": "tcl undefined 10 and loanAmount undefined 10 and loanAmount undefined 10 and numberOfInstallments undefined 10 and numberOfInstallments undefined 10 and freqCap undefined 10"
}
