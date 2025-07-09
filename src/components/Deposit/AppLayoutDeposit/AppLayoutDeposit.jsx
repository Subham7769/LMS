import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Common/Header/Header";
import Footer from "../../Common/Footer/Footer";
import Body from "../../Common/Body/Body";
import LoadingState from "../../LoadingState/LoadingState";
import DepositSideBar from "../../Common/DepositSideBar/DepositSideBar";

const AppLayoutDeposit = () => {
  return (
    <div className="flex flex-col max-h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <DepositSideBar />
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

export default AppLayoutDeposit;
