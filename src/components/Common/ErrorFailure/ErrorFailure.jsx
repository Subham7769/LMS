import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const ErrorFailure = ({ error }) => {
  const navigate = useNavigate();

  // Function to navigate back to the previous page
  const goBack = () => {
    navigate(-1); // This will navigate back to the last visited page
  };

  return (
    <div className="min-h-screen bg-background-light-secondary flex items-center justify-center">
      <div className="bg-white w-[80%] h-[80%] p-8 rounded-xl shadow-lg text-center">
        {/* No Symbol Icon */}
        <ExclamationCircleIcon className="h-24 w-24 text-red-500 mx-auto" />

        {/* Access Denied Text */}
        <h1 className="text-4xl font-bold text-gray-900 mt-4">An Error Occurred</h1>

        {/* Description */}
        <p className="text-gray-600 my-4">
          {error ? error : "An unknown error occurred. Please try again later."}
        </p>

        {/* Action Button */}
        <Button
          buttonIcon={ArrowLeftIcon}
          buttonName={"Go Back"}
          onClick={goBack}
          rectangle={true}
        />

        {/* Support Link */}
        {/* <div className="mt-4">
          <a
            href="/support"
            className="text-gray-500 hover:text-gray-900 transition"
          >
            Need help? Contact support.
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default ErrorFailure;
