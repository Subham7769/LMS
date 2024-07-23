import { useEffect, useState, useRef } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import LoanInfoModal from "./LoanInfoModal";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Common/Button/Button";

const loanStatusOptions = [
  { value: 0, label: "All" },
  { value: 1, label: "Pending Approval" },
  { value: 2, label: "Activated" },
  { value: 3, label: "Closed" },
  { value: 4, label: "Frozen" },
  { value: 5, label: "Roll Overed" },
  { value: 6, label: "Cancelled" },
  { value: 7, label: "Late" },
  { value: 8, label: "Returned" },
  { value: 9, label: "Defaulted" },
];

const LoanHistoryComp = ({ loanHistoryData }) => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(0);
  const leftPanelWidthRef = useRef(0);

  useEffect(() => {
    const leftPanel = document.getElementById("SideBarId");

    const resizeObserver = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      setLeftPanelWidth(newWidth); // Update state with padding
      leftPanelWidthRef.current = newWidth; // Update reference
    });

    resizeObserver.observe(leftPanel);

    return () => resizeObserver.disconnect(); // Cleanup on unmount
  }, []);

  const [loansarr, setLoansarr] = useState(
    loanHistoryData.map((loan) => ({
      ...loan,
      formattedSubmitDate: "",
      formattedPaidDate: "",
    }))
  );
  useEffect(() => {
    const formattedLoans = loansarr.map((loan) => {
      const dateObjSubmit = new Date(loan.submitDate);
      const yearSubmit = dateObjSubmit.getFullYear();

      // Month formatting with leading zero and to lowercase
      const monthSubmit = String(dateObjSubmit.getMonth() + 1).padStart(2, "0");
      const monthNameSubmit = new Date(
        yearSubmit,
        monthSubmit - 1
      ).toLocaleString("en-US", { month: "short" });
      const daySubmit = String(dateObjSubmit.getDate()).padStart(2, "0");
      const formattedSubmitDate = `${daySubmit} ${monthNameSubmit} ${yearSubmit}`;

      const dateObjPaid = new Date(loan.paidDate); // Assuming paidDate exists
      const yearPaid = dateObjPaid.getFullYear();
      const monthPaid = String(dateObjPaid.getMonth() + 1).padStart(2, "0");
      const monthNamePaid = new Date(yearPaid, monthPaid - 1).toLocaleString(
        "en-US",
        { month: "short" }
      );
      const dayPaid = String(dateObjPaid.getDate()).padStart(2, "0");
      const formattedPaidDate = `${dayPaid} ${monthNamePaid} ${yearPaid}`;

      return {
        ...loan,
        formattedSubmitDate: formattedSubmitDate,
        formattedPaidDate: formattedPaidDate,
      };
    });
    setLoansarr(formattedLoans);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const [filteredLoansarr, setFilteredLoansarr] = useState(loansarr);
  const [selectedOption, setSelctedOption] = useState(loanStatusOptions[0]);
  const handleChange = (selectedOption) => {
    setSelctedOption(selectedOption);
    if (selectedOption.value === 0) {
      setFilteredLoansarr(loansarr);
    } else {
      const filterData = loansarr.filter((loanStat) => {
        return loanStat.loanStatus === selectedOption.value;
      });
      setFilteredLoansarr(filterData);
    }
  };

  useEffect(() => {
    setFilteredLoansarr(loansarr);
  }, [loansarr]);

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  const { subID } = useParams();
  const navigate = useNavigate();
  const handleDownloadPdf = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const url =
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/borrowers/clearance-letter/" +
        subID +
        "/" +
        filteredLoansarr.loanId;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "clearance_letter.pdf"); // You can rename the downloaded file here
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <div className="flex items-end mb-10 w-full">
        <div className="w-1/3">&nbsp;</div>
        <div className="w-1/3 flex">
          <div>
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <div className="relative w-1/3 flex justify-end">
          <div>
            <label
              htmlFor="loanStatus"
              className=" bg-white px-1 text-xs text-gray-900 gray-"
            >
              Select Loan Status
            </label>
            <Select
              className="w-52"
              options={loanStatusOptions}
              id="loanStatus"
              name="loanStatus"
              value={selectedOption}
              onChange={handleChange}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      {filteredLoansarr.length === 0 ? (
        <>No Loan Data</>
      ) : (
        <table className="divide-y divide-gray-300">
          <thead>
            <tr className="divide-x divide-gray-200">
              <th className="py-3.5 px-2 text-center">Loan ID</th>
              <th className="py-3.5 px-2 text-center ">Loan Status</th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Loan Type
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                View Details
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Loan Amount
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Loan Origination
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Loan Disbursement
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Outstanding Principal
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Missed Installments Number
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Clearnace Letter
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredLoansarr.map((loan) => {
              return (
                <tr
                  key={loan.loanId}
                  className="divide-x divide-gray-200 text-center w-full"
                >
                  <td className="py-4 px-2 text-gray-500 whitespace-nowrap">
                    <div
                      title={loan.loanId}
                      className="w-[100px] cursor-pointer flex mx-auto hover:text-gray-900"
                    >
                      <div className="w-[84px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {loan.loanId}
                      </div>
                      <div>
                        <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                    <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      {loanStatusOptions[loan.loanStatus].label}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                    <div
                      title={loan.loanType}
                      className="w-[100px] cursor-pointer flex mx-auto hover:text-gray-900"
                    >
                      <div className="w-[84px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {loan.loanType}
                      </div>
                      <div>
                        <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                    <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      <Button buttonName={"View Details"} onClick={() => handleViewDetails(loan)} rectangle={true} />
                    </div>
                    <LoanInfoModal
                      onClose={() => setShowModal(false)}
                      visible={showModal}
                      loanDetails={selectedLoan}
                      mgLeft={leftPanelWidth}
                    />
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                    <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      {loan.loanAmount.toFixed(2)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                    <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      {loan.formattedSubmitDate}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                    <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      {loan.formattedPaidDate}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                    <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      {loan.outstandingPrincipal}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                    <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      {loan.missedInstallmentsNumber}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                    <div
                      className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis" >
                      <Button buttonName={"PDF"} onClick={handleDownloadPdf} rectangle={true} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
export default LoanHistoryComp;
