import React, { useEffect } from "react";
import Button from "../Common/Button/Button";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoanAgreementPrint from "./LoanAgreementPrint";

const LoanAgreement = () => {
  const navigate = useNavigate();
  const { loanApplicationId, userId } = useParams();

  const handlePrint = () => {
    const printUrl = `/loan-agreement-sme/${loanApplicationId}/${userId}`;
    window.open(printUrl, "_blank");
  };

  return (
    <>
      <LoanAgreementPrint />
      <div className={"text-right"}>
        <Button
          buttonIcon={PrinterIcon}
          buttonName={"View Print Layout"}
          onClick={handlePrint}
          rectangle={true}
        />
      </div>
    </>
  );
};

export default LoanAgreement;
