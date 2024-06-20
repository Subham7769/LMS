import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import Group from "./components/Group/Group";
import RAC from "./components/RAC/RAC";
import Product from "./components/Product";
import Scheme from "./components/Scheme";
import Notifications from "./components/Notifications";
import SlideNav from "./components/SlideNav";
import CashLoan from "./components/CashLoan";
import CreditScore from "./components/CreditScore";
import LoanProductConfig from "./components/LoanProductConfig";
import DebtBurdenConfig from "./components/DebtBurdenConfig";
import CreditPolicy from "./components/CreditPolicy";
import GlobalConfig from "./components/GlobalConfig/GlobalConfig";
import GcCreditPolicy from "./components/GlobalConfig/GcCreditPolicy";
import CustomerCare from "./components/CustomerCare/CustomerCare";
import SubscriberInfo from "./components/CustomerCare/SubscriberInfo";
import LiabilitiesMatrix from "./components/GlobalConfig/LiabilitiesMatrix";
import RiskGradeCal from "./components/GlobalConfig/RiskGradeCal";
import BareMinimumExp from "./components/GlobalConfig/BareMinimumExp";
import NotificationText from "./components/GlobalConfig/NotificationText";
import SystemConfig from "./components/GlobalConfig/SystemConfig";
import GroupComponent from "./components/Group/GroupComponent";
import GroupComponent2 from "./components/Group/GroupComponent2";
import GroupComponent3 from "./components/Group/GroupComponent3";
import BorrowerInfoTabs from "./components/CustomerCare/BorrowerInfoTabs";
import KYCDetails from "./components/CustomerCare/KYCDetails";
import CreditProfile from "./components/CustomerCare/CreditProfile";
import LoanNPaymentHist from "./components/CustomerCare/LoanNPaymentHis";
import RejectionHistory from "./components/CustomerCare/RejectionHistory";
import CreditBureauDetails from "./components/CustomerCare/CreditBureauDetails";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import LoanForm from "./components/Project/LoanForm";
import CreateRac from "./components/RAC/CreateRac";
import NewCreatedRAC from "./components/RAC/NewCreatedRAC";
import BpmnComponent from "./components/BusinessRule/BpmnComponent";
import BpmnComponent2 from "./components/BusinessRule/BpmnComponent2";
import BpmnComponent3 from "./components/BusinessRule/BpmnComponent3";
import ProjectPage from "./components/Project/ProjectPage";
import NewProjectPage from "./components/Project/NewProjectPage";
import UserPage from "./components/NewUser/UserPage";
import UserInfoTabs from "./components/NewUser/UserInfoTabs";
import UserInfo from "./components/NewUser/UserInfo";
import Disbursement from "./components/NewUser/Disbursement";
import Register from "./components/NewUser/Register";
import InstallmentInfoComp from "./components/NewUser/InstallmentInfoComp";
import LoanConfigDD from "./components/NewUser/LoanConfigDD";
import BlockedEmployer from "./components/BlockedEmployer";
import Repayment from "./components/NewUser/Repayments";
import FamilyDetails from "./components/NewUser/FamilyDetails";
import EmploymentDetails from "./components/NewUser/EmploymentDetails";
import CreateProduct from "./components/CreateProduct";
import Tcl from "./components/Tcl/Tcl";
import TclComponent1 from "./components/Tcl/TclComponent1";
import TclComponent2 from "./components/Tcl/TclComponent2";
import TclComponent3 from "./components/Tcl/TclComponent3";
import Ledger from "./components/Ledger/Ledger";
import TestComponent from './components/TestComponent/TestComponent';
import AppLayout from './components/AppLayout/AppLayout'

function App() {

  const RouteArr = [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Body /> },
        { path: "/tcl", element: <Tcl /> },
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
        { path: "/rac", element: <RAC /> },
        { path: "/product", element: <Product /> },
        { path: "/create-product", element: <CreateProduct /> },
        {
          path: "/product/:productType",
          element: <CashLoan />,
          children: [
            { path: "credit-score/:projectId/:loanProId", element: <CreditScore /> },
            { path: "loan-product-config/:projectId/:loanProId", element: <LoanProductConfig /> },
            { path: "debt-burden-config/:projectId/:loanProId", element: <DebtBurdenConfig /> },
            { path: "credit-policy/:projectId/:loanProId", element: <CreditPolicy /> },
            { path: "blocked-employer/:projectId/:loanProId", element: <BlockedEmployer /> },
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
            { path: "loan-config/:installIndex/installment", element: <InstallmentInfoComp /> },
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
  ]

  const appRouter = createBrowserRouter(RouteArr);

  return <RouterProvider router={appRouter} />;
}

export default App;
