import React, { useEffect } from "react";
import convertToReadableString from "../../../utils/convertToReadableString";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { convertDate } from "../../../utils/convertDate";
import { useSelector, useDispatch } from "react-redux";

import { useLocation, useParams } from "react-router-dom";
import longHornLogo from "../../../assets/image/longhorn-logo.png";
import formatNumber from "../../../utils/formatNumber";
import { getRefundForm } from "../../../redux/Slices/personalRefundSlice";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
    </div>
  );
};

const RefundFormPrint = () => {
  const dispatch = useDispatch();
  const { refundProcessId } = useParams();
  const { refundFormData, loading } = useSelector(
    (state) => state.personalRefund
  );
  const location = useLocation();

  useEffect(() => {
    dispatch(getRefundForm(refundProcessId));

    if (!location.pathname.includes("loan-origination-system")) {
      const timeoutId = setTimeout(() => {
        window.print();
      }, 1500);

      // Cleanup to avoid potential memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, refundProcessId, location.pathname]);

  const {
    customerDetails = {},
    customerContactDetails = {},
    customerBankDetails = {},
    refundRequestDetails = {},
    attachmentDocuments = {},
  } = refundFormData || {};

  if (loading) {
    return (
      <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
        <ShimmerTable />
        <ShimmerTable />
        <ShimmerTable />
      </div>
    );
  }

  const formatLabel = (key) => {
    return key
      .replace(/Attached$/, "") // remove "Attached" from end
      .replace(/([A-Z])/g, " $1") // add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // capitalize first letter
      .trim();
  };

  return (
    <>
      <div className={"flex flex-col justify-center align-middle gap-2"}>
        <div className="flex w-full items-center relative">
          <div className="absolute left-0 top-0">
            <img src={longHornLogo} className="w-32" />
          </div>
          <div className="font-semibold text-center flex-1">
            <div className="text-center mb-1">REFUND CLAIM FORM</div>
            <div className="text-xs">
              Customer ID: {customerDetails?.customerId} &nbsp;&nbsp; Date:{" "}
              {convertDate(customerDetails?.date)}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 border-2 border-gray-500 text-xs">
          <div className="border-r border-gray-500">
            <div className="font-semibold text-center border-b border-border-gray-primary pt-1 bg-red-500">
              CUSTOMER DETAILS
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-border-gray-primary">
                {Object.keys(customerDetails)
                  .filter((key) => key !== "customerId")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pl-1 pt-1"
                    >
                      {convertToReadableString(key)}
                    </div>
                  ))}
              </div>
              <div>
                {Object.keys(customerDetails)
                  .filter((key) => key !== "customerId")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                    >
                      &nbsp;{customerDetails[key]}
                    </div>
                  ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-1 bg-red-500">
              CUSTOMER BANK DETAILS
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-border-gray-primary">
                {Object.keys(customerBankDetails)
                  .filter((key) => key !== "swift" && key !== "tpin")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pl-1 pt-1"
                    >
                      {convertToReadableString(key)}
                    </div>
                  ))}
              </div>
              <div>
                {Object.keys(customerBankDetails)
                  .filter((key) => key !== "swift" && key !== "tpin")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                    >
                      &nbsp;{customerBankDetails[key]}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-1 bg-red-500">
              CUSTOMER CONTACT DETAILS
            </div>
            <div className="grid grid-cols-[45%,55%] ">
              <div className="border-r border-border-gray-primary">
                {Object.keys(customerContactDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
                <div className="border-b border-border-gray-primary pl-1 pt-1">
                  &nbsp;
                </div>
              </div>
              <div>
                {Object.keys(customerContactDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                  >
                    &nbsp;{customerContactDetails[key]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="font-semibold text-center border-b border-border-gray-primary pt-1 bg-red-500">
              REFUND REQUEST DETAILS
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2 border-r border-gray-500">
                <div className="border-r border-border-gray-primary">
                  {Object.keys(refundRequestDetails)
                    .filter(
                      (key) =>
                        key !== "affectedLoanId" &&
                        key !== "refundAmountRequested" &&
                        key !== "loanAmount"
                    )
                    .map((key) => (
                      <div
                        key={key}
                        className="border-b border-border-gray-primary pl-1 pt-1"
                      >
                        {convertToReadableString(key)}
                      </div>
                    ))}
                  <div className=" pl-1 pt-1">Attached Documents</div>
                </div>
                <div>
                  {Object.keys(refundRequestDetails)
                    .filter(
                      (key) =>
                        key !== "affectedLoanId" &&
                        key !== "refundAmountRequested" &&
                        key !== "loanAmount"
                    )
                    .map((key) => (
                      <div
                        key={key}
                        className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                      >
                        &nbsp;{convertToTitleCase(refundRequestDetails[key])}
                      </div>
                    ))}
                  <div className="border-b border-border-gray-primary pl-1 pt-1 grid grid-cols-2 gap-y-1">
                    {Object.keys(attachmentDocuments)
                      .filter((key) => key !== "otherDocumentDescription")
                      .map((key) => {
                        const isAttached = attachmentDocuments[key];
                        const LabelIcon = isAttached
                          ? CheckCircleIcon
                          : XCircleIcon;

                        return (
                          <div className="flex items-center gap-1.5 " key={key}>
                            <LabelIcon
                              className={`-ml-0.5 h-5 w-5 ${
                                isAttached ? "text-green-600" : "text-red-500"
                              }`}
                            />
                            {formatLabel(key)}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="border-r border-border-gray-primary">
                  {Object.keys(refundRequestDetails)
                    .filter(
                      (key) =>
                        key !== "product" &&
                        key !== "relatedPayslipMonth" &&
                        key !== "causeOfRefund"
                    )
                    .map((key) => (
                      <div
                        key={key}
                        className="border-b border-border-gray-primary pl-1 pt-1"
                      >
                        {convertToReadableString(key)}
                      </div>
                    ))}
                  <div className="pl-1 pt-1">Others (specify)</div>
                </div>
                <div>
                  {Object.keys(refundRequestDetails)
                    .filter(
                      (key) =>
                        key !== "product" &&
                        key !== "relatedPayslipMonth" &&
                        key !== "causeOfRefund"
                    )
                    .map((key) => (
                      <div
                        key={key}
                        className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                      >
                        &nbsp;{refundRequestDetails[key]}
                      </div>
                    ))}
                  <div className="pr-1 pt-2 text-right">
                    {attachmentDocuments.otherDocumentDescription}
                  </div>
                </div>
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-1 bg-red-500">
              CUSTOMER ACKNOWLEDGMENT
            </div>
            <div className="px-1 pt-1">
              I{" "}
              {`${customerDetails?.firstName} ${customerDetails?.otherName} ${customerDetails?.surname}`}{" "}
              ,NRC No. {customerDetails?.nrcNumber} hereby confirm that I am
              claiming a refund from Longhohron Associates Limited with details
              shown above. <br />
              <br /> Customer Signature:
              _______________________________________________
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-1 bg-red-500">
              CREDIT OFFICER REFUND REQUEST ASSESSEMENT
            </div>
            <div className="grid grid-cols-2 p-1">
              <div className="grid gap-y-1">
                <div>Loan Officer (Name)</div>
                <div>Signature</div>
                <div>Date</div>
              </div>
              <div className="grid gap-y-1.5">
                <div>___________________________________</div>
                <div>___________________________________</div>
                <div>___________________________________</div>
              </div>
            </div>
            <div className="grid grid-cols-[60%_40%] border-t border-gray-500 text-xs">
              <div className="border-r border-gray-500">
                <div className="font-semibold text-center border-b border-border-gray-primary pt-1 bg-red-500">
                  CREDIT OFFICER REFUND APPROVAL
                </div>
                <div className="grid grid-cols-2 p-1">
                  <div className="grid gap-y-1">
                    <div>Payment received from Employer? </div>
                    <div>Credit Officer (Name)</div>
                    <div className="my-2">Signature</div>
                    <div>Date</div>
                  </div>
                  <div className="grid gap-y-1.5">
                    <div>
                      YES{" "}
                      <span className="border border-black inline-block h-4 w-8 ml-2 mr-6">
                        &nbsp;
                      </span>{" "}
                      NO{" "}
                      <span className="border border-black inline-block h-4 w-8 ml-2">
                        &nbsp;
                      </span>
                    </div>
                    <div className="border-b border-gray-800"></div>
                    <div className="border-b border-gray-800 my-2"></div>
                    <div className="border-b border-gray-800"></div>
                  </div>
                </div>
                <div className="font-semibold text-center border-b border-border-gray-primary pt-1 bg-red-500">
                  FINANCE / ACCOUNTS DEPARTMENT (DISBURSEMENT)
                </div>
                <div className="grid grid-cols-2 p-1">
                  <div className="grid gap-y-2">
                    <div>Name</div>
                    <div>Signature</div>
                    <div>Date</div>
                  </div>
                  <div className="grid gap-y-2">
                    <div className="border-b border-gray-800"></div>
                    <div className="border-b border-gray-800"></div>
                    <div className="border-b border-gray-800"></div>
                  </div>
                </div>
              </div>
              <div className="text-gray-300 grid items-center justify-center">
                LHA PAID STAMP
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center relative text-[8px]">
          <div className="absolute right-0 top-0 text-right">
            <a>e-mail: inform@longhorn-associates.com</a> <br />
            <a href="www.longhorn-associate.com" target="blank">
              www.longhorn-associate.com
            </a>
          </div>
          <div className="text-center flex-1">
            Longhorn Associates Ltd, Ground Floor, Garden View Office park,{" "}
            <br />
            Plot 1146/15, Lagos Road, P.O. Box 50655, Lusaka, Phone: 211252540
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundFormPrint;
