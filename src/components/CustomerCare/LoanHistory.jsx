import useBorrowerInfo from "../../utils/useBorrowerInfo";
import LoadingState from "../LoadingState/LoadingState";
import { useEffect, useState, useRef } from "react";
import LoanInfoModal from "./LoanInfoModal";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Common/Button/Button";
import { loanStatusOptions } from "../../data/OptionsData";
import ListTable from "../Common/ListTable/ListTable";

const LoanHistory = () => {
  const { subID } = useParams();
  const navigate = useNavigate();
  const url = "/loans";
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const loanHistoryData = useBorrowerInfo(url);
  const [leftPanelWidth, setLeftPanelWidth] = useState(0);
  const leftPanelWidthRef = useRef(0);


  const [loansarr, setLoansarr] = useState(
    loanHistoryData.map((loan) => ({
      ...loan,
      formattedSubmitDate: "",
      formattedPaidDate: "",
    }))
  );
  useEffect(() => {
    if (loanHistoryData) {
      const formattedLoans = loanHistoryData.map((loan) => {
        const dateObjSubmit = new Date(loan.submitDate);
        const yearSubmit = dateObjSubmit.getFullYear();

        // Month formatting with leading zero and to lowercase
        const monthSubmit = String(dateObjSubmit.getMonth() + 1).padStart(
          2,
          "0"
        );
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
      setFilteredLoansarr(formattedLoans);
    }
  }, [loanHistoryData]);

  const [filteredLoansarr, setFilteredLoansarr] = useState(loansarr);
  const [selectedOption, setSelctedOption] = useState(
    loanStatusOptions[0].value
  );
  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelctedOption(selectedOption);
    if (selectedOption === 0) {
      setFilteredLoansarr(loansarr);
    } else {
      const filterData = loansarr.filter((loanStat) => {
        return loanStat.loanStatus === selectedOption;
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

  if (loanHistoryData.length === 0) {
    return <LoadingState />;
  } else if (loanHistoryData.status === 500) {
    return <div>No data for the request</div>;
  }

  return (
    <>
      <div className="flex items-end mb-10 w-full">
        <div className="w-1/3">&nbsp;</div>
        <div className="w-1/3 flex">
          <div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="block w-full py-1.5 pl-10 pr-3">
                <InputText inputName="search" placeHolder="Search" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-1/3 flex justify-end">
          <div className="w-52">
            <InputSelect
              labelName="Select Loan Status"
              className="w-52"
              inputOptions={loanStatusOptions}
              inputId="loanStatus"
              inputName="loanStatus"
              inputValue={selectedOption}
              onChange={handleChange}
              searchable={false}
            />
          </div>
        </div>
      </div>
      {filteredLoansarr.length === 0 ? (
        <>No Loan Data</>
      ) : (
        <ListTable
          ListHeader={[
            "Loan ID",
            "Loan Status",
            "Loan Type",
            "View Details",
            "Loan Amount",
            "Loan Origination",
            "Loan Disbursement",
            "Outstanding Principal",
            "Missed Installments Number",
            "Clearance Letter",
          ]}
          ListItem={filteredLoansarr.map((loan) => ({
            loanId: loan.loanId,
            loanStatus: loanStatusOptions[loan.loanStatus].label,
            loanType: loan.loanType,
            viewDetails: (
              <>
                <Button
                  buttonName={"View Details"}
                  onClick={() => handleViewDetails(loan)}
                  rectangle={true}
                  className={"text-[10px] px-1"}
                />
                <LoanInfoModal
                  onClose={() => setShowModal(false)}
                  visible={showModal}
                  loanDetails={selectedLoan}
                  mgLeft={leftPanelWidth}
                />
              </>
            ),
            loanAmount: loan.loanAmount.toFixed(2),
            loanOrigination: loan.formattedSubmitDate,
            loanDisbursement: loan.formattedPaidDate,
            outstandingPrincipal: loan.outstandingPrincipal,
            missedInstallMents: loan.missedInstallmentsNumber,
            clearanceLetter: (
              <Button
                buttonName={"PDF"}
                onClick={handleDownloadPdf}
                rectangle={true}
                className={"text-[10px] px-1"}

              />
            ),
          }))}
          Divider={true}
        />
      )}
    </>
  );
};
export default LoanHistory;
