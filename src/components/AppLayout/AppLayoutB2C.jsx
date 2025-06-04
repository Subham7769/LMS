import { Outlet, Link } from "react-router-dom";
import { useActiveTab } from "../B2CCustomer/ActiveTabContext";  // Import the hook

const AppLayoutB2C = () => {
  const { subStep, formData } = useActiveTab();  // Access current subStep from context
  // console.log(formData)
  return (
    <main className="bg-white dark:bg-gray-900 relative">

      <div className="w-full  min-h-[100dvh] h-full flex flex-col after:flex-1">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link className="block" to="/customer/home">
            <svg className="fill-sky-600" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </Link>
        </div>

        {/* Main Content */}
        <Outlet />
      </div>

    </main>
  );
};

export default AppLayoutB2C;
