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
    <div className="mt-4 border-b border-border-gray-primary">
      <div className="text-xl mb-2 border-b pb-2">Family Details</div>
      <div className="grid md:grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div key={index} className="py-2">
            <div className="font-semibold">{detail.label}:</div>
            <div>{detail.value || "N/A"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(FamilyDetails);
