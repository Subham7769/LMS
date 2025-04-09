import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import SideBar from "../Common/Sidebar/Sidebar";
import Body from "../Common/Body/Body";
import LoadingState from "../LoadingState/LoadingState";

const AppLayout = () => {
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <SideBar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto ">
            <Suspense fallback={<LoadingState />}>
              <Body>
                <Outlet />
              </Body>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
