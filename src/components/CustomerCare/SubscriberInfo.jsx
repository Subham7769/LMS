import { useParams } from "react-router-dom";
import SubscriberInfoComponet from "./SubscriberInfoComponet";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import LoadingState from "../LoadingState/LoadingState";

const SubscriberInfo = () => {
  const { subID } = useParams();
  const url = "";
  const kycInfo = useBorrowerInfo(url);
  if (kycInfo.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div>
          <img
            className="rounded-full w-12"
            src="https://lmscarbon.com/assets/index.png"
            alt=""
          />
        </div>
        <div className="text-xl">Borrower Id : {subID}</div>
      </div>
      <SubscriberInfoComponet subscriberListNew={kycInfo} />
    </div>
  );
};

export default SubscriberInfo;
