import Onboarding01 from './Onboarding01';
import Onboarding02 from './Onboarding02';
import Onboarding03 from './Onboarding03';
import Onboarding04 from './Onboarding04';
import Onboarding05 from './Onboarding05';
import Onboarding06 from './Onboarding06';
import '../style.css';

import { useActiveTab } from "../ActiveTabContext";
import B2CProgressBar from "../B2CProgressBar/B2CProgressBar";
import { useSelector } from 'react-redux';
import LoanDetails from './LoanDetails';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PostOfferOnboarding = () => {
  const navigate = useNavigate();

  const { postOfferSubStep, postOfferNext, postOfferBack, postOfferSteps, setPostOfferSubStep } = useActiveTab();
  const { personalBorrower } = useSelector((state) => state.B2CLoans);
  const { cachedBorrowerId } = personalBorrower?.cachedDetails;

  useEffect(() => {
    console.log("🚀 useEffect check:", { cachedBorrowerId });

    if (!cachedBorrowerId || String(cachedBorrowerId).trim() === "") {
      console.log("❌ No cachedBorrowerId → navigating");
      navigate("/customer/loan-application");
      return;
    }
  }, [cachedBorrowerId, navigate]);

  const renderPostOfferSubStep = () => {
    switch (postOfferSubStep) {
      case 0:
        return <Onboarding01 onNext={postOfferNext} />;
      case 1:
        return <Onboarding02 onNext={postOfferNext} onBack={postOfferBack} />;
      case 2:
        return <Onboarding03 onNext={postOfferNext} onBack={postOfferBack} />;
      case 3:
        return <Onboarding04 onNext={postOfferNext} onBack={postOfferBack} />;
      case 4:
        return <Onboarding05 onNext={postOfferNext} onBack={postOfferBack} />;
      case 5:
        return <Onboarding06 onNext={postOfferNext} onBack={postOfferBack} />;
      default:
        return null;
    }
  };

  return <div className="flex flex-col md:flex-row  justify-between">
    <div className="flex flex-col md:w-1/2">
      {/* Progress bar */}
      <B2CProgressBar SetSubStep={setPostOfferSubStep} SubStep={postOfferSubStep} Steps={postOfferSteps} />

      {/* Onboarding Steps */}
      {renderPostOfferSubStep()}
    </div>

    {/* Loan Section */}
    <LoanDetails />
  </div>;

};

export default PostOfferOnboarding;
