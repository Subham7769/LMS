import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import SideBar from "../Common/Sidebar/Sidebar";
import Body from "../Common/Body/Body";
import LoadingState from '../LoadingState/LoadingState';

const AppLayout = () => {
  return (
    <div className="flex flex-col max-h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Suspense fallback={<LoadingState />}>
            <Body>
              <Outlet />
            </Body>
          </Suspense>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
