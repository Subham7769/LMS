import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { subscriberList } from "../../config";

const FamilyDetails = () => {
  const [open, setOpen] = useState(true);
  const { maritalStatus, noOfDomesticWorkers, noOfChildren, totalDependent } =
    subscriberList.borrowerProfile.maritalDetails;
  return (
    <>
      <div className="shadow-md rounded-lg p-3 mt-4">
        <div className="flex justify-between">
          <div className="text-xl">Family Details</div>
          <ChevronRightIcon
            className={`z-10 h-5 w-5 shrink-0 rotate-90 transform duration-500 ease-in-out ${
              open ? "-rotate-90 text-gray-500" : "text-gray-400"
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div
          className={`mt-3 transition-all overflow-y-hidden flex gap-20 w-auto ${
            open ? "h-6" : "h-0"
          }`}
        >
          <div className="flex gap-9">
            <div>Martial Status : &nbsp;{maritalStatus}</div>
            <div>No Of Children : &nbsp;{noOfChildren}</div>
            <div>No of domestic workers : &nbsp;{noOfDomesticWorkers}</div>
            <div>Total dependent : &nbsp;{totalDependent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyDetails;
