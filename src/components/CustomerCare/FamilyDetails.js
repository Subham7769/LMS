import { subscriberList } from "../../config";

const FamilyDetails = () => {
  const { maritalStatus, noOfDomesticWorkers, noOfChildren, totalDependent } =
    subscriberList.borrowerProfile.maritalDetails;
  return (
    <>
      <div className="mt-4">
        <div className="text-xl mb-4">Family Details</div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-y-3">
            <div>Martial Status : </div>
            <div>No Of Children : </div>
            <div>No of domestic workers : </div>
            <div>Total dependent : </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <div>{maritalStatus}</div>
            <div>{noOfChildren}</div>
            <div>{noOfDomesticWorkers}</div>
            <div>{totalDependent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyDetails;
