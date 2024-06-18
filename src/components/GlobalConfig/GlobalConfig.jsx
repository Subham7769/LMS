import { Outlet } from "react-router-dom";

const GlobalConfig = () => {
  return (
    <>
      {/* <p>Global Configuration</p> */}
      <div className="mx-2">
        <Outlet />
      </div>
    </>
  );
};

export default GlobalConfig;
