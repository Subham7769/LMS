import React from "react";
import Accordion from "../../Common/Accordion/Accordion";
import Button from "../../Common/Button/Button";

const loanOffers = [
  {
    id: 1,
    name: "Personal Loan",
    interestRate: "5.5%",
    term: "5 years",
    isOpen: true,
  },
  { id: 2, name: "Home Loan", interestRate: "3.8%", term: "30 years" },
  { id: 3, name: "Auto Loan", interestRate: "4.2%", term: "7 years" },
];

const LoanOffers = () => {
  const handleSubmit = () => {
    console.log("API call made");
  };

  const generalDetails = (offer) => (
    <>
      <div className="grid grid-cols-4 gap-4">
        <p>Interest Rate: {offer.interestRate}</p>
        <p>Term: {offer.term}</p>
      </div>
      <div className="text-right">
        <Button buttonName="Proceed" onClick={handleSubmit} rectangle={true} />
      </div>
    </>
  );

  return (
    <>
      {loanOffers.map((offer) => (
        <Accordion
          key={offer.id}
          heading={offer.name}
          renderExpandedContent={() => generalDetails(offer)}
          isOpen={offer?.isOpen}
        />
      ))}
    </>
  );
};

export default LoanOffers;
