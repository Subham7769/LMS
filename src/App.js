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

const AppLayout = () => {
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("navBarId");
    const height = navbar.offsetHeight;
    setNavBarHeight(height + 20);
  }, []);

  return (
    <>
      <div className="flex">
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
