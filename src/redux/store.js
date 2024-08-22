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
    customerCare:borrowerSlice,
    productGroup: productGroupSlice,
    // rulePolicy: rulePolicySlice,
    ledger:ledgerSlice
  },
});

export default store;
