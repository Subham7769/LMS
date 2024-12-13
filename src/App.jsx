import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from "./components/Reports/DatePicker";
import DepositAppLayout from "./components/Deposit/DepositAppLayout/DepositAppLayout";
import Deposit from "./components/Deposit/Deposit";
import CreateAccount from "./components/Deposit/Accounts/CreateAccount";
import Summary from "./components/Deposit/Accounts/Summary";
import AccountsPage from "./pages/AccountsPage";
import Accounts from "./components/Deposit/Accounts/Accounts";
import UpdateProfile from "./components/Deposit/Accounts/UpdateProfile";

// Error Handlers Imports
const PageNotFound = lazy(() => import("./pages/PageNotFoundPage"));
const AccessDeniedPage = lazy(() => import("./pages/AccessDeniedPage"));
const ProtectedRoute = lazy(() =>
  import("./components/Common/ProtectedRoute/ProtectedRoute")
);
const AppErrorBoundary = lazy(() =>
  import("./components/ErrorBoundary/AppErrorBoundary")
);
const PageErrorBoundary = lazy(() =>
  import("./components/ErrorBoundary/PageErrorBoundary")
);
const RouteErrorBoundary = lazy(() =>
  import("./components/ErrorBoundary/RouteErrorBoundary")
);
const SupportPage = lazy(() => import("./pages/SupportPage"));

