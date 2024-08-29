// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Slices/sidebarSlice";
import recoverySlice from "./Slices/recoverySlice";
import tclSlice from "./Slices/tclSlice";
import projectSlice from "./Slices/projectSlice";
import productSlice from "./Slices/productSlice";
import beSlice from "./Slices/beSlice";
import dbrSlice from "./Slices/dbrSlice";
import creditScoreSlice from "./Slices/creditScoreSlice";
import borrowerSlice from "./Slices/borrowerSlice";
import productGroupSlice from "./Slices/productGroupSlice";
import ledgerSlice from "./Slices/ledgerSlice";
import userManagementSlice from "./Slices/userManagementSlice";
import creditScoreETSlice from "./Slices/creditScoreETSlice";
import userProductTestingSlice from "./Slices/userProductTestingSlice";
import liabilitiesMatrixSlice from "./Slices/liabilitiesMatrixSlice";
import riskGradeCalSlice from "./Slices/riskGradeCalSlice";
import bareMinimumExpSlice from "./Slices/bareMinimumExpSlice";
import notificationTextSlice from "./Slices/notificationTextSlice";
// import rulePolicySlice from "./Slices/rulePolicySlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    recovery: recoverySlice,
    tcl: tclSlice,
    project: projectSlice,
    product: productSlice,
    blockedEmployer: beSlice,
    dbrConfig: dbrSlice,
    creditScore: creditScoreSlice,
    customerCare: borrowerSlice,
    productGroup: productGroupSlice,
    userManagement: userManagementSlice,
    creditScoreET: creditScoreETSlice,
    // rulePolicy: rulePolicySlice,
    ledger: ledgerSlice,
    userProductTesting: userProductTestingSlice,
    liabilitiesMatrix: liabilitiesMatrixSlice,
    riskGradeCal: riskGradeCalSlice,
    bareMinimumExp: bareMinimumExpSlice,
    notificationText: notificationTextSlice,
  },
});

export default store;
