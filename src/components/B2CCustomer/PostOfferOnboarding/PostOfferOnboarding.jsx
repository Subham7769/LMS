import Onboarding01 from './Onboarding01';
import Onboarding02 from './Onboarding02';
import Onboarding03 from './Onboarding03';
import OnboardingImage from "../images/loan_banner_freepik.png";
import '../style.css';

import { useActiveTab } from "../ActiveTabContext";
import B2CProgressBar from "../B2CProgressBar/B2CProgressBar";


const PostOfferOnboarding = () => {
  const { postOfferSubStep, postOfferNext, postOfferBack, postOfferSteps } = useActiveTab();

  const renderPostOfferSubStep = () => {
    switch (postOfferSubStep) {
      case 0:
        return <Onboarding01 onNext={postOfferNext} />;
      case 1:
        return <Onboarding02 onNext={postOfferNext} onBack={postOfferBack} />;
      case 2:
        return <Onboarding03 onNext={postOfferNext} onBack={postOfferBack} />;
      default:
        return null;
    }
  };

  return <div className="flex flex-col justify-between">
    <div className="flex flex-col md:w-1/2">
      {/* Progress bar */}
      <B2CProgressBar SubStep={postOfferSubStep} Steps={postOfferSteps} />

      {/* Onboarding Steps */}
      {renderPostOfferSubStep()}
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

export default PostOfferOnboarding;
