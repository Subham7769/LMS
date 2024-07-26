import React from "react";

const FamilyDetails = ({ info }) => {
  const maritalDetails = info?.borrowerProfile?.maritalDetails;

  if (!maritalDetails) {
    console.warn("Marital details are missing in the provided info.");
    return null;
  }

  const details = [
    { label: "Marital Status", value: maritalDetails.maritalStatus },
    { label: "No Of Children", value: maritalDetails.noOfChildren },
    {
      label: "No of Domestic Workers",
      value: maritalDetails.noOfDomesticWorkers,
    },
    { label: "Total Dependent", value: maritalDetails.totalDependent },
  ];

  return (
    <div className="mt-4">
      <div className="text-xl mb-4">Family Details</div>
      <div className="flex gap-10">
        <div className="flex flex-col gap-y-3">
          {details.map((detail, index) => (
            <div key={index}>{detail.label}:</div>
          ))}
        </div>
        <div className="flex flex-col gap-y-3">
          {details.map((detail, index) => (
            <div key={index}>{detail.value || "N/A"}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FamilyDetails);
