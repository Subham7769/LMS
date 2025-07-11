import React, { useEffect, useState } from "react";
import convertToReadableString from "../../../utils/convertToReadableString";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getLoanAgreement } from "../../../redux/Slices/smeLoansSlice";
import { creditCommitteDecision, documentsData } from "../../../data/LosData";
import longHornLogo from "../../../assets/image/longhorn-logo.png";
import formatNumber from "../../../utils/formatNumber";
import { convertDate } from "../../../utils/convertDate";
import isDateString from "../../../utils/isDateString";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );
};

const LoanAgreementPrint = () => {
  const dispatch = useDispatch();
  const { loanApplicationId, userId } = useParams();
  const { loanAgreementData, loading } = useSelector((state) => state.smeLoans);

  useEffect(() => {
    dispatch(getLoanAgreement({ loanId: loanApplicationId, uid: userId }));

    if (!location.pathname.includes("loan-origination-system")) {
      const timeoutId = setTimeout(() => {
        window.print();
      }, 1000);

      // Cleanup to avoid potential memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, loanApplicationId, userId, location.pathname]);

  const {
    businessDetails = {},
    contactDetails = {},
    profomaDetails = {},
    offTakerDetails = {},
    supplierDetails = {},
    generalLoanDetails = {},
    collateralDetails = {},
    bankingDetails = {},
    loanOfficerFinding = {},
    directorDetails = [],
    shareHolderDetails = [],
    creditOfficerComments = {},
    ccoFoComments = {},
  } = loanAgreementData || {};

  if (loading) {
    return (
      <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
        <ShimmerTable />
        <ShimmerTable />
        <ShimmerTable />
      </div>
    );
  }

  return (
    <>
      <div className={"flex flex-col justify-center align-middle gap-5 m-10"}>
        <div className="flex w-full items-center relative">
          <div className="absolute left-0 top-0">
            <img src={longHornLogo} className="w-32" />
          </div>
          <div className="font-semibold text-center flex-1">
            LOAN AGREEMENT - PART A
          </div>
        </div>
        <div className="border-2 border-gray-500 text-sm">
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            BUSINESS DETAILS
          </div>
          <div className="grid grid-cols-[40%_60%] mb-5">
            <div className="border-r border-gray-300">
              {Object.keys(businessDetails).map((key) => (
                <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                  {convertToReadableString(key)}
                </div>
              ))}
            </div>
            <div>
              {Object.keys(businessDetails).map((key) => (
                <div
                  key={key}
                  className="border-b border-gray-300 pr-1 pt-1 text-right"
                >
                  &nbsp;
                  {businessDetails[key] ?? "-"}
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            CONTACT DETAILS
          </div>
          <div className="grid grid-cols-[40%_60%] mb-5">
            <div className="border-r border-gray-300">
              {Object.keys(contactDetails).map((key) => (
                <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                  {convertToReadableString(key)}
                </div>
              ))}
            </div>
            <div>
              {Object.keys(contactDetails).map((key) => (
                <div
                  key={key}
                  className="border-b border-gray-300 pr-1 pt-1 text-right"
                >
                  &nbsp;
                  {contactDetails[key] ?? "-"}
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            PROFOMA DETAILS
          </div>
          <div className="grid grid-cols-[40%_60%] mb-5">
            <div className="border-r border-gray-300">
              {Object.keys(profomaDetails).map((key) => (
                <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                  {convertToReadableString(key)}
                </div>
              ))}
            </div>
            <div>
              {Object.keys(profomaDetails).map((key) => (
                <div
                  key={key}
                  className="border-b border-gray-300 pr-1 pt-1 text-right"
                >
                  &nbsp;
                  {typeof profomaDetails[key] === "number"
                    ? formatNumber(profomaDetails[key])
                    : isDateString(profomaDetails[key])
                    ? convertDate(profomaDetails[key])
                    : profomaDetails[key] ?? "-"}
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            OFF-TAKER DETAILS
          </div>
          <div className="grid grid-cols-[40%_60%] mb-5">
            <div className="border-r border-gray-300">
              {Object.keys(offTakerDetails).map((key) => (
                <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                  {convertToReadableString(key)}
                </div>
              ))}
            </div>
            <div>
              {Object.keys(offTakerDetails).map((key) => (
                <div
                  key={key}
                  className="border-b border-gray-300 pr-1 pt-1 text-right"
                >
                  &nbsp;{offTakerDetails[key] ?? "-"}
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            SUPPLIER DETAILS
          </div>
          <div className="grid grid-cols-[40%_60%] mb-5">
            <div className="border-r border-gray-300">
              {Object.keys(supplierDetails).map((key) => (
                <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                  {convertToReadableString(key)}
                </div>
              ))}
            </div>
            <div>
              {Object.keys(supplierDetails).map((key) => (
                <div
                  key={key}
                  className="border-b border-gray-300 pr-1 pt-1 text-right"
                >
                  &nbsp;{supplierDetails[key] ?? "-"}
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            GENERAL DETAILS
          </div>
          <div className="grid grid-cols-[40%_60%] mb-5">
            <div className="border-r border-gray-300">
              {Object.keys(generalLoanDetails).map((key) => (
                <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                  {convertToReadableString(key)}
                </div>
              ))}
            </div>
            <div>
              {Object.keys(generalLoanDetails).map((key) => (
                <div
                  key={key}
                  className="border-b border-gray-300 pr-1 pt-1 text-right"
                >
                  &nbsp;
                  {typeof generalLoanDetails[key] === "number"
                    ? formatNumber(generalLoanDetails[key])
                    : isDateString(generalLoanDetails[key])
                    ? convertDate(generalLoanDetails[key])
                    : generalLoanDetails[key] ?? "-"}
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            COLLATERAL DETAILS
          </div>
          <div className="grid grid-cols-[40%_60%] mb-5">
            <div className="border-r border-gray-300">
              {Object.keys(collateralDetails).map((key) => (
                <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                  {convertToReadableString(key)}
                </div>
              ))}
            </div>
            <div>
              {Object.keys(collateralDetails).map((key) => (
                <div
                  key={key}
                  className="border-b border-gray-300 pr-1 pt-1 text-right"
                >
                  &nbsp;{collateralDetails[key] ?? "-"}
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            BANKING DETAILS
          </div>
          <div className="grid grid-cols-[40%_60%] mb-5">
            <div className="border-r border-gray-300">
              {Object.keys(bankingDetails).map((key) => (
                <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                  {convertToReadableString(key)}
                </div>
              ))}
            </div>
            <div>
              {Object.keys(bankingDetails).map((key) => (
                <div
                  key={key}
                  className="border-b border-gray-300 pr-1 pt-1 text-right"
                >
                  &nbsp;{bankingDetails[key] ?? "-"}
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            LOAN OFFICER’S FINDINGS
          </div>
          <div className="grid grid-cols-[40%_60%] mb-5">
            <div className="border-r border-gray-300">
              {Object.keys(loanOfficerFinding).map((key) => (
                <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                  {convertToReadableString(key)}
                </div>
              ))}
            </div>
            <div>
              {Object.keys(loanOfficerFinding).map((key) => (
                <div
                  key={key}
                  className="border-b border-gray-300 pr-1 pt-1 text-right"
                >
                  &nbsp;{loanOfficerFinding[key] ?? "-"}
                </div>
              ))}
            </div>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            DIRECTORS’ DETAILS
          </div>
          <div className="overflow-x-auto mb-5 no-scroll">
            {directorDetails?.length > 0 ? (
              <table className="min-w-full table-auto border-collapse border border-gray-300 print-table">
                <thead>
                  <tr className="bg-background-light-secondary">
                    <th className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      No.
                    </th>
                    {Object.keys(directorDetails[0]).map((key) => (
                      <th
                        key={key}
                        className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold"
                      >
                        {convertToReadableString(key)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {directorDetails.map((director, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-gray-600 text-center">
                        {index + 1}
                      </td>
                      {Object.values(director).map((value, valueIndex) => (
                        <td
                          key={valueIndex}
                          className="border border-gray-300 px-4 py-2 text-gray-600 text-center"
                        >
                          {value || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-600 py-4">
                No Directors Found
              </div>
            )}
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            SHAREHOLDER DETAILS
          </div>
          <div className="overflow-x-auto mb-5 no-scroll">
            {shareHolderDetails?.length > 0 ? (
              <table className="min-w-full table-auto border-collapse border border-gray-300 print-table">
                <thead>
                  <tr className="bg-background-light-secondary">
                    <th className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                      No.
                    </th>
                    {Object.keys(shareHolderDetails[0]).map((key) => (
                      <th
                        key={key}
                        className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold"
                      >
                        {convertToReadableString(key)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shareHolderDetails.map((shareholder, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-gray-600 text-center">
                        {index + 1}
                      </td>
                      {Object.values(shareholder).map((value, valueIndex) => (
                        <td
                          key={valueIndex}
                          className="border border-gray-300 px-4 py-2 text-gray-600 text-center"
                        >
                          {value || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-600 py-4">
                No Directors Found
              </div>
            )}
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            CREDIT OFFICER COMMENTS
          </div>
          <div className="p-2 mb-5">{creditOfficerComments}</div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            CCO & FO COMMENTS
          </div>
          <div className="p-2 mb-5">{ccoFoComments}</div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            MANAGEMENT CREDIT COMMITTEE’S DECISION
          </div>
          <div className="grid grid-cols-[40%_60%]">
            <div className="border-r border-gray-300 border-b pl-1 pt-1">
              Approved
            </div>
            <div className="border-r border-gray-300 border-b pl-1 pt-1"></div>
            <div className="border-r border-gray-300 pl-1 pt-1">Rejected</div>
            <div></div>
          </div>
          <div className="overflow-x-auto mb-5">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-background-light-secondary">
                  <th className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                    No.
                  </th>
                  {Object.keys(creditCommitteDecision[0]).map((key) => (
                    <th
                      key={key}
                      className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold"
                    >
                      {convertToReadableString(key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {creditCommitteDecision.map((director, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-600 text-center">
                      {index + 1}
                    </td>
                    {Object.values(director).map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="border border-gray-300 px-4 py-2 text-gray-600 text-center"
                      >
                        {value || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-gray-200">
            REQUIREMENTS
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-background-light-secondary">
                  <th className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold">
                    No.
                  </th>
                  {Object.keys(documentsData[0]).map((key) => (
                    <th
                      key={key}
                      className="border border-gray-300 px-4 py-2 text-center text-gray-700 font-semibold"
                    >
                      {convertToReadableString(key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {documentsData.map((item, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-600">
                      {index + 1}
                    </td>
                    {Object.values(item).map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="border border-gray-300 px-4 py-2 text-gray-600 text-center"
                      >
                        {value || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanAgreementPrint;
