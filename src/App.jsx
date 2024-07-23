import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const RulePolicyPage = lazy(() => import("./pages/RulePolicyPage"));
const UploadLogo = lazy(() => import("./components/UploadLogo/UploadLogo"));

const NewCreditPolicy = lazy(() =>
  import("./components/RulePolicy/NewCreditPolicy")
);
const NewCreatedCreditScore = lazy(() =>
  import("./components/CreditScore/NewCreatedCreditScore")
);
const CreditScoreEqPage = lazy(() => import("./pages/CreditScoreEqPage"));

const NewRecoveryConfig = lazy(() =>
  import("./components/Recovery/NewRecoveryConfig")
);
const RecoveryConfig = lazy(() =>
  import("./components/Recovery/RecoveryConfig")
);
const Notifications = lazy(() => import("./components/Notifications"));
const CashLoan = lazy(() => import("./components/CashLoan"));
const LoanProductConfig = lazy(() => import("./components/LoanProductConfig"));
const DebtBurdenConfig = lazy(() =>
  import("./components/DebtBurdenConfig/DebtBurdenConfig")
);
const GlobalConfig = lazy(() =>
  import("./components/GlobalConfig/GlobalConfig")
);

const SubscriberInfo = lazy(() =>
  import("./components/CustomerCare/SubscriberInfo")
);
const LiabilitiesMatrix = lazy(() =>
  import("./components/GlobalConfig/LiabilitiesMatrix")
);
const RiskGradeCal = lazy(() =>
  import("./components/GlobalConfig/RiskGradeCal")
);
const BareMinimumExp = lazy(() =>
  import("./components/GlobalConfig/BareMinimumExp")
);
const NotificationText = lazy(() =>
  import("./components/GlobalConfig/NotificationText")
);
const ProductGroup = lazy(() =>
  import("./components/ProductGroup/ProductGroup")
);

