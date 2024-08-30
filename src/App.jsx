import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const RulePolicyPage = lazy(() => import("./pages/RulePolicyPage"));
const CreditScoreETPage = lazy(() => import("./pages/CreditScoreETPage"));
const CreditScoreEqPage = lazy(() => import("./pages/CreditScoreEqPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TclPage = lazy(() => import("./pages/TclPage"));
const RacPage = lazy(() => import("./pages/RacPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductGroupPage = lazy(() => import("./pages/ProductGroupPage"));
const CustomerCarePage = lazy(() => import("./pages/CustomerCarePage"));
const NewUserPage = lazy(() => import("./pages/UserProductTestingPage"));
const LedgerPage = lazy(() => import("./pages/LedgerPage"));
const RecoveryPage = lazy(() => import("./pages/RecoveryPage"));
const BlockedEmployerPage = lazy(() => import("./pages/BlockedEmployerPage"));
const DebtBurdenPage = lazy(() => import("./pages/DebtBurdenPage"));
const UserManagementPage = lazy(() => import("./pages/UserManagementPage"));

const CreateNewProject = lazy(() => import("./components/Project/CreateNewProject"));
const CreateNewProductGroup = lazy(() => import("./components/ProductGroup/CreateNewProductGroup"));
const TCLViewList = lazy(() => import("./components/TCLViewList/TCLViewList"));
const UploadLogo = lazy(() => import("./components/UploadLogo/UploadLogo"));
const NewRulePolicy = lazy(() => import("./components/RulePolicy/NewRulePolicy"));
const CreateNewCreditScore = lazy(() => import("./components/CreditScore/CreateNewCreditScore"));
const CreditScoreET = lazy(() => import("./components/CreditScoreET/CreditScoreET"));


const RecoveryConfig = lazy(() =>
  import("./components/Recovery/RecoveryConfig")
);
const Notifications = lazy(() =>
  import("./components/Notifications/Notifications")
);
const LoanProductConfig = lazy(() =>
  import("./components/Product/LoanProductConfig")
);
const DebtBurdenConfig = lazy(() =>
  import("./components/DebtBurdenConfig/DebtBurdenConfig")
);

const PersonalInfo = lazy(() =>
  import("./components/CustomerCare/PersonalInfo")
);
const LiabilitiesMatrix = lazy(() =>
  import("./components/GlobalConfig/LiabilitiesMatrix")
);
const RiskGradeMatrix = lazy(() =>
  import("./components/GlobalConfig/RiskGradeMatrix")
);
const MinimumExpense = lazy(() =>
  import("./components/GlobalConfig/MinimumExpense")
);
const NotificationText = lazy(() =>
  import("./components/GlobalConfig/NotificationText")
);
const ProductGroup = lazy(() =>
  import("./components/ProductGroup/ProductGroup")
);

const CustomerCare = lazy(() =>
  import("./components/CustomerCare/CustomerCare")
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
const Login = lazy(() => import("./components/Login/Login"));
const Project = lazy(() => import("./components/Project/Project"));
const NewCreatedRAC = lazy(() => import("./components/RAC/NewCreatedRAC"));
const BusinessRule1 = lazy(() =>
  import("./components/BusinessRule/BusinessRule1")
);
const BusinessRule2 = lazy(() =>
  import("./components/BusinessRule/BusinessRule2")
);
const BusinessRule3 = lazy(() =>
  import("./components/BusinessRule/BusinessRule3")
);

const UserProductTesting = lazy(() => import("./components/UserProductTesting/UserProductTesting"));
const Eligibility = lazy(() => import("./components/UserProductTesting/Eligibility"));
const DisbursementStatus = lazy(() => import("./components/UserProductTesting/DisbursementStatus"));
const Register = lazy(() => import("./components/UserProductTesting/Register"));
const InstallmentSummery = lazy(() =>
  import("./components/UserProductTesting/InstallmentSummery")
);
const LoanConfig = lazy(() => import("./components/UserProductTesting/LoanConfig"));
const BlockedEmployer = lazy(() =>
  import("./components/BlockedEmployer/BlockedEmployer")
);
const BackendRepayment = lazy(() => import("./components/UserProductTesting/BackendRepayment"));
const FamilyDetails = lazy(() => import("./components/UserProductTesting/FamilyDetails"));
const CreateNewProduct = lazy(() => import("./components/Product/CreateNewProduct"));
const EmploymentDetails = lazy(() =>
  import("./components/UserProductTesting/EmploymentDetails")
);
const AppLayout = lazy(() => import("./components/AppLayout/AppLayout"));
const TestComponent = lazy(() =>
  import("./components/TestComponent/TestComponent")
);
const LoadingState = lazy(() =>
  import("./components/LoadingState/LoadingState")
);

const routes = [

  // Accessing All Main Components
  { path: "/login", element: <Login />, errorElement: <ErrorBoundary /> },

  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Accessing All Page Components
      { path: "/", element: <HomePage />, errorElement: <ErrorBoundary /> },
      { path: "/rac", element: <RacPage />, errorElement: <ErrorBoundary /> },
      { path: "/recovery", element: <RecoveryPage />, errorElement: <ErrorBoundary /> },
      { path: "/tcl", element: <TclPage />, errorElement: <ErrorBoundary /> },
      { path: "/project", element: <ProjectPage />, errorElement: <ErrorBoundary /> },
      { path: "/product", element: <ProductPage />, errorElement: <ErrorBoundary /> },
      { path: "/credit-score-eligible-tenure", element: <CreditScoreETPage />, errorElement: <ErrorBoundary /> },
      { path: "/dbr-config", element: <DebtBurdenPage />, errorElement: <ErrorBoundary /> },
      { path: "/blocked-employer", element: <BlockedEmployerPage />, errorElement: <ErrorBoundary /> },
      { path: "/credit-score", element: <CreditScoreEqPage />, errorElement: <ErrorBoundary /> },
      { path: "/rule-policy", element: <RulePolicyPage /> },
      { path: "/product-group", element: <ProductGroupPage />, errorElement: <ErrorBoundary /> },
      { path: "/customer-care", element: <CustomerCarePage />, errorElement: <ErrorBoundary /> },
      { path: "/user-product-testing", element: <NewUserPage />, errorElement: <ErrorBoundary /> },
      { path: "/general-ledger", element: <LedgerPage />, errorElement: <ErrorBoundary /> },
      { path: "/user-management", element: <UserManagementPage />, errorElement: <ErrorBoundary /> },

      // Accessing All Misc. Page Components
      { path: "/settings", element: <UploadLogo />, errorElement: <ErrorBoundary /> },
      { path: "/test", element: <TestComponent />, errorElement: <ErrorBoundary /> },
      { path: "/notification", element: <Notifications />, errorElement: <ErrorBoundary /> },


      // Accessing All Child Components
      { path: "/rac/:racID", element: <NewCreatedRAC />, errorElement: <ErrorBoundary /> },
      { path: "/recovery/:recoveryEquationTempId", element: <RecoveryConfig />, errorElement: <ErrorBoundary /> },
      { path: "/tcl/:tclId", element: <TCLViewList />, errorElement: <ErrorBoundary /> },
      { path: "/project/:projectId", element: <Project />, errorElement: <ErrorBoundary /> },
      { path: "/product/:productType/loan-product-config/:projectId/:loanProId", element: <LoanProductConfig />, errorElement: <ErrorBoundary /> },
      { path: "/credit-score-eligible-tenure/:creditScoreETId", element: <CreditScoreET />, errorElement: <ErrorBoundary /> },
      { path: "/dbr-config/:dbcTempId", element: <DebtBurdenConfig />, errorElement: <ErrorBoundary /> },
      { path: "/blocked-employer/:blockEmployersTempId", element: <BlockedEmployer />, errorElement: <ErrorBoundary /> },
      { path: "/rule-policy/:rulePolicyId", element: <NewRulePolicy />, errorElement: <ErrorBoundary /> },
      { path: "/product-group/:configId", element: <ProductGroup />, errorElement: <ErrorBoundary /> },
      { path: "/business-rule/1", element: <BusinessRule1 />, errorElement: <ErrorBoundary /> },
      { path: "/business-rule/2", element: <BusinessRule2 />, errorElement: <ErrorBoundary /> },
      { path: "/business-rule/3", element: <BusinessRule3 />, errorElement: <ErrorBoundary /> },
      { path: "/global-config/liabilities-matrix", element: <LiabilitiesMatrix />, errorElement: <ErrorBoundary /> },
      { path: "/global-config/risk-grading-matrix", element: <RiskGradeMatrix />, errorElement: <ErrorBoundary /> },
      { path: "/global-config/min-expense", element: <MinimumExpense />, errorElement: <ErrorBoundary /> },
      { path: "/global-config/notification-text", element: <NotificationText />, errorElement: <ErrorBoundary /> },
      
      
      // Accessing All New Created Child Components
      { path: "/credit-score/:creditScoreId", element: <CreateNewCreditScore />, errorElement: <ErrorBoundary /> },
      { path: "/product-group/newProductGroup/:configId", element: <CreateNewProductGroup />, errorElement: <ErrorBoundary /> },
      { path: "/project/newProject/:projectName", element: <CreateNewProject />, errorElement: <ErrorBoundary /> },
      { path: "/product/newProduct/:productName", element: <CreateNewProduct />, errorElement: <ErrorBoundary /> },


      // Accessing All Page Component with it's Child Components
      {
        path: "/customer-care/:subID",
        element: <CustomerCare />,
        children: [
          { path: "personal-info", element: <PersonalInfo />, errorElement: <ErrorBoundary /> },
          { path: "kyc-details", element: <KYCDetails />, errorElement: <ErrorBoundary /> },
          { path: "credit-profile", element: <CreditProfile />, errorElement: <ErrorBoundary /> },
          { path: "loan-payment-history", element: <LoanNPaymentHist />, errorElement: <ErrorBoundary /> },
          { path: "rejection-history", element: <RejectionHistory />, errorElement: <ErrorBoundary /> },
          { path: "credit-bureau-details", element: <CreditBureauDetails />, errorElement: <ErrorBoundary /> },
        ],
      },
      {
        path: "/user-product-testing/:userID",
        element: <UserProductTesting />,
        children: [
          { path: "eligibilty", element: <Eligibility />, errorElement: <ErrorBoundary /> },
          { path: "register", element: <Register />, errorElement: <ErrorBoundary /> },
          { path: "loan-config", element: <LoanConfig />, errorElement: <ErrorBoundary /> },
          { path: "loan-config/:installIndex/installment/:loanType/:amount", element: <InstallmentSummery />, errorElement: <ErrorBoundary /> },
          { path: "disbursement-status", element: <DisbursementStatus />, errorElement: <ErrorBoundary /> },
          { path: "backend-repayment", element: <BackendRepayment />, errorElement: <ErrorBoundary /> },
          { path: "family-details", element: <FamilyDetails />, errorElement: <ErrorBoundary /> },
          { path: "employment-details", element: <EmploymentDetails />, errorElement: <ErrorBoundary /> },
        ],
      },
    ],
  },
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
