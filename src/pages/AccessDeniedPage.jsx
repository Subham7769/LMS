import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button/Button';
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

const AccessDeniedPage = () => {
  const navigate = useNavigate();

  // Function to navigate back to the previous page
  const goBack = () => {
    navigate(-1); // This will navigate back to the last visited page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <Button
        buttonIcon={ArrowLeftIcon}
        buttonName={"Go Back"}
        onClick={goBack}
        rectangle={true}
        // className={}
      />

    </div>
  );
};

export default AccessDeniedPage;
