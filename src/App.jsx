import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Group = lazy(() => import("./components/Group/Group"));
const Product = lazy(() => import("./components/Product"));
const Scheme = lazy(() => import("./components/Scheme"));
const Notifications = lazy(() => import("./components/Notifications"));
const SlideNav = lazy(() => import("./components/SlideNav"));
const CashLoan = lazy(() => import("./components/CashLoan"));
const CreditScore = lazy(() => import("./components/CreditScore"));
const LoanProductConfig = lazy(() => import("./components/LoanProductConfig"));
const DebtBurdenConfig = lazy(() => import("./components/DebtBurdenConfig"));
const CreditPolicy = lazy(() => import("./components/CreditPolicy"));
const GlobalConfig = lazy(() =>
  import("./components/GlobalConfig/GlobalConfig")
);
const GcCreditPolicy = lazy(() =>
  import("./components/GlobalConfig/GcCreditPolicy")
);
const CustomerCare = lazy(() =>
  import("./components/CustomerCare/CustomerCare")
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
const SystemConfig = lazy(() =>
  import("./components/GlobalConfig/SystemConfig")
);
const GroupComponent = lazy(() => import("./components/Group/GroupComponent"));
const GroupComponent2 = lazy(() =>
  import("./components/Group/GroupComponent2")
);
const GroupComponent3 = lazy(() =>
  import("./components/Group/GroupComponent3")
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
const NewProjectPage = lazy(() =>
  import("./components/Project/NewProjectPage")
);
const UserPage = lazy(() => import("./components/NewUser/UserPage"));
const UserInfoTabs = lazy(() => import("./components/NewUser/UserInfoTabs"));
const UserInfo = lazy(() => import("./components/NewUser/UserInfo"));
const Disbursement = lazy(() => import("./components/NewUser/Disbursement"));
const Register = lazy(() => import("./components/NewUser/Register"));
const InstallmentInfoComp = lazy(() =>
  import("./components/NewUser/InstallmentInfoComp")
);
const LoanConfigDD = lazy(() => import("./components/NewUser/LoanConfigDD"));
const BlockedEmployer = lazy(() => import("./components/BlockedEmployer"));
const Repayment = lazy(() => import("./components/NewUser/Repayments"));
const FamilyDetails = lazy(() => import("./components/NewUser/FamilyDetails"));
const EmploymentDetails = lazy(() =>
  import("./components/NewUser/EmploymentDetails")
);
const CreateProduct = lazy(() => import("./components/CreateProduct"));
const TclComponent1 = lazy(() => import("./components/Tcl/TclComponent1"));
const TclComponent2 = lazy(() => import("./components/Tcl/TclComponent2"));
const TclComponent3 = lazy(() => import("./components/Tcl/TclComponent3"));
const Ledger = lazy(() => import("./components/Ledger/Ledger"));
const TestComponent = lazy(() =>
  import("./components/TestComponent/TestComponent")
);
const AppLayout = lazy(() => import("./components/AppLayout/AppLayout"));

const LoadingState = lazy(() => import("./components/LoadingState"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TclPage = lazy(() => import("./pages/TclPage"));
const RacPage = lazy(() => import("./pages/RacPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/rac", element: <RacPage /> },
      { path: "/tcl", element: <TclPage /> },
      { path: "/tcl/1", element: <TclComponent1 /> },
      { path: "/tcl/2", element: <TclComponent2 /> },
      { path: "/tcl/3", element: <TclComponent3 /> },
      { path: "/group", element: <Group /> },
      { path: "group/1", element: <GroupComponent /> },
      { path: "group/2", element: <GroupComponent2 /> },
      { path: "group/3", element: <GroupComponent3 /> },
      { path: "/project/:projectId", element: <LoanForm /> },
      { path: "/project/loan-form", element: <ProjectPage /> },
      { path: "/project/newProject", element: <NewProjectPage /> },
      { path: "/business-rule/1", element: <BpmnComponent /> },
      { path: "/business-rule/2", element: <BpmnComponent2 /> },
      { path: "/business-rule/3", element: <BpmnComponent3 /> },
      { path: "/create-rac", element: <CreateRac /> },
      { path: "/newrac/:racID", element: <NewCreatedRAC /> },
      { path: "/product", element: <Product /> },
      { path: "/create-product", element: <CreateProduct /> },
      {
        path: "/product/:productType",
        element: <CashLoan />,
        children: [
          {
            path: "credit-score/:projectId/:loanProId",
            element: <CreditScore />,
          },
          {
            path: "loan-product-config/:projectId/:loanProId",
            element: <LoanProductConfig />,
          },
          {
            path: "debt-burden-config/:projectId/:loanProId",
            element: <DebtBurdenConfig />,
          },
          {
            path: "credit-policy/:projectId/:loanProId",
            element: <CreditPolicy />,
          },
          {
            path: "blocked-employer/:projectId/:loanProId",
            element: <BlockedEmployer />,
          },
        ],
      },
      {
        path: "/global-config",
        element: <GlobalConfig />,
        children: [
          { path: "cp", element: <GcCreditPolicy /> },
          { path: "liability-matrix", element: <LiabilitiesMatrix /> },
          { path: "risk-grade-cal", element: <RiskGradeCal /> },
          { path: "bare-min-exp", element: <BareMinimumExp /> },
          { path: "notification-text", element: <NotificationText /> },
          { path: "system-config", element: <SystemConfig /> },
        ],
      },
      { path: "/scheme", element: <Scheme /> },
      { path: "/notification", element: <Notifications /> },
      { path: "/customer-care", element: <CustomerCare /> },
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
      { path: "/user", element: <UserPage /> },
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
      { path: "/ledger", element: <Ledger /> },
      { path: "/slidenav", element: <SlideNav /> },
      { path: "/test", element: <TestComponent /> },
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
