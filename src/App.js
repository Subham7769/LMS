import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeftPanel from "./components/LeftPanel";
import { useEffect, useRef, useState } from "react";
import Group from "./components/Group/Group";
import RAC from "./components/RAC/RAC";
import Product from "./components/Product";
import Scheme from "./components/Scheme";
import Notifications from "./components/Notifications";
import SlideNav from "./components/SlideNav";
import CashLoan from "./components/CashLoan";
import CreditScore from "./components/CreditScore";
import RacMatrixConfig from "./components/RAC/RacMatrixConfig";
import LoanProductConfig from "./components/LoanProductConfig";
import DebtBurdenConfig from "./components/DebtBurdenConfig";
import CashLoanRAC from "./components/RAC/CashLoanRAC";
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
import BnplRac from "./components/RAC/BnplRac";
import OverdraftRAC from "./components/RAC/OverdraftRAC";
import BNPL from "./BNPL";
import Overdraft from "./components/Overdraft";
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

const AppLayout = () => {
  const [navBarHeight, setNavBarHeight] = useState(0);
  const [leftPanelWidth, setLeftPanelWidth] = useState(0);
  const leftPanelWidthRef = useRef(0);

  useEffect(() => {
    const navbar = document.getElementById("navBarId");
    const height = navbar.offsetHeight;
    setNavBarHeight(height + 20);
  }, []);

  useEffect(() => {
    const leftPanel = document.getElementById("leftPanelId");

    const resizeObserver = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      setLeftPanelWidth(newWidth + 50); // Update state with padding
      leftPanelWidthRef.current = newWidth; // Update reference
    });

    resizeObserver.observe(leftPanel);

    return () => resizeObserver.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <>
      <div className="flex max-w-full overflow-x-hidden">
        <LeftPanel />
        <div className="flex grow flex-col min-h-screen">
          <Header />
          <div
            className="mr-4"
            style={{
              marginTop: `${navBarHeight}px`,
              marginLeft: `${leftPanelWidth}px`,
            }}
          >
            <Outlet />
          </div>
          <Footer mgLeft={leftPanelWidth} />
        </div>
      </div>
    </>
  );
};

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/group",
          element: <Group />,
        },
        {
          path: "group/1",
          element: <GroupComponent />,
        },
        {
          path: "group/2",
          element: <GroupComponent2 />,
        },
        {
          path: "group/3",
          element: <GroupComponent3 />,
        },
        {
          path: "/rac",
          element: <RAC />,
        },
        {
          path: "/rac/cash-loan",
          element: <CashLoanRAC />,
          children: [
            {
              path: "rmc",
              element: <RacMatrixConfig />,
            },
          ],
        },
        {
          path: "/rac/bnpl/rmc",
          element: <BnplRac />,
        },
        {
          path: "/rac/overdraft/rmc",
          element: <OverdraftRAC />,
        },
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "/product/cash-loan",
          element: <CashLoan />,
          children: [
            {
              path: "credit-score",
              element: <CreditScore />,
            },
            {
              path: ":purl",
              element: <LoanProductConfig />,
            },
            {
              path: "debt-burden-config",
              element: <DebtBurdenConfig />,
            },
            {
              path: "credit-policy",
              element: <CreditPolicy />,
            },
          ],
        },
        {
          path: "/product/bnpl",
          element: <BNPL />,
          children: [
            {
              path: "credit-score",
              element: <CreditScore />,
            },
            {
              path: ":purl",
              element: <LoanProductConfig />,
            },
            {
              path: "debt-burden-config",
              element: <DebtBurdenConfig />,
            },
            {
              path: "credit-policy",
              element: <CreditPolicy />,
            },
          ],
        },
        {
          path: "/product/overdraft",
          element: <Overdraft />,
          children: [
            {
              path: "credit-score",
              element: <CreditScore />,
            },
            {
              path: ":purl",
              element: <LoanProductConfig />,
            },
            {
              path: "debt-burden-config",
              element: <DebtBurdenConfig />,
            },
            {
              path: "credit-policy",
              element: <CreditPolicy />,
            },
          ],
        },
        {
          path: "/global-config",
          element: <GlobalConfig />,
          children: [
            {
              path: "cp",
              element: <GcCreditPolicy />,
            },
            {
              path: "liability-matrix",
              element: <LiabilitiesMatrix />,
            },
            {
              path: "risk-grade-cal",
              element: <RiskGradeCal />,
            },
            {
              path: "bare-min-exp",
              element: <BareMinimumExp />,
            },
            {
              path: "notification-text",
              element: <NotificationText />,
            },
            {
              path: "system-config",
              element: <SystemConfig />,
            },
          ],
        },
        {
          path: "/scheme",
          element: <Scheme />,
        },
        {
          path: "/notification",
          element: <Notifications />,
        },
        {
          path: "/customer-care",
          element: <CustomerCare />,
        },
        {
          path: "/borrower/:subID",
          element: <BorrowerInfoTabs />,
          children: [
            {
              path: "personal-info",
              element: <SubscriberInfo />,
            },
            {
              path: "kyc",
              element: <KYCDetails />,
            },
            {
              path: "credit-profile",
              element: <CreditProfile />,
            },
            {
              path: "loanNpayment",
              element: <LoanNPaymentHist />,
            },
            {
              path: "rejection-history",
              element: <RejectionHistory />,
            },
            {
              path: "credit-bureau-details",
              element: <CreditBureauDetails />,
            },
          ],
        },
        {
          path: "/slidenav",
          element: <SlideNav />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
