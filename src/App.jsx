import React, { Suspense, lazy } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


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
//const HomePage = lazy(() => import("./pages/HomePage"));
const HomePage = lazy(() => import("./components/Dashboard/Dashboard"));
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
  import("./components/TestComponent/TestComponent")
);

// *************************************TEST******************************************************

// RAC Imports
const RacPage = lazy(() => import("./pages/RacPage"));
const DynamicRacPage = lazy(() => import("./pages/DynamicRacPage"));
const DynamicRAC = lazy(() => import("./components/DynamicRAC/DynamicRAC"));

// DRL Ruleset Imports
const DrlRulesetPage = lazy(() => import("./pages/DRLRulesetPage"));
const DRLRuleset = lazy(() => import("./components/DRLRuleset/DRLRuleset"));
const BasicInfo = lazy(() => import("./components/DRLRuleset/BasicInfo"));
const RuleManager = lazy(() => import("./components/DRLRuleset/RuleManager"));

// Recovery Imports
const RecoveryPage = lazy(() => import("./pages/RecoveryPage"));
const RecoveryConfig = lazy(() =>
  import("./components/Recovery/RecoveryConfig")
);

// Affordibility Imports
const AffordabilityPage = lazy(() => import("./pages/AffordabilityPage"));
const Affordability = lazy(() =>
  import("./components/Affordability/Affordability")
);

// Employer Imports
const Employer = lazy(() => import("./components/Employer/Employer"));

// Banks Imports
const Banks = lazy(() => import("./components/Banks/Banks"));

// Approval Config Imports
const LoanApprovalPage = lazy(() => import("./pages/LoanApprovalPage"));
const LoanApproval = lazy(() =>
  import("./components/LoanApproval/LoanApproval")
);

