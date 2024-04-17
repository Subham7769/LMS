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
import GroupTab from "./components/Group/GroupTab";

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
      setLeftPanelWidth(newWidth + 35); // Update state with padding
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
          children: [
            {
              path: ":grpNo",
              element: <GroupTab />,
            },
          ],
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
          path: "/product",
          element: <Product />,
          children: [
            {
              path: "cash-loan",
              element: <CashLoan />,
              children: [
                {
                  path: "credit-score",
                  element: <CreditScore />,
                },
                {
                  path: "loan-product-config",
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
          element: <SubscriberInfo />,
        },
        {
          path: "/slidenav",
          element: <SlideNav />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