// Misc. Imports
const Login = lazy(() => import("./components/Login/Login"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AppLayout = lazy(() => import("./components/AppLayout/AppLayout"));
const LoadingState = lazy(() =>
  import("./components/LoadingState/LoadingState")
);
const Notifications = lazy(() =>
  import("./components/Notifications/Notifications")
);
const UploadLogo = lazy(() => import("./components/UploadLogo/UploadLogo"));

// *************************************TEST******************************************************

const TestComponent = lazy(() =>
  import("./components/TestComponent/TestComponent11")
);

// *************************************TEST******************************************************

// RAC Imports
const RacPage = lazy(() => import("./pages/RacPage"));
const DynamicRacPage = lazy(() => import("./pages/DynamicRacPage"));
const DynamicRAC = lazy(() => import("./components/DynamicRAC/DynamicRAC"));
const NewCreatedRAC = lazy(() => import("./components/RAC/NewCreatedRAC"));

// Recovery Imports
const RecoveryPage = lazy(() => import("./pages/RecoveryPage"));
const RecoveryConfig = lazy(() =>
  import("./components/Recovery/RecoveryConfig")
);

// TCL Imports
const TclPage = lazy(() => import("./pages/TclPage"));
const TCLViewList = lazy(() => import("./components/TCLViewList/TCLViewList"));

// Project Imports
const Project = lazy(() => import("./components/Project/Project"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const CreateNewProject = lazy(() =>
  import("./components/Project/CreateNewProject")
);

// Product Imports
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CreateNewProduct = lazy(() =>
  import("./components/Product/CreateNewProduct")
);
const LoanProductConfig = lazy(() =>
  import("./components/Product/LoanProductConfig")
);

// CreditScoreET Imports
const CreditScoreETPage = lazy(() => import("./pages/CreditScoreETPage"));
const CreditScoreET = lazy(() =>
  import("./components/CreditScoreET/CreditScoreET")
);

// DebtBurdenConfig Imports
const DebtBurdenPage = lazy(() => import("./pages/DebtBurdenPage"));
const DebtBurdenConfig = lazy(() =>
  import("./components/DebtBurdenConfig/DebtBurdenConfig")
);

// BlockedEmployer Imports
const BlockedEmployerPage = lazy(() => import("./pages/BlockedEmployerPage"));
const BlockedEmployer = lazy(() =>
  import("./components/BlockedEmployer/BlockedEmployer")
);

// CreditScore Imports
const CreditScorePage = lazy(() => import("./pages/CreditScorePage"));
const CreateNewCreditScore = lazy(() =>
  import("./components/CreditScore/CreateNewCreditScore")
);

// RulePolicy Imports
const RulePolicyPage = lazy(() => import("./pages/RulePolicyPage"));
const RulePolicy = lazy(() => import("./components/RulePolicy/RulePolicy"));

// ProductGroup Imports
const ProductGroupPage = lazy(() => import("./pages/ProductGroupPage"));
const CreateNewProductGroup = lazy(() =>
  import("./components/ProductGroup/CreateNewProductGroup")
);
const ProductGroup = lazy(() =>
  import("./components/ProductGroup/ProductGroup")
);

// Customer care Imports
const CustomerCarePage = lazy(() => import("./pages/CustomerCarePage"));
const CustomerCare = lazy(() =>
  import("./components/CustomerCare/CustomerCare")
);
const PersonalInfo = lazy(() =>
  import("./components/CustomerCare/PersonalInfo")
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

// ProductTesting Imports
const TermLoanPage = lazy(() => import("./pages/TermLoanPage"));
const TermLoan = lazy(() =>
  import("./components/ProductTesting/TermLoan/TermLoan")
);
const Eligibility = lazy(() =>
  import("./components/ProductTesting/TermLoan/Eligibility")
);
const DisbursementStatus = lazy(() =>
  import("./components/ProductTesting/TermLoan/DisbursementStatus")
);
const Register = lazy(() =>
  import("./components/ProductTesting/TermLoan/Register")
);
const InstallmentSummery = lazy(() =>
  import("./components/ProductTesting/TermLoan/InstallmentSummery")
);
const LoanConfig = lazy(() =>
  import("./components/ProductTesting/TermLoan/LoanConfig")
);
const BackendRepayment = lazy(() =>
  import("./components/ProductTesting/TermLoan/BackendRepayment")
);
const FamilyDetails = lazy(() =>
  import("./components/ProductTesting/TermLoan/FamilyDetails")
);
const EmploymentDetails = lazy(() =>
  import("./components/ProductTesting/TermLoan/EmploymentDetails")
);

// GlobalConfig Imports
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

// Ledger Imports
const LedgerPage = lazy(() => import("./pages/LedgerPage"));

// User Management Imports
const UserManagementPage = lazy(() => import("./pages/UserManagementPage"));

// OverdraftLoan Imports
const OverdraftLoanPage = lazy(() => import("./pages/OverdraftLoanPage"));
const OverdraftLoan = lazy(() =>
  import("./components/ProductTesting/OverdraftLoan/OverdraftLoan")
);
const OverdraftOffer = lazy(() =>
  import("./components/ProductTesting/OverdraftLoan/OverdraftOffer")
);
const AccountDetails = lazy(() =>
  import("./components/ProductTesting/OverdraftLoan/AccountDetails")
);
const DebitAmount = lazy(() =>
  import("./components/ProductTesting/OverdraftLoan/DebitAmount")
);
const PayAmount = lazy(() =>
  import("./components/ProductTesting/OverdraftLoan/PayAmount")
);
const OverdraftDetailsTab = lazy(() =>
  import("./components/ProductTesting/OverdraftLoan/OverdraftDetailsTab")
);

// BusinessRule Imports
const BusinessRule1 = lazy(() =>
  import("./components/BusinessRule/BusinessRule1")
);
const BusinessRule2 = lazy(() =>
  import("./components/BusinessRule/BusinessRule2")
);
const BusinessRule3 = lazy(() =>
  import("./components/BusinessRule/BusinessRule3")
);

//Server Config imports
const ServerConfig = lazy(() =>
  import("./components/ServerConfig/ServerConfig")
);

// Reporting Config imports
const ReportingConfigPage = lazy(() => import("./pages/ReportingConfigPage"));
const ReportingConfig = lazy(() =>
  import("./components/ReportingConfig/ReportingConfig")
);
const CreateNewReportingConfig = lazy(() =>
  import("./components/ReportingConfig/CreateNewReportingConfig")
);

// Reports Section imports
const ReportsPage = lazy(() => import("./pages/ReportsPage"));

// Invoice Discounting Imports
const Registration = lazy(() =>
  import("./components/InvoiceDiscounting/Registration")
);
const ProfilePage = lazy(() =>
  import("./components/InvoiceDiscounting/ProfilePage")
);
const ManagePartner = lazy(() =>
  import("./components/InvoiceDiscounting/ManagePartner")
);
const CashPayable = lazy(() =>
  import("./components/InvoiceDiscounting/CashPayable")
);
const CashReceivable = lazy(() =>
  import("./components/InvoiceDiscounting/CashReceivable")
);
const WorkingCapital = lazy(() =>
  import("./components/InvoiceDiscounting/WorkingCapital")
);
const ProjectFinance = lazy(() =>
  import("./components/InvoiceDiscounting/ProjectFinance")
);

// LOS Imports
const Los = lazy(() => import("./components/Los/Los"));
const Borrowers = lazy(() => import("./components/Los/Borrowers/Borrowers"));
const Loans = lazy(() => import("./components/Los/Loans/Loans"));
const Repayments = lazy(() => import("./components/Los/Repayments/Repayments"));

const routes = [
  // Accessing All Main Components
  { path: "/login", element: <Login />, errorElement: <RouteErrorBoundary /> },

  { path: "/", element: <Login />, errorElement: <RouteErrorBoundary /> },

  {
    path: "/loan",
    element: (
      <PageErrorBoundary>
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </PageErrorBoundary>
    ),
    children: [
      // Accessing All Page Components
      {
        path: "home",
        element: <HomePage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "rac",
        element: <RacPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "dynamic-rac",
        element: <DynamicRacPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "recovery",
        element: <RecoveryPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "tcl",
        element: <TclPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "project",
        element: <ProjectPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-product",
        element: <ProductPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "credit-score-eligible-tenure",
        element: <CreditScoreETPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "dbr-config",
        element: <DebtBurdenPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "blocked-employer",
        element: <BlockedEmployerPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "credit-score",
        element: <CreditScorePage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "rule-policy",
        element: <RulePolicyPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "product-group",
        element: <ProductGroupPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "customer-care",
        element: <CustomerCarePage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "general-ledger",
        element: <LedgerPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "user-management",
        element: <UserManagementPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "server-config",
        element: <ServerConfig />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "reporting-config",
        element: <ReportingConfigPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
        errorElement: <RouteErrorBoundary />,
      },

      // Accessing All Misc. Page Components
      {
        path: "settings",
        element: <UploadLogo />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "test",
        element: <DatePicker />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "notifications",
        element: <Notifications />,
        errorElement: <RouteErrorBoundary />,
      },

      // Accessing All Child Components
      {
        path: "rac/:racID",
        element: <NewCreatedRAC />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "recovery/:recoveryEquationTempId",
        element: <RecoveryConfig />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "tcl/:tclId",
        element: <TCLViewList />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "project/:projectId",
        element: <Project />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-product/:productType/loan-product-config/:projectId/:loanProId",
        element: <LoanProductConfig />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "credit-score-eligible-tenure/:creditScoreETId",
        element: <CreditScoreET />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "dbr-config/:dbcTempId",
        element: <DebtBurdenConfig />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "blocked-employer/:blockEmployersTempId",
        element: <BlockedEmployer />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "rule-policy/:rulePolicyId",
        element: <RulePolicy />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "product-group/:configId",
        element: <ProductGroup />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "business-rule/1",
        element: <BusinessRule1 />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "business-rule/2",
        element: <BusinessRule2 />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "business-rule/3",
        element: <BusinessRule3 />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "global-config/liabilities-matrix",
        element: <LiabilitiesMatrix />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "global-config/risk-grading-matrix",
        element: <RiskGradeMatrix />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "global-config/min-expense",
        element: <MinimumExpense />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "global-config/notification-text",
        element: <NotificationText />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "product-testing/term-loan",
        element: <TermLoanPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "product-testing/overdraft-loan",
        element: <OverdraftLoanPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "dynamic-rac/:racId",
        element: <DynamicRAC />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "reporting-config/:RCName",
        element: <ReportingConfig />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "credit-score/:creditScoreId",
        element: <CreateNewCreditScore />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "product-group/newProductGroup/:configId",
        element: <CreateNewProductGroup />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "project/newProject/:projectName",
        element: <CreateNewProject />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-product/newProduct/:productName",
        element: <CreateNewProduct />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "reporting-config/newConfig/:RCName",
        element: <CreateNewReportingConfig />,
        errorElement: <RouteErrorBoundary />,
      },
      // Accessing All New Created Child Components
      {
        path: "invoice-discounting/registration",
        element: <Registration />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "invoice-discounting/profile",
        element: <ProfilePage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "invoice-discounting/manage-partner",
        element: <ManagePartner />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "invoice-discounting/cash-payable",
        element: <CashPayable />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "invoice-discounting/cash-receivable",
        element: <CashReceivable />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "invoice-discounting/working-capital",
        element: <WorkingCapital />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "invoice-discounting/project-finance",
        element: <ProjectFinance />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-origination-system",
        element: <Los />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-origination-system/borrowers",
        element: <Borrowers />,
        children: [
          {
            path: "personal-info",
            element: <PersonalInfo />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-origination-system/loans",
        element: <Loans />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-origination-system/repayments",
        element: <Repayments />,
        errorElement: <RouteErrorBoundary />,
      },
      // Accessing All Page Component with it's Child Components
      {
        path: "customer-care/:subID",
        element: <CustomerCare />,
        children: [
          {
            path: "personal-info",
            element: <PersonalInfo />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "kyc-details",
            element: <KYCDetails />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "credit-profile",
            element: <CreditProfile />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-payment-history",
            element: <LoanNPaymentHist />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "rejection-history",
            element: <RejectionHistory />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "credit-bureau-details",
            element: <CreditBureauDetails />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "product-testing/term-loan/:userID",
        element: <TermLoan />,
        children: [
          {
            path: "eligibilty",
            element: <Eligibility />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "register",
            element: <Register />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-config",
            element: <LoanConfig />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-config/:installIndex/installment/:loanType/:amount",
            element: <InstallmentSummery />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "disbursement-status",
            element: <DisbursementStatus />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "backend-repayment",
            element: <BackendRepayment />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "family-details",
            element: <FamilyDetails />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "employment-details",
            element: <EmploymentDetails />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "product-testing/overdraft-loan/:userID",
        element: <OverdraftLoan />,
        children: [
          {
            path: "overdraft-offer",
            element: <OverdraftOffer />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "account-details",
            element: <AccountDetails />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "debit-amount",
            element: <DebitAmount />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "pay-amount",
            element: <PayAmount />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "overdraft-details",
            element: <OverdraftDetailsTab />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
    ],
  },

  {
    path: "/deposit",
    element: (
      <PageErrorBoundary>
        <ProtectedRoute>
          <DepositAppLayout />
        </ProtectedRoute>
      </PageErrorBoundary>
    ),
    children: [
      {
        path: "home",
        element: <HomePage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "save/create-account",
        element: <CreateAccount />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "save/accounts",
        element: <AccountsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "save/accounts/:userID",
        element: <Accounts />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "summary",
            element: <Summary />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "update-profile",
            element: <UpdateProfile />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
    ],
  },

  // Access Denied Route
  {
    path: "/access-denied",
    element: <AccessDeniedPage />,
    errorElement: <RouteErrorBoundary />,
  },

  // Support Route
  {
    path: "/support",
    element: <SupportPage />,
    errorElement: <RouteErrorBoundary />,
  },

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
