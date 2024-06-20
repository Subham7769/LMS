import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import SideBar from "../Common/Sidebar/Sidebar";

const AppLayout = () => {
    const [navBarHeight, setNavBarHeight] = useState(0);
    const [SideBarWidth, setSideBarWidth] = useState(0);
  
    useEffect(() => {
      const SideBarElement = document.getElementById("SideBarId");
      const navbarElement = document.getElementById("navBarId");
      setNavBarHeight(navbarElement.offsetHeight + 20);
  
      const resizeObserver = new ResizeObserver((entries) => {
        const newWidth = entries[0].contentRect.width;
        setSideBarWidth(newWidth + 50); // Update state with padding
      });
  
      resizeObserver.observe(SideBarElement);
  
      return () => resizeObserver.disconnect(); // Cleanup on unmount
    }, []);
  
    return (
      <div className="flex max-w-full overflow-x-hidden">
        <SideBar />
        <div className="flex grow flex-col min-h-screen">
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