const BorrowerInfoTabs = lazy(() =>
  import("./components/CustomerCare/BorrowerInfoTabs")
);
const KYCDetails = lazy(() => import("./components/CustomerCare/KYCDetails"));
const CreditProfile = lazy(() =>
  import("./components/CustomerCare/CreditProfile")
);
const LoanNPaymentHist = lazy(() =>
  import("./components/CustomerCare/LoanNPaymentHis")
);
const RejectionHistory = lazy(() =>
  import("./components/CustomerCare/RejectionHistory")
);
const CreditBureauDetails = lazy(() =>
  import("./components/CustomerCare/CreditBureauDetails")
);
const Login = lazy(() => import("./components/Login"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const LoanForm = lazy(() => import("./components/Project/LoanForm"));
const CreateRac = lazy(() => import("./components/RAC/CreateRac"));
const NewCreatedRAC = lazy(() => import("./components/RAC/NewCreatedRAC"));
const BpmnComponent = lazy(() =>
  import("./components/BusinessRule/BpmnComponent")
);
const BpmnComponent2 = lazy(() =>
  import("./components/BusinessRule/BpmnComponent2")
);
const BpmnComponent3 = lazy(() =>
  import("./components/BusinessRule/BpmnComponent3")
);

const UserInfoTabs = lazy(() => import("./components/NewUser/UserInfoTabs"));
const UserInfo = lazy(() => import("./components/NewUser/UserInfo"));
const Disbursement = lazy(() => import("./components/NewUser/Disbursement"));
const Register = lazy(() => import("./components/NewUser/Register"));
const InstallmentInfoComp = lazy(() =>
  import("./components/NewUser/InstallmentInfoComp")
);
const LoanConfigDD = lazy(() => import("./components/NewUser/LoanConfigDD"));
const BlockedEmployer = lazy(() =>
  import("./components/BlockedEmployer/BlockedEmployer")
);
const Repayment = lazy(() => import("./components/NewUser/Repayments"));
const FamilyDetails = lazy(() => import("./components/NewUser/FamilyDetails"));
const EmploymentDetails = lazy(() =>
  import("./components/NewUser/EmploymentDetails")
);
const CreateProduct = lazy(() => import("./components/CreateProduct"));
const TestComponent = lazy(() =>
  import("./components/TestComponent/TestComponent")
);
const AppLayout = lazy(() => import("./components/AppLayout/AppLayout"));
const LoadingState = lazy(() => import("./components/LoadingState"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TclPage = lazy(() => import("./pages/TclPage"));
const RacPage = lazy(() => import("./pages/RacPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductGroupPage = lazy(() => import("./pages/ProductGroupPage"));
const CustomerCarePage = lazy(() => import("./pages/CustomerCarePage"));
const NewUserPage = lazy(() => import("./pages/UserProductTestingPage"));
const LedgerPage = lazy(() => import("./pages/LedgerPage"));
const CreateNew = lazy(() => import("./components/Common/CreateNew/CreateNew"));
const TCLViewList = lazy(() => import("./components/TCLViewList/TCLViewList"));
const NewProjectPage = lazy(() =>
  import("./components/Project/NewProjectPage")
);
const RecoveryPage = lazy(() => import("./pages/RecoveryPage"));
const BlockedEmployerPage = lazy(() => import("./pages/BlockedEmployerPage"));
const DebtBurdenPage = lazy(() => import("./pages/DebtBurdenPage"));
const CreateProdGroup = lazy(() =>
  import("./components/ProductGroup/CreateProdGroup")
);

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/rac", element: <RacPage /> },
      { path: "/create-rac", element: <CreateRac /> },
      { path: "/newrac/:racID", element: <NewCreatedRAC /> },
      { path: "/dbc", element: <DebtBurdenPage /> },
      { path: "/blocked-employer", element: <BlockedEmployerPage /> },
      { path: "/recovery", element: <RecoveryPage /> },
      { path: "/recovery/1", element: <RecoveryConfig /> },
      { path: "/recovery/2", element: <RecoveryConfig /> },
      { path: "/recovery/3", element: <RecoveryConfig /> },
      { path: "/recovery/new/:recoveryName", element: <NewRecoveryConfig /> },
      { path: "/tcl", element: <TclPage /> },
      { path: "/tcl/:tclId", element: <TCLViewList /> },
      { path: "/project/projectPage", element: <ProjectPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/business-rule/1", element: <BpmnComponent /> },
      { path: "/business-rule/2", element: <BpmnComponent2 /> },
      { path: "/business-rule/3", element: <BpmnComponent3 /> },
      {
        path: "/product_group",
        element: <ProductGroupPage />,
      },
      {
        path: "/product_group/:configId",
        element: <ProductGroup />,
      },
      { path: "/product_group/new/:configId", element: <CreateProdGroup /> },
      { path: "/project/:projectId", element: <LoanForm /> },
      { path: "/project/newProject/:projectName", element: <NewProjectPage /> },
      { path: "/create-product/:productName", element: <CreateProduct /> },
      { path: "/newdbc/:dbcTempId", element: <DebtBurdenConfig /> },
      { path: "/test", element: <TestComponent /> },
      { path: "/settings", element: <UploadLogo /> },
      {
        path: "/blocked-employer/:blockEmployersTempId",
        element: <BlockedEmployer />,
      },
      {
        path: "/product/:productType",
        element: <CashLoan />,
        children: [
          {
            path: "loan-product-config/:projectId/:loanProId",
            element: <LoanProductConfig />,
          },
        ],
      },
      {
        path: "/credit-score",
        element: <CreditScoreEqPage />,
      },
      {
        path: "/credit-score/:creditScoreId",
        element: <NewCreatedCreditScore />,
      },
      {
        path: "/rule-policy",
        element: <RulePolicyPage />,
      },
      {
        path: "/rule-policy/:rulePolicyId",
        element: <NewCreditPolicy />,
      },
      {
        path: "/global-config",
        element: <GlobalConfig />,
        children: [
          { path: "liability-matrix", element: <LiabilitiesMatrix /> },
          { path: "risk-grade-cal", element: <RiskGradeCal /> },
          { path: "bare-min-exp", element: <BareMinimumExp /> },
          { path: "notification-text", element: <NotificationText /> },
        ],
      },
      { path: "/notification", element: <Notifications /> },
      { path: "/customer-care", element: <CustomerCarePage /> },
      {
        path: "/borrower/:subID",
        element: <BorrowerInfoTabs />,
        children: [
          { path: "personal-info", element: <SubscriberInfo /> },
          { path: "kyc", element: <KYCDetails /> },
          { path: "credit-profile", element: <CreditProfile /> },
          { path: "loanNpayment", element: <LoanNPaymentHist /> },
          { path: "rejection-history", element: <RejectionHistory /> },
          { path: "credit-bureau-details", element: <CreditBureauDetails /> },
        ],
      },
      { path: "/user", element: <NewUserPage /> },
      {
        path: "/user/:userID",
        element: <UserInfoTabs />,
        children: [
          { path: "user-info", element: <UserInfo /> },
          { path: "register", element: <Register /> },
          { path: "loan-config", element: <LoanConfigDD /> },
          {
            path: "loan-config/:installIndex/installment",
            element: <InstallmentInfoComp />,
          },
          { path: "disbursement", element: <Disbursement /> },
          { path: "repayment", element: <Repayment /> },
          { path: "family-details", element: <FamilyDetails /> },
          { path: "employment-details", element: <EmploymentDetails /> },
        ],
      },
      { path: "/ledger", element: <LedgerPage /> },
      { path: "/test", element: <CreateNew /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
];
const appRouter = createBrowserRouter(routes);
function App() {
  return (
    <Suspense fallback={<LoadingState />}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}
export default App;
