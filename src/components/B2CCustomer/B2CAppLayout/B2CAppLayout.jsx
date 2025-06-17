import { Outlet } from "react-router-dom";
import B2CHeader from "../B2CHeader/B2CHeader";

const B2CAppLayout = () => {

  return (
    <main className="bg-white dark:bg-gray-800 relative">

      {/* Header */}
      <B2CHeader />

      <div className="w-full  min-h-[calc(100vh-4rem)] h-full flex flex-col after:flex-1">
        {/* Main Content */}
        <Outlet />
      </div>

    </main>
  );
};

export default B2CAppLayout;
