import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./Components/Body";
import Group from "./Components/Group/Group";
import RAC from "./Components/RAC/RAC";
import Product from "./Components/Product";
import Scheme from "./Components/Scheme";
import Notifications from "./Components/Notifications";
import SlideNav from "./Components/SlideNav";
import CashLoan from "./Components/CashLoan";
import CreditScore from "./Components/CreditScore";
import LoanProductConfig from "./Components/LoanProductConfig";
import DebtBurdenConfig from "./Components/DebtBurdenConfig";
import CreditPolicy from "./Components/CreditPolicy";
import GlobalConfig from "./Components/GlobalConfig/GlobalConfig";
import GcCreditPolicy from "./Components/GlobalConfig/GcCreditPolicy";
import CustomerCare from "./Components/CustomerCare/CustomerCare";
import SubscriberInfo from "./Components/CustomerCare/SubscriberInfo";
import LiabilitiesMatrix from "./Components/GlobalConfig/LiabilitiesMatrix";
import RiskGradeCal from "./Components/GlobalConfig/RiskGradeCal";
import BareMinimumExp from "./Components/GlobalConfig/BareMinimumExp";
import NotificationText from "./Components/GlobalConfig/NotificationText";
import SystemConfig from "./Components/GlobalConfig/SystemConfig";
import GroupComponent from "./Components/Group/GroupComponent";
import GroupComponent2 from "./Components/Group/GroupComponent2";
import GroupComponent3 from "./Components/Group/GroupComponent3";
import BorrowerInfoTabs from "./Components/CustomerCare/BorrowerInfoTabs";
import KYCDetails from "./Components/CustomerCare/KYCDetails";
import CreditProfile from "./Components/CustomerCare/CreditProfile";
import LoanNPaymentHist from "./Components/CustomerCare/LoanNPaymentHis";
import RejectionHistory from "./Components/CustomerCare/RejectionHistory";
import CreditBureauDetails from "./Components/CustomerCare/CreditBureauDetails";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import LoanForm from "./Components/Project/LoanForm";
import CreateRac from "./Components/RAC/CreateRac";
import NewCreatedRAC from "./Components/RAC/NewCreatedRAC";
import BpmnComponent from "./Components/BusinessRule/BpmnComponent";
import BpmnComponent2 from "./Components/BusinessRule/BpmnComponent2";
import BpmnComponent3 from "./Components/BusinessRule/BpmnComponent3";
import ProjectPage from "./Components/Project/ProjectPage";
import NewProjectPage from "./Components/Project/NewProjectPage";
import UserPage from "./Components/NewUser/UserPage";
import UserInfoTabs from "./Components/NewUser/UserInfoTabs";
import UserInfo from "./Components/NewUser/UserInfo";
import Disbursement from "./Components/NewUser/Disbursement";
import Register from "./Components/NewUser/Register";
import InstallmentInfoComp from "./Components/NewUser/InstallmentInfoComp";
import LoanConfigDD from "./Components/NewUser/LoanConfigDD";
import BlockedEmployer from "./Components/BlockedEmployer";
import Repayment from "./Components/NewUser/Repayments";
import FamilyDetails from "./Components/NewUser/FamilyDetails";
import EmploymentDetails from "./Components/NewUser/EmploymentDetails";
import CreateProduct from "./Components/CreateProduct";
import Tcl from "./Components/Tcl/Tcl";
import TclComponent1 from "./Components/Tcl/TclComponent1";
import TclComponent2 from "./Components/Tcl/TclComponent2";
import TclComponent3 from "./Components/Tcl/TclComponent3";
import Ledger from "./Components/Ledger/Ledger";
import TestComponent from './Components/TestComponent/TestComponent';
import AppLayout from './Components/AppLayout/AppLayout'

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
