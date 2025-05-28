import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import Onboarding01 from './Onboarding/Onboarding01';
import Onboarding02 from './Onboarding/Onboarding02';
import Onboarding03 from './Onboarding/Onboarding03';
import LoanOffer from './Onboarding/LoanOffer';
import { useActiveTab } from "../B2CCustomer/ActiveTabContext";


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


  return < >{renderSubStep()}</>;

};

export default CustomerLoanApplication;
