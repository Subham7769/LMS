import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import Onboarding01 from './Onboarding01';
import Onboarding02 from './Onboarding02';
import Onboarding03 from './Onboarding03';
import OnboardingImage from "../images/loan_banner_freepik.png";

import { useActiveTab } from "../ActiveTabContext";
import { Link } from "react-router-dom";
import B2CProgressBar from "../B2CProgressBar/B2CProgressBar";


const PreOfferOnBoarding = () => {
  const dispatch = useDispatch();
  const { subStep, next, back } = useActiveTab();

  useEffect(() => {
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const renderSubStep = () => {
    switch (subStep) {
      case 0:
        return <Onboarding01 onNext={next} />;
      case 1:
        return <Onboarding02 onNext={next} onBack={back} />;
      case 2:
        return <Onboarding03 onNext={next} onBack={back} />;
      default:
        return null;
    }
  };

  return <div className="bg-white dark:bg-gray-900 flex flex-col justify-between">
    <div className="flex flex-col w-1/2">
    {/* Progress bar */}
      <B2CProgressBar/>

      {/* Onboarding Steps */}
      {renderSubStep()}
    </div>
    {/* Image Section */}
    <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
      <img
        className="object-cover object-center w-full h-full"
        src={OnboardingImage}
        width="760"
        height="1024"
        alt="Onboarding"
      />
    </div>
  </div>;

};

export default PreOfferOnBoarding;
