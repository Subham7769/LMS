import GcCreditPolicyComp from "./GcCreditPolicyComp";

const labelProp = {
  cardTitle: "Finance Amount",
  label1: "Minimum Gross Salary:",
  label2: "Maximum Gross Salary:",
  placeholder1: "Add Minimum Gross Salary",
  placeholder2: "Add Maximum Gross Salary",
};

const labelProp2 = {
  cardTitle: "Credit Score",
  label1: "Minimum Credit Score:",
  label2: "Maximum Credit Score:",
  placeholder1: "Add Minimum Credit Score",
  placeholder2: "Add Maximum Credit Score",
};

const GcCreditPolicy = () => {
  return (
    <>
      <GcCreditPolicyComp labelProp={labelProp} />
      <GcCreditPolicyComp labelProp={labelProp2} />
    </>
  );
};

export default GcCreditPolicy;
