import React, { useEffect } from "react";
import { convertDate } from "../../../utils/convertDate";
import longHornLogo from "../../../assets/image/longhorn-logo.png";
import formatNumber from "../../../utils/formatNumber";
import convertToReadableString from "../../../utils/convertToReadableString";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDisbursementFile } from "../../../redux/Slices/personalLoansSlice";

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

const DisbursementFilePrint = () => {
  const dispatch = useDispatch();
  const { loanApplicationId, userId } = useParams();
  const { disbursement, loading } = useSelector((state) => state.personalLoans);
  const location = useLocation();
  useEffect(() => {
    dispatch(getDisbursementFile({ loanId: loanApplicationId, uid: userId }));

    if (!location.pathname.includes("loan-origination-system")) {
      const timeoutId = setTimeout(() => {
        window.print();
      }, 1500);

      // Cleanup to avoid potential memory leaks
      return () => clearTimeout(timeoutId);
    }
    // dispatch, loanApplicationId, userId,
  }, [location.pathname]);

  if (loading || (disbursement && Object.keys(disbursement).length === 0)) {
    return (
      <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
        <ShimmerTable />
        <ShimmerTable />
        <ShimmerTable />
      </div>
    );
  }

  const transformedDisbursementDetails = disbursement?.disbursementDetails?.map(
    (dbDetails) => {
      return {
        ...dbDetails,
        loanProcessDate: convertDate(dbDetails.loanProcessDate),
        disbursementDate: convertDate(dbDetails.disbursementDate),
        loanAmount: formatNumber(dbDetails.loanAmount),
        disburseLoanAmount: formatNumber(dbDetails.disburseLoanAmount),
      };
    }
  );
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        {/* Header with Logo and Title */}
        <div className="flex w-full items-center relative">
          <div className="absolute left-0 top-0">
            <img src={longHornLogo} className="w-32" />
          </div>
          <div className="font-semibold text-center flex-1">
            <div>Credit Unit</div>
            <div className="flex justify-center gap-10 mt-3">
              <div>LOAN DISBURSEMENT SHEET</div>
              <div>DATE: {convertDate(disbursement.disbursementDate)}</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mb-5 no-scroll w-[99%] text-center">
          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table mb-5">
            <thead>
              <tr className="bg-background-light-secondary">
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  No.
                </th>
                {Object.keys(transformedDisbursementDetails[0]).map((key) => (
                  <th
                    key={key}
                    className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold"
                  >
                    {convertToReadableString(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transformedDisbursementDetails.map((dbDetails, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                    {index + 1}
                  </td>
                  {Object.values(dbDetails).map((value, valueIndex) => (
                    <td
                      key={valueIndex}
                      className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table mb-5 text-left">
            <tbody>
              <tr>
                <td>Approved by (Name and Signature):</td>
                <td className="border-b border-gray-400 mr-5">
                  {disbursement.approvedByName}
                </td>
                <td className="text-center">
                  Date: {convertDate(disbursement.approvedByDate)}
                </td>
              </tr>
              <tr>
                <td>Position:</td>
                <td>{disbursement.approvedByPosition}</td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table mb-5 text-left">
            <tbody>
              <tr>
                <td>Disbursed by (Name and Signature):</td>
                <td className="border-b border-gray-400 mr-5">
                  {disbursement.disbursedByName}
                </td>
                <td className="text-center">
                  Date: {convertDate(disbursement.disbursedByDate)}
                </td>
              </tr>
              <tr>
                <td>Position:</td>
                <td>{disbursement.disbursedByPosition}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DisbursementFilePrint;
