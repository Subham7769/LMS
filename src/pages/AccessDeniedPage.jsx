import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button/Button';
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { NoSymbolIcon } from '@heroicons/react/24/outline';

const AccessDeniedPage = () => {
  const navigate = useNavigate();

  // Function to navigate back to the previous page
  const goBack = () => {
    navigate(-1); // This will navigate back to the last visited page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[80%] h-[80%] p-8 rounded-xl shadow-lg text-center">
        {/* No Symbol Icon */}
        <NoSymbolIcon className="h-24 w-24 text-red-500 mx-auto" />

        {/* Access Denied Text */}
        <h1 className="text-4xl font-bold text-gray-900 mt-4">Access Denied</h1>

        {/* Description */}
        <p className="text-gray-600 my-4">
          You don't have permission to view this page. Please check your credentials or contact the administrator.
        </p>

        {/* Action Button */}
        <Button
          buttonIcon={ArrowLeftIcon}
          buttonName={"Go Back"}
          onClick={goBack}
          rectangle={true}
        // className={}
        />

        {/* Support Link */}
        <div className="mt-4">
          <a href="/support" className="text-gray-500 hover:text-gray-900 transition">
            Need help? Contact support.
          </a>
        </div>
      </div>
    </div>
  );
}

export default AccessDeniedPage