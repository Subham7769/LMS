// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Slices/sidebarSlice";
import recoverySlice from "./Slices/recoverySlice";
import tclSlice from "./Slices/tclSlice";
import projectSlice from "./Slices/projectSlice";
import productSlice from "./Slices/productSlice";
import dbrConfigSlice from "./Slices/dbrConfigSlice";
import creditScoreSlice from "./Slices/creditScoreSlice";
import customerCareSlice from "./Slices/customerCareSlice";
import productGroupSlice from "./Slices/productGroupSlice";
import generalLedgerSlice from "./Slices/generalLedgerSlice";
import userManagementSlice from "./Slices/userManagementSlice";
import eligiblityTenureSlice from "./Slices/eligiblityTenureSlice";
import productTestingSlice from "./Slices/productTestingSlice";
import rulePolicySlice from "./Slices/rulePolicySlice";
import overdraftLoanSlice from "./Slices/overdraftLoanSlice";
import globalConfigSlice from "./Slices/globalConfigSlice";
import dynamicRacSlice from "./Slices/dynamicRacSlice";
import validationSlice from "./Slices/validationSlice";
import reportingConfigSlice from "./Slices/reportingConfigSlice";
import reportsSlice from "./Slices/reportsSlice";
import authSlice from "./Slices/authSlice";
import notificationSlice from "./Slices/notificationSlice";
import serverConfigSlice from "./Slices/serverConfigSlice";
import appConfigSlice from "./Slices/appConfigSlice";
import depositSidebarSlice from "./Slices/depositSidebarSlice";
import accountsSlice from "./Slices/accountsSlice";
import personalBorrowersSlice from "./Slices/personalBorrowersSlice";
import personalLoansSlice from "./Slices/personalLoansSlice";
import personalRepaymentsSlice from "./Slices/personalRepaymentsSlice.jsx";
import smeBorrowersSlice from "./Slices/smeBorrowersSlice";
import smeLoansSlice from "./Slices/smeLoansSlice";
import smeRepaymentsSlice from "./Slices/smeRepaymentsSlice";
import affordabilitySlice from "./Slices/affordabilitySlice.js";
import employerSlice from "./Slices/employerSlice.js";
import loanApprovalSlice from "./Slices/loanApprovalSlice.js";
import documentConfigSlice from "./Slices/documentConfigSlice.js";

import checkTokenMiddleware from "./Middlewares/checkTokenMiddleware.js";
import AutoLogoutMiddleware from "./Middlewares/AutoLogoutMiddleware";

const store = configureStore({
  reducer: {
    dynamicRac: dynamicRacSlice,
    sidebar: sidebarReducer,
    recovery: recoverySlice,
    tcl: tclSlice,
    project: projectSlice,
    product: productSlice,
    dbrConfig: dbrConfigSlice,
    creditScore: creditScoreSlice,
    customerCare: customerCareSlice,
    productGroup: productGroupSlice,
    userManagement: userManagementSlice,
    creditScoreET: eligiblityTenureSlice,
    rulePolicy: rulePolicySlice,
    ledger: generalLedgerSlice,
    productTesting: productTestingSlice,
    globalConfig: globalConfigSlice,
    overdraftLoan: overdraftLoanSlice,
    validation: validationSlice,
    reportingConfig: reportingConfigSlice,
    reports: reportsSlice,
    auth: authSlice,
    notification: notificationSlice,
    serverConfig: serverConfigSlice,
    appConfig: appConfigSlice,
    depositSidebar: depositSidebarSlice,
    accounts: accountsSlice,
    personalBorrowers: personalBorrowersSlice,
    personalLoans: personalLoansSlice,
    personalRepayments: personalRepaymentsSlice,
    smeBorrowers: smeBorrowersSlice,
    smeLoans: smeLoansSlice,
    smeRepayments: smeRepaymentsSlice,
    affordability: affordabilitySlice,
    employer: employerSlice,
    loanApproval: loanApprovalSlice,
    documentConfig: documentConfigSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AutoLogoutMiddleware, checkTokenMiddleware),
});

export default store;
