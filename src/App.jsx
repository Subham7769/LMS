import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Error handlers
import PageNotFound from "./pages/PageNotFoundPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import ProtectedRoute from "./components/Common/ProtectedRoute/ProtectedRoute";
import AppErrorBoundary from "./components/ErrorBoundary/AppErrorBoundary"
import PageErrorBoundary from "./components/ErrorBoundary/PageErrorBoundary"
import RouteErrorBoundary from "./components/ErrorBoundary/RouteErrorBoundary";
import SupportPage from "./pages/SupportPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const RacPage = lazy(() => import("./pages/RacPage"));
const RecoveryPage = lazy(() => import("./pages/RecoveryPage"));
const TclPage = lazy(() => import("./pages/TclPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CreditScoreETPage = lazy(() => import("./pages/CreditScoreETPage"));
const DebtBurdenPage = lazy(() => import("./pages/DebtBurdenPage"));
const BlockedEmployerPage = lazy(() => import("./pages/BlockedEmployerPage"));
const CreditScorePage = lazy(() => import("./pages/CreditScorePage"));
const RulePolicyPage = lazy(() => import("./pages/RulePolicyPage"));
const ProductGroupPage = lazy(() => import("./pages/ProductGroupPage"));
const CustomerCarePage = lazy(() => import("./pages/CustomerCarePage"));
const UserProductTestingPage = lazy(() => import("./pages/UserProductTestingPage"));
const LedgerPage = lazy(() => import("./pages/LedgerPage"));
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
  { path: "/login", element: <Login />, errorElement: <RouteErrorBoundary /> },

  {
    path: "/",
    element: (
      <AppErrorBoundary>
        <ProtectedRoute>
          <PageErrorBoundary>
            <AppLayout />
          </PageErrorBoundary>
        </ProtectedRoute>
      </AppErrorBoundary>
    ),
    children: [
      // Accessing All Page Components
      { path: "/", element: <HomePage />, errorElement: <RouteErrorBoundary /> },
      { path: "/rac", element: <RacPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/recovery", element: <RecoveryPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/tcl", element: <TclPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/project", element: <ProjectPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/product", element: <ProductPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/credit-score-eligible-tenure", element: <CreditScoreETPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/dbr-config", element: <DebtBurdenPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/blocked-employer", element: <BlockedEmployerPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/credit-score", element: <CreditScorePage />, errorElement: <RouteErrorBoundary /> },
      { path: "/rule-policy", element: <RulePolicyPage /> },
      { path: "/product-group", element: <ProductGroupPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/customer-care", element: <CustomerCarePage />, errorElement: <RouteErrorBoundary /> },
      { path: "/user-product-testing", element: <UserProductTestingPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/general-ledger", element: <LedgerPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/user-management", element: <UserManagementPage />, errorElement: <RouteErrorBoundary /> },

      // Accessing All Misc. Page Components
      { path: "/settings", element: <UploadLogo />, errorElement: <RouteErrorBoundary /> },
      { path: "/test", element: <TestComponent />, errorElement: <RouteErrorBoundary /> },
      { path: "/notification", element: <Notifications />, errorElement: <RouteErrorBoundary /> },


      // Accessing All Child Components
      { path: "/rac/:racID", element: <NewCreatedRAC />, errorElement: <RouteErrorBoundary /> },
      { path: "/recovery/:recoveryEquationTempId", element: <RecoveryConfig />, errorElement: <RouteErrorBoundary /> },
      { path: "/tcl/:tclId", element: <TCLViewList />, errorElement: <RouteErrorBoundary /> },
      { path: "/project/:projectId", element: <Project />, errorElement: <RouteErrorBoundary /> },
      { path: "/product/:productType/loan-product-config/:projectId/:loanProId", element: <LoanProductConfig />, errorElement: <RouteErrorBoundary /> },
      { path: "/credit-score-eligible-tenure/:creditScoreETId", element: <CreditScoreET />, errorElement: <RouteErrorBoundary /> },
      { path: "/dbr-config/:dbcTempId", element: <DebtBurdenConfig />, errorElement: <RouteErrorBoundary /> },
      { path: "/blocked-employer/:blockEmployersTempId", element: <BlockedEmployer />, errorElement: <RouteErrorBoundary /> },
      { path: "/rule-policy/:rulePolicyId", element: <NewRulePolicy />, errorElement: <RouteErrorBoundary /> },
      { path: "/product-group/:configId", element: <ProductGroup />, errorElement: <RouteErrorBoundary /> },
      { path: "/business-rule/1", element: <BusinessRule1 />, errorElement: <RouteErrorBoundary /> },
      { path: "/business-rule/2", element: <BusinessRule2 />, errorElement: <RouteErrorBoundary /> },
      { path: "/business-rule/3", element: <BusinessRule3 />, errorElement: <RouteErrorBoundary /> },
      { path: "/global-config/liabilities-matrix", element: <LiabilitiesMatrix />, errorElement: <RouteErrorBoundary /> },
      { path: "/global-config/risk-grading-matrix", element: <RiskGradeMatrix />, errorElement: <RouteErrorBoundary /> },
      { path: "/global-config/min-expense", element: <MinimumExpense />, errorElement: <RouteErrorBoundary /> },
      { path: "/global-config/notification-text", element: <NotificationText />, errorElement: <RouteErrorBoundary /> },
      
      
      // Accessing All New Created Child Components
      { path: "/credit-score/:creditScoreId", element: <CreateNewCreditScore />, errorElement: <RouteErrorBoundary /> },
      { path: "/product-group/newProductGroup/:configId", element: <CreateNewProductGroup />, errorElement: <RouteErrorBoundary /> },
      { path: "/project/newProject/:projectName", element: <CreateNewProject />, errorElement: <RouteErrorBoundary /> },
      { path: "/product/newProduct/:productName", element: <CreateNewProduct />, errorElement: <RouteErrorBoundary /> },


      // Accessing All Page Component with it's Child Components
      {
        path: "/customer-care/:subID",
        element: <CustomerCare />,
        children: [
          { path: "personal-info", element: <PersonalInfo />, errorElement: <RouteErrorBoundary /> },
          { path: "kyc-details", element: <KYCDetails />, errorElement: <RouteErrorBoundary /> },
          { path: "credit-profile", element: <CreditProfile />, errorElement: <RouteErrorBoundary /> },
          { path: "loan-payment-history", element: <LoanNPaymentHist />, errorElement: <RouteErrorBoundary /> },
          { path: "rejection-history", element: <RejectionHistory />, errorElement: <RouteErrorBoundary /> },
          { path: "credit-bureau-details", element: <CreditBureauDetails />, errorElement: <RouteErrorBoundary /> },
        ],
      },
      {
        path: "/user-product-testing/:userID",
        element: <UserProductTesting />,
        children: [
          { path: "eligibilty", element: <Eligibility />, errorElement: <RouteErrorBoundary /> },
          { path: "register", element: <Register />, errorElement: <RouteErrorBoundary /> },
          { path: "loan-config", element: <LoanConfig />, errorElement: <RouteErrorBoundary /> },
          { path: "loan-config/:installIndex/installment/:loanType/:amount", element: <InstallmentSummery />, errorElement: <RouteErrorBoundary /> },
          { path: "disbursement-status", element: <DisbursementStatus />, errorElement: <RouteErrorBoundary /> },
          { path: "backend-repayment", element: <BackendRepayment />, errorElement: <RouteErrorBoundary /> },
          { path: "family-details", element: <FamilyDetails />, errorElement: <RouteErrorBoundary /> },
          { path: "employment-details", element: <EmploymentDetails />, errorElement: <RouteErrorBoundary /> },
        ],
      },
    ],
  },
  
  // Access Denied Route
  { path: "/access-denied", element: <AccessDeniedPage />, errorElement: <RouteErrorBoundary /> },

  // Support Route
  { path: "/support", element: <SupportPage />, errorElement: <RouteErrorBoundary /> },

  // Catch-All Route for 404 Page Not Found
  { path: "*", element: <PageNotFound /> },
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
