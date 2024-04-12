import { Outlet, Link } from "react-router-dom";

const GlobalConfig = () => {
  return (
    <>
      <div className="flex gap-4">
        <p>Global Config component</p>
        <Link to="/global-config/cp">Credit Policy</Link>
      </div>
      <div className="mx-4">
        <Outlet />
      </div>
    </>
  );
};

export default GlobalConfig;
