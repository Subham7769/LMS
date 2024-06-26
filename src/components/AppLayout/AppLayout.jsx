import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import SideBar from "../Common/Sidebar/Sidebar";

const AppLayout = () => {
  const [navBarHeight, setNavBarHeight] = useState(0);
  const [SideBarWidth, setSideBarWidth] = useState(0);

  useEffect(() => {
    const navbarElement = document.getElementById("navBarId");
    const SideBarElement = document.getElementById("SideBarId");

    if (navbarElement) {
      setNavBarHeight(navbarElement.offsetHeight + 20);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      setSideBarWidth(newWidth + 30); // Update state with padding
    });

    if (SideBarElement) {
      resizeObserver.observe(SideBarElement);
    }

    return () => {
      resizeObserver.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="flex max-w-full overflow-x-hidden">
      <SideBar />
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div
          className="mr-4"
          style={{
            marginTop: `${navBarHeight}px`,
            marginLeft: `${SideBarWidth}px`,
          }}
        >
          <Outlet />
        </div>
        <Footer mgLeft={SideBarWidth} />
      </div>
    </div>
  );
};

export default AppLayout;
