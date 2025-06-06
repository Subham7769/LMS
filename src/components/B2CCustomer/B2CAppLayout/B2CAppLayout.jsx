import { Outlet, Link } from "react-router-dom";
import { useActiveTab } from "../ActiveTabContext";  // Import the hook
import B2CHeader from "../B2CHeader/B2CHeader";

const B2CAppLayout = () => {
  const { subStep, formData } = useActiveTab();  // Access current subStep from context
  // console.log(formData)
  return (
    <main className="bg-white dark:bg-gray-800 relative">

      {/* Header */}
      <B2CHeader subStep={subStep} />

      <div className="w-full  min-h-[100dvh] h-full flex flex-col after:flex-1">
        {/* Main Content */}
        <Outlet />
      </div>

    </main>
  );
};

export default B2CAppLayout;
