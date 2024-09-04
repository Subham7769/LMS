import React from 'react';
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { FaceFrownIcon } from '@heroicons/react/20/solid';
import Button from '../components/Common/Button/Button';
import { useNavigate } from 'react-router-dom';

const PageNotFoundPage = () => {

  const navigate = useNavigate();

  // Function to navigate back to the previous page
  const goBack = () => {
    navigate(-1); // This will navigate back to the last visited page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* 404 Icon */}
        <FaceFrownIcon className="w-24 h-24 mx-auto text-indigo-500" />

        {/* Main Heading */}
        <h1 className="mt-4 text-6xl font-extrabold text-gray-800">404</h1>

        {/* Subheading */}
        <p className="mt-2 text-xl text-gray-600">Oops! Page not found.</p>

        {/* Description */}
        <p className="mt-4 text-gray-500">
          The page you're looking for doesn't exist. Perhaps you'd like to go back to the homepage?
        </p>

        {/* Button to Navigate Back */}
        <Button
          buttonIcon={ArrowLeftIcon}
          buttonName={"Go Back"}
          onClick={goBack}
          rectangle={true}
        className={"mt-5"}
        />
      </div>
    </div>
  );
};

export default PageNotFoundPage;