// Document Config Imports
const DocumentConfigPage = lazy(() => import("./pages/DocumentConfigPage"));
const DocumentConfig = lazy(() =>
  import("./components/DocumentConfig/DocumentConfig")
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
const BasicDetails = lazy(() => import("./components/Project/BasicDetails"));
const InterestCapping = lazy(() =>
  import("./components/Project/InterestCapping")
);
const RollOver = lazy(() => import("./components/Project/RollOver"));
const LatePenalty = lazy(() => import("./components/Project/LatePenalty"));
const RecurringFees = lazy(() => import("./components/Project/RecurringFees"));
const GracePeriod = lazy(() => import("./components/Project/GracePeriod"));
const AdditionalSettings = lazy(() =>
  import("./components/Project/AdditionalSettings")
);

// Product Imports
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CreateNewProduct = lazy(() =>
  import("./components/Product/CreateNewProduct")
);
const LoanProductConfig = lazy(() =>
  import("./components/Product/LoanProductConfig")
);
const ProductConfig = lazy(() => import("./components/Product/ProductConfig"));
const ProductEligibility = lazy(() =>
  import("./components/Product/Eligibility")
);
const UpfrontFee = lazy(() => import("./components/Product/UpfrontFee"));
const Options = lazy(() => import("./components/Product/Options"));
const InterestTenure = lazy(() =>
  import("./components/Product/InterestTenure")
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

// Product Testing KSA
const ProductTestingKSA = lazy(() =>
  import("./components/ProductTestingKSA/ProductTestingKSA")
);
const Step1Container = lazy(() =>
  import("./components/ProductTestingKSA/Step1/Step1Container")
);
const Step2Container = lazy(() =>
  import("./components/ProductTestingKSA/Step2/Step2Container")
);
const Step3Container = lazy(() =>
  import("./components/ProductTestingKSA/Step3/Step3Container")
);
const Step4Container = lazy(() =>
  import("./components/ProductTestingKSA/Step4/Step4Container")
);

// ProductTesting2 Imports
const ProductTesting2 = lazy(() =>
  import("./components/ProductTesting2/ProductTesting2")
);
const LoanOffersPT2 = lazy(() =>
  import("./components/ProductTesting2/LoanOffers")
);
const InspectionVerification = lazy(() =>
  import("./components/ProductTesting2/InspectionVerification")
);
const ApproveLoansPT2 = lazy(() =>
  import("./components/ProductTesting2/ApproveLoans")
);
const LoanApplicationPT2 = lazy(() =>
  import("./components/ProductTesting2/LoanApplication")
);
const AddLoansPT2 = lazy(() => import("./components/ProductTesting2/AddLoans"));
const LoanHistoryPT2 = lazy(() =>
  import("./components/ProductTesting2/LoanHistory")
);
const LoanAgreementPT2 = lazy(() =>
  import("./components/ProductTesting2/LoanAgreement")
);
const CollateralRegisterPT2 = lazy(() =>
  import("./components/ProductTesting2/CollateralRegister")
);

// Bank Statement Analyser Imports
const BankStatementAnalyzer = React.lazy(() =>
  import("./components/BankStatementAnalyzer/BankStatementAnalyzer")
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

//App Config imports
const AppConfig = lazy(() => import("./components/AppConfig/AppConfig"));

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

// LOS-Personal Imports

//------------Borrowers-----------------
const Borrowers = lazy(() =>
  import("./components/Los-Personal/Borrowers/Borrowers")
);
const AddBorrowers = lazy(() =>
  import("./components/Los-Personal/Borrowers/AddBorrowers")
);
const AddNewBorrower = lazy(() =>
  import("./components/Los-Personal/Borrowers/AddNewBorrower")
);
const ViewBorrowers = lazy(() =>
  import("./components/Los-Personal/Borrowers/ViewBorrowers")
);
const UpdateBorrower = lazy(() =>
  import("./components/Los-Personal/Borrowers/UpdateBorrower")
);
const AddBorrowersGroup = lazy(() =>
  import("./components/Los-Personal/Borrowers/AddBorrowersGroup")
);
const ViewBorrowersGroup = lazy(() =>
  import("./components/Los-Personal/Borrowers/ViewBorrowersGroup")
);

//------------Loans-----------------
const Loans = lazy(() => import("./components/Los-Personal/Loans/Loans"));
const LoanOffers = lazy(() =>
  import("./components/Los-Personal/Loans/LoanOffers")
);
const ApproveLoans = lazy(() =>
  import("./components/Los-Personal/Loans/ApproveLoans")
);
const LoanApplication = lazy(() =>
  import("./components/Los-Personal/Loans/LoanApplication")
);
const AddLoans = lazy(() => import("./components/Los-Personal/Loans/AddLoans"));
const LoanHistory = lazy(() =>
  import("./components/Los-Personal/Loans/LoanHistory")
);
const LoanAgreementPrint = lazy(() =>
  import("./components/Los-Personal/Loans/LoanAgreementPrint")
);
const LoanStatementPrint = lazy(() =>
  import("./components/Los-Personal/Loans/LoanStatementPrint")
);
const OutrightSettlementPrint = lazy(() =>
  import("./components/Los-Personal/Loans/OutrightSettlementPrint")
);
const DisbursementFilePrint = lazy(() =>
  import("./components/Los-Personal/Loans/DisbursementFilePrint")
);

//------------Repayments-----------------
const Repayments = lazy(() =>
  import("./components/Los-Personal/Repayments/Repayments")
);
const AddBulkRepayment = lazy(() =>
  import("./components/Los-Personal/Repayments/AddBulkRepayment")
);
const ApproveRepayment = lazy(() =>
  import("./components/Los-Personal/Repayments/ApproveRepayment")
);
const UploadRepayment = lazy(() =>
  import("./components/Los-Personal/Repayments/UploadRepayment")
);

//------------Refund-----------------
const Refund = lazy(() => import("./components/Los-Personal/Refund/Refund"));
const RefundApplication = lazy(() =>
  import("./components/Los-Personal/Refund/RefundApplication")
);
const AddRefund = lazy(() =>
  import("./components/Los-Personal/Refund/AddRefund")
);
const ApproveRefunds = lazy(() =>
  import("./components/Los-Personal/Refund/ApproveRefunds")
);
const RefundFormPrint = lazy(() =>
  import("./components/Los-Personal/Refund/RefundFormPrint")
);
const RefundHistory = lazy(() =>
  import("./components/Los-Personal/Refund/RefundHistory")
);

// LOS-SME Imports
const BorrowersSME = lazy(() =>
  import("./components/Los-SME/Borrowers/Borrowers")
);
const AddCompany = lazy(() =>
  import("./components/Los-SME/Borrowers/AddCompany")
);
const AddNewCompany = lazy(() =>
  import("./components/Los-SME/Borrowers/AddNewCompany")
);
const AddDirector = lazy(() =>
  import("./components/Los-SME/Borrowers/AddDirector")
);
const AddShareHolder = lazy(() =>
  import("./components/Los-SME/Borrowers/AddShareHolder")
);
const AddDocuments = lazy(() =>
  import("./components/Los-SME/Borrowers/AddDocuments")
);
const ViewCompany = lazy(() =>
  import("./components/Los-SME/Borrowers/ViewCompany")
);
const UpdateCompany = lazy(() =>
  import("./components/Los-SME/Borrowers/UpdateCompany")
);
const UpdateDirector = lazy(() =>
  import("./components/Los-SME/Borrowers/UpdateDirector")
);
const UpdateShareholder = lazy(() =>
  import("./components/Los-SME/Borrowers/UpdateShareholder")
);

//------------Loans-----------------
const LoansSME = lazy(() => import("./components/Los-SME/Loans/Loans"));
const LoanOffersSME = lazy(() =>
  import("./components/Los-SME/Loans/LoanOffers")
);
const ApproveLoansSME = lazy(() =>
  import("./components/Los-SME/Loans/ApproveLoans")
);
const LoanApplicationSME = lazy(() =>
  import("./components/Los-SME/Loans/LoanApplication")
);
const AddLoansSME = lazy(() => import("./components/Los-SME/Loans/AddLoans"));
const LoanHistorySME = lazy(() =>
  import("./components/Los-SME/Loans/LoanHistory")
);
const LoanAgreementPrintSME = lazy(() =>
  import("./components/Los-SME/Loans/LoanAgreementPrint")
);
const LoanStatementPrintSME = lazy(() =>
  import("./components/Los-SME/Loans/LoanStatementPrint")
);
const OutrightSettlementPrintSME = lazy(() =>
  import("./components/Los-SME/Loans/OutrightSettlementPrint")
);
const DisbursementFilePrintSME = lazy(() =>
  import("./components/Los-SME/Loans/DisbursementFilePrint")
);
//------------Repayments-----------------
const RepaymentsSME = lazy(() =>
  import("./components/Los-SME/Repayments/Repayments")
);
const AddBulkRepaymentSME = lazy(() =>
  import("./components/Los-SME/Repayments/AddBulkRepayment")
);
const ApproveRepaymentSME = lazy(() =>
  import("./components/Los-SME/Repayments/ApproveRepayment")
);
const UploadRepaymentSME = lazy(() =>
  import("./components/Los-SME/Repayments/UploadRepayment")
);

// ---------------------- Workflow Management Imports ----------------------------
const WorkflowsPage = lazy(() => import("./pages/WorkflowsPage"));
const InstancesPage = lazy(() => import("./pages/InstancesPage"));
const IncidentsPage = lazy(() => import("./pages/IncidentsPage"));
const MyTasksPage = lazy(() => import("./pages/MyTasksPage"));

// ------------------------ Deposit Section Imports -----------------------------------

const AppLayoutDeposit = React.lazy(() =>
  import("./components/Deposit/AppLayoutDeposit/AppLayoutDeposit")
);
const CreateAccount = React.lazy(() =>
  import("./components/Deposit/Savings/CreateAccount")
);
const Summary = React.lazy(() =>
  import("./components/Deposit/Savings/Summary")
);
const SavingsPage = React.lazy(() => import("./pages/SavingsPage"));
const Accounts = React.lazy(() =>
  import("./components/Deposit/Savings/Accounts")
);
const UpdateProfile = React.lazy(() =>
  import("./components/Deposit/Savings/UpdateProfile")
);
const DepositAmount = React.lazy(() =>
  import("./components/Deposit/Savings/DepositAmount")
);
const WithdrawAmount = React.lazy(() =>
  import("./components/Deposit/Savings/WithdrawAmount")
);
const Transaction = React.lazy(() =>
  import("./components/Deposit/Savings/Transaction")
);
const Transfer = React.lazy(() =>
  import("./components/Deposit/Savings/Transfer")
);
const Self = React.lazy(() => import("./components/Deposit/Savings/Self"));
const Internal = React.lazy(() =>
  import("./components/Deposit/Savings/Internal")
);


// ------------------------ Customer Loan B2C Section Imports -----------------------------------

import { ActiveTabProvider } from "./components/B2CCustomer/ActiveTabContext";  // Import the conte

const AppLayoutB2C = lazy(() => import("./components/B2CCustomer/B2CAppLayout/B2CAppLayout"));

const B2CLandingPage = React.lazy(() =>
  import("./components/B2CCustomer/B2CLandingPage")
);
const PreOfferOnBoarding = React.lazy(() =>
  import("./components/B2CCustomer/PreOfferOnboarding/PreOfferOnBoarding")
);
const PostOfferOnboarding = React.lazy(() =>
  import("./components/B2CCustomer/PostOfferOnboarding/PostOfferOnboarding")
);
const B2CLoanOfferLayoutScreen = React.lazy(() =>
  import("./components/B2CCustomer/B2CAppLayout/B2CLoanOfferLayout")
);
const B2CLoanOffers = React.lazy(() =>
  import("./components/B2CCustomer/B2CLoanOffers/B2CLoanOffers")
);
const LoanDetails = React.lazy(() =>
  import("./components/B2CCustomer/PostOfferOnboarding/LoanDetails")
);

const ThankYouPage = React.lazy(() =>
  import("./components/B2CCustomer/ThankYouPage")
);

const routes = [
  // Accessing All Main Components
  { path: "/login", element: <Login />, errorElement: <RouteErrorBoundary /> },

  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <RouteErrorBoundary />,
  },

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
        path: "drl-ruleset",
        element: <DrlRulesetPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "recovery",
        element: <RecoveryPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "affordability",
        element: <AffordabilityPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-approval",
        element: <LoanApprovalPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "document-config",
        element: <DocumentConfigPage />,
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
        path: "eligible-tenure",
        element: <CreditScoreETPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "dbr-config",
        element: <DebtBurdenPage />,
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
        path: "app-config",
        element: <AppConfig />,
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
      {
        path: "workflows",
        element: <WorkflowsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "instances",
        element: <InstancesPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "incidents",
        element: <IncidentsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "my-tasks",
        element: <MyTasksPage />,
        errorElement: <RouteErrorBoundary />,
      },

      // Accessing All Misc. Page Components
      {
        path: "settings",
        element: <UploadLogo />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "TestComponent",
        element: <TestComponent />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "notifications",
        element: <Notifications />,
        errorElement: <RouteErrorBoundary />,
      },

      // Accessing All Child Components
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
        children: [
          {
            path: "basic-details",
            element: <BasicDetails />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "interest-capping",
            element: <InterestCapping />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "roll-over",
            element: <RollOver />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "late-penalty",
            element: <LatePenalty />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "recurring-fees",
            element: <RecurringFees />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "grace-period",
            element: <GracePeriod />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "additional-settings",
            element: <AdditionalSettings />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "loan-product/:productType/:projectId/:loanProId",
        element: <LoanProductConfig />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "product-config",
            element: <ProductConfig />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "eligibility",
            element: <ProductEligibility />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "upfront-fee",
            element: <UpfrontFee />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "options",
            element: <Options />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "interest-tenure",
            element: <InterestTenure />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "eligible-tenure/:creditScoreETId",
        element: <CreditScoreET />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "dbr-config/:dbcTempId",
        element: <DebtBurdenConfig />,
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
        path: "affordability/:affordabilityCriteriaTempId",
        element: <Affordability />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "employer",
        element: <Employer />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "banks",
        element: <Banks />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-approval/:approvalsConfigurationsTempId",
        element: <LoanApproval />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "document-config/:dynamicDocumentTempId",
        element: <DocumentConfig />,
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
        path: "drl-ruleset/:racId",
        element: <DRLRuleset />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "basic-info",
            element: <BasicInfo />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "rule-manager",
            element: <RuleManager />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
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
        children: [
          {
            path: "basic-details",
            element: <BasicDetails />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "interest-capping",
            element: <InterestCapping />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "roll-over",
            element: <RollOver />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "late-penalty",
            element: <LatePenalty />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "recurring-fees",
            element: <RecurringFees />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "grace-period",
            element: <GracePeriod />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "additional-settings",
            element: <AdditionalSettings />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "loan-product/newProduct/:productName",
        element: <CreateNewProduct />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "product-config",
            element: <ProductConfig />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "eligibility",
            element: <ProductEligibility />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "upfront-fee",
            element: <UpfrontFee />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "options",
            element: <Options />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "interest-tenure",
            element: <InterestTenure />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "reporting-config/newConfig/:RCName",
        element: <CreateNewReportingConfig />,
        errorElement: <RouteErrorBoundary />,
      },
      // Accessing All New Created Child Components
      {
        path: "loan-origination-system/sme/borrowers",
        element: <BorrowersSME />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "add-company",
            element: <AddCompany />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-new-company",
            element: <AddNewCompany />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-director",
            element: <AddDirector />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-shareholder",
            element: <AddShareHolder />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-documents",
            element: <AddDocuments />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "view-company",
            element: <ViewCompany />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "update-company/:uid",
            element: <UpdateCompany />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "update-company/draft/:borrowerProfileDraftId",
            element: <UpdateCompany />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "update-director/:uid",
            element: <UpdateDirector />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "update-shareholder/:uid",
            element: <UpdateShareholder />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "loan-origination-system/sme/loans",
        element: <LoansSME />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "loan-application",
            element: <LoanApplicationSME />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-loan/new/:loanApplicationId",
            element: <AddLoansSME />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-loan/:loanApplicationId",
            element: <AddLoansSME />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-loan/new/:loanApplicationId/:BorrowerId",
            element: <AddLoansSME />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-offers",
            element: <LoanOffersSME />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "approve-loans",
            element: <ApproveLoansSME />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-history",
            element: <LoanHistorySME />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-history/:uniqueID",
            element: <LoanHistorySME />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "loan-origination-system/sme/repayments",
        element: <RepaymentsSME />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "add-bulk-repayment",
            element: <AddBulkRepaymentSME />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "upload-repayment",
            element: <UploadRepaymentSME />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "approve-repayment",
            element: <ApproveRepaymentSME />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "loan-origination-system/personal/borrowers",
        element: <Borrowers />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "add-borrower",
            element: <AddBorrowers />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-new-borrower",
            element: <AddNewBorrower />,
            errorElement: <RouteErrorBoundary />,
          },
          // {
          //   path: "add-new-borrower/:borrowerProfileDraftId",
          //   element: <AddNewBorrower />,
          //   errorElement: <RouteErrorBoundary />,
          // },
          {
            path: "view-borrower",
            element: <ViewBorrowers />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "update-borrower/:uid",
            element: <UpdateBorrower />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "update-borrower/draft/:borrowerProfileDraftId",
            element: <UpdateBorrower />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-borrower-group",
            element: <AddBorrowersGroup />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "view-borrower-group",
            element: <ViewBorrowersGroup />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "loan-origination-system/personal/loans",
        element: <Loans />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "loan-application",
            element: <LoanApplication />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-loan/new/:loanApplicationId",
            element: <AddLoans />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-loan/:loanApplicationId",
            element: <AddLoans />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-loan/new/:loanApplicationId/:BorrowerId",
            element: <AddLoans />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-offers",
            element: <LoanOffers />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "approve-loans",
            element: <ApproveLoans />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-history",
            element: <LoanHistory />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-history/:uniqueID",
            element: <LoanHistory />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "loan-origination-system/personal/repayments",
        element: <Repayments />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "add-bulk-repayment",
            element: <AddBulkRepayment />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "upload-repayment",
            element: <UploadRepayment />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "approve-repayment",
            element: <ApproveRepayment />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "loan-origination-system/personal/refund",
        element: <Refund />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "refund-application",
            element: <RefundApplication />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-refund/new/:refundApplicationId",
            element: <AddRefund />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-refund/new/:refundApplicationId/:loanId/:uid",
            element: <AddRefund />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "add-refund/:refundApplicationId",
            element: <AddRefund />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "approve-refund",
            element: <ApproveRefunds />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "refund-history",
            element: <RefundHistory />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
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
      {
        path: "product-testing-KSA",
        element: <ProductTestingKSA />,
        children: [
          {
            path: "create-account",
            element: <Step1Container />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "pre-eligibility-check",
            element: <Step2Container />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "eligibility-verification",
            element: <Step3Container />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-application",
            element: <Step4Container />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "product-testing2",
        element: <ProductTesting2 />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: "loan-application",
            element: <LoanApplicationPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan/add-loan/new/:loanApplicationId",
            element: <AddLoansPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan/add-loan/:loanApplicationId",
            element: <AddLoansPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan/add-loan/new/:loanApplicationId/:BorrowerId",
            element: <AddLoansPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-offers",
            element: <LoanOffersPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "inspection-verification",
            element: <InspectionVerification />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "inspection-verification/:loanApplicationId",
            element: <InspectionVerification />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "approve-loans",
            element: <ApproveLoansPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-agreement/:loanApplicationId/:userId",
            element: <LoanAgreementPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-history",
            element: <LoanHistoryPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "loan-history/:uniqueID",
            element: <LoanHistoryPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "collateral-register",
            element: <CollateralRegisterPT2 />,
            errorElement: <RouteErrorBoundary />,
          },
        ],
      },
      {
        path: "bank-statement-analyzer",
        element: <BankStatementAnalyzer />,
        errorElement: <RouteErrorBoundary />,
      },
    ],
  },

  {
    path: "/deposit",
    element: (
      <PageErrorBoundary>
        <ProtectedRoute>
          <AppLayoutDeposit />
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
        path: "savings/create-account",
        element: <CreateAccount />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "savings/accounts",
        element: <SavingsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "savings/accounts/:userID",
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
          {
            path: "deposit-amount",
            element: <DepositAmount />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "withdraw-amount",
            element: <WithdrawAmount />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "transaction",
            element: <Transaction />,
            errorElement: <RouteErrorBoundary />,
          },
          {
            path: "transfer",
            element: <Transfer />,
            errorElement: <RouteErrorBoundary />,
            children: [
              {
                path: "self",
                element: <Self />,
                errorElement: <RouteErrorBoundary />,
              },
              {
                path: "internal",
                element: <Internal />,
                errorElement: <RouteErrorBoundary />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/loan-agreement/:loanApplicationId/:userId",
    element: <LoanAgreementPrint />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/loan-statement/:loanApplicationId/:userId",
    element: <LoanStatementPrint />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/outright-settlement/:loanApplicationId/:userId",
    element: <OutrightSettlementPrint />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/disbursement/:loanApplicationId/:userId",
    element: <DisbursementFilePrint />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/loan-agreement-sme/:loanApplicationId/:userId",
    element: <LoanAgreementPrintSME />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/loan-statement-sme/:loanApplicationId/:userId",
    element: <LoanStatementPrintSME />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/outright-settlement-sme/:loanApplicationId/:userId",
    element: <OutrightSettlementPrintSME />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/disbursement-sme/:loanApplicationId/:userId",
    element: <DisbursementFilePrintSME />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/refund-form/:refundProcessId",
    element: <RefundFormPrint />,
    errorElement: <RouteErrorBoundary />,
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

  //Lead Capture, Customer loan application Route
  {
    path: "/customer",
    element: (
      <PageErrorBoundary>
        <ProtectedRoute>
          <ActiveTabProvider>
            <AppLayoutB2C />
          </ActiveTabProvider>
        </ProtectedRoute>
      </PageErrorBoundary>
    ),

    children: [
      {
        path: "loan-application",
        element: <PreOfferOnBoarding />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-offers",
        element: <B2CLoanOfferLayoutScreen />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "loan-finalization",
        element: <PostOfferOnboarding />,
        errorElement: <RouteErrorBoundary />,
      },
       {
        path: "final-offers",
        element: <B2CLoanOffers/>,
        errorElement: <RouteErrorBoundary />,
      },
       {
        path: "final-loan",
        element: <LoanDetails/>,
        errorElement: <RouteErrorBoundary />,
      },
       {
        path: "thank-you",
        element: <ThankYouPage/>,
        errorElement: <RouteErrorBoundary />,
      },
    ],
  },
  {
    path: "/customer/home",
    element: <B2CLandingPage />,
    errorElement: <RouteErrorBoundary />,
  },

  // Catch-All Route for 404 Page Not Found
  { path: "*", element: <PageNotFound /> },
];

const appRouter = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ToastContainer />
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}
export default App;
