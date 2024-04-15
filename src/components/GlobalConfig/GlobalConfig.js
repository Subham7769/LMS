import { Outlet, Link } from "react-router-dom";

const GlobalConfig = () => {
  return (
    <>
      <div className="flex gap-4 mb-7">
        <p>Global Config component</p>
        <Link to="/global-config/cp">Credit Policy</Link>
        <Link to="/global-config/liability-matrix">Liabilities Matrix</Link>
        <Link to="/global-config/risk-grade-cal">Risk Grading Calculation</Link>
        <Link to="/global-config/bare-min-exp">Bare Minimum Expense</Link>
        <Link to="/global-config/notification-text">Notification Text</Link>
        <Link to="/global-config/system-config">System Configuration</Link>
      </div>
      <div className="mx-2">
        <Outlet />
      </div>
    </>
  );
};

export default GlobalConfig;
