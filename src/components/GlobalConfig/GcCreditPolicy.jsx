import GcCreditPolicyComp from "./GcCreditPolicyComp";
import MaxFinAmt from "./MaxFinAmt";

// const labelProp = {
//   cardTitle: "Finance Amount",
//   label1: "Minimum Gross Salary:",
//   label2: "Maximum Gross Salary:",
//   placeholder1: "Add Minimum Gross Salary",
//   placeholder2: "Add Maximum Gross Salary",
// };

const labelProp2 = {
  cardTitle: "Credit Score",
  label1: "Minimum Credit Score:",
  label2: "Maximum Credit Score:",
  placeholder1: "0.1",
  placeholder2: "2",
};

const GcCreditPolicy = () => {
  return (
    <>
      {/* <GcCreditPolicyComp labelProp={labelProp} /> */}
      <MaxFinAmt />
      <GcCreditPolicyComp labelProp={labelProp2} />
    </>
  );
};

export default GcCreditPolicy;
