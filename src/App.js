import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeftPanel from "./components/LeftPanel";
import { useEffect, useState } from "react";
import Group from "./Group";
import RAC from "./components/RAC";
import Product from "./components/Product";
import Scheme from "./components/Scheme";
import Notifications from "./components/Notifications";
import Expense from "./components/Expense";
import SlideNav from "./components/SlideNav";
import CashLoan from "./components/CashLoan";
import CreditScore from "./components/CreditScore";
import RacMatrixConfig from "./components/RacMatrixConfig";
import LoanProductConfig from "./components/LoanProductConfig";
import DebtBurdenConfig from "./components/DebtBurdenConfig";

const AppLayout = () => {
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("navBarId");
    const height = navbar.offsetHeight;
    setNavBarHeight(height + 20);
  }, []);

  return (
    <>
      <div className="flex max-w-full overflow-x-hidden">
        <LeftPanel />
        <div className="flex grow flex-col min-h-screen">
          <Header />
          <div style={{ marginTop: `${navBarHeight}px` }}>
            <Outlet />
          </div>
          <Footer />
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
          path: "/rac",
          element: <RAC />,
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
                  path: "rmc",
                  element: <RacMatrixConfig />,
                },
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
              ],
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
          path: "/expense",
          element: <Expense />,
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
