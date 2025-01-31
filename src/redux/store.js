// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Slices/sidebarSlice";
import recoverySlice from "./Slices/recoverySlice";
import tclSlice from "./Slices/tclSlice";
import projectSlice from "./Slices/projectSlice";
import productSlice from "./Slices/productSlice";
import blockedEmployerSlice from "./Slices/blockedEmployerSlice";
import dbrConfigSlice from "./Slices/dbrConfigSlice";
import creditScoreSlice from "./Slices/creditScoreSlice";
import customerCareSlice from "./Slices/customerCareSlice";
import productGroupSlice from "./Slices/productGroupSlice";
import generalLedgerSlice from "./Slices/generalLedgerSlice";
import userManagementSlice from "./Slices/userManagementSlice";
import eligiblityTenureSlice from "./Slices/eligiblityTenureSlice";
import userProductTestingSlice from "./Slices/userProductTestingSlice";
import rulePolicySlice from "./Slices/rulePolicySlice";
import overdraftLoanOffersSlice from "./Slices/overdraftLoanOffersSlice";
import globalConfigSlice from "./Slices/globalConfigSlice";
import dynamicRacSlice from "./Slices/dynamicRacSlice";
import validationSlice from "./Slices/validationSlice";
import reportingConfigSlice from "./Slices/reportingConfigSlice";
import reportsSlice from "./Slices/reportsSlice";
import authSlice from "./Slices/authSlice";
import notificationSlice from "./Slices/notificationSlice";

const store = configureStore({
  reducer: {
    dynamicRac: dynamicRacSlice,
    sidebar: sidebarReducer,
    recovery: recoverySlice,
    tcl: tclSlice,
    project: projectSlice,
    product: productSlice,
    blockedEmployer: blockedEmployerSlice,
    dbrConfig: dbrConfigSlice,
    creditScore: creditScoreSlice,
    customerCare: customerCareSlice,
    productGroup: productGroupSlice,
    userManagement: userManagementSlice,
    creditScoreET: eligiblityTenureSlice,
    rulePolicy: rulePolicySlice,
    ledger: generalLedgerSlice,
    userProductTesting: userProductTestingSlice,
    globalConfig: globalConfigSlice,
    overdraftLoanOffers: overdraftLoanOffersSlice,
    validation: validationSlice,
    reportingConfig: reportingConfigSlice,
    reports: reportsSlice,
    auth: authSlice,
    notification: notificationSlice,
  },
});

export default store;
