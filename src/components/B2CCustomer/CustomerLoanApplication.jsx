import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import Onboarding01 from './Onboarding/Onboarding01';
import Onboarding02 from './Onboarding/Onboarding02';
import Onboarding03 from './Onboarding/Onboarding03';
import LoanOffer from './CustomerLoanOffer';
import OnboardingImage from "./images/loan_banner_freepik.png";

import { useActiveTab } from "../B2CCustomer/ActiveTabContext";
import { Link } from "react-router-dom";


const CustomerLoanApplication = () => {
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
      case 3:
        return <LoanOffer onBack={back} />;
      default:
        return null;
    }
  };
  // bg-sky-600 hover:bg-sky-700 text-white

  return <div className="bg-white dark:bg-gray-900 flex flex-col justify-between">
    <div className="flex flex-col w-1/2">
    {/* Progress bar */}
      <div className="px-4 pt-12 pb-8">
        <div className="max-w-md mx-auto w-full">
          <div className="relative">
            <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200 dark:bg-gray-700/60" aria-hidden="true"></div>
            <ul className="relative flex justify-between w-full">
              {[0, 1, 2, 3].map((step, index) => (
                <li key={index}>
                  <Link
                    className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${subStep === step
                      ? "bg-sky-600 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400"
                      }`}
                  // to={`/onboarding-0${step + 1}`}
                  >
                    {step + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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

export default CustomerLoanApplication;
