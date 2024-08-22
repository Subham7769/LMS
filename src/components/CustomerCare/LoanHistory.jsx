import LoadingState from "../LoadingState/LoadingState";
import LoanInfoModal from "./LoanInfoModal";
import InputText from "../Common/InputText/InputText";
import InputSelect from "../Common/InputSelect/InputSelect";
import Button from "../Common/Button/Button";
import ListTable from "../Common/ListTable/ListTable";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import { loanStatusOptions } from "../../data/OptionsData";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowerData,downloadClearanceLetter } from "../../redux/Slices/borrowerSlice";

const LoanHistory = () => {
  const { subID } = useParams();
  const dispatch = useDispatch();
  const {loanHistory, downloadLoading, downloadError,error, loading} = useSelector(state => state.customerCare);
  const url = "/loans";
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    dispatch(fetchBorrowerData({ subID, url }))
  }, [dispatch])

  const [loansarr, setLoansarr] = useState(loanHistory.map((loan) => ({
      ...loan,
      formattedSubmitDate: "",
      formattedPaidDate: "",
    }))
  );

  useEffect(() => {
    if (loanHistory) {
      const formattedLoans = loanHistory.map((loan) => {
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
  }, [loanHistory]);

  const [filteredLoansarr, setFilteredLoansarr] = useState(loansarr);
  const [selectedOption, setSelctedOption] = useState(loanStatusOptions[0].value);

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

  const headerList = [
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
  ]

  const itemList = filteredLoansarr.map((loan) => ({
    loanId: loan.loanId,
    loanStatus: loanStatusOptions[loan.loanStatus].label,
    loanType: loan.loanType,
    viewDetails: (
      <>
        <Button
          buttonName={"View Details"}
          onClick={() => handleViewDetails(loan)}
          rectangle={true}
          className={"text-[10px] py-0 px-0"}
        />
        <LoanInfoModal
          onClose={() => setShowModal(false)}
          visible={showModal}
          loanDetails={selectedLoan}
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
        onClick={()=>dispatch(downloadClearanceLetter({ subID, loanId:loan.loanId }))}
        rectangle={true}
        className={"text-[10px] py-0 px-0"}
      />
    ),
  }))

  // Conditional rendering starts after hooks have been defined
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex items-center  w-full justify-between">

        <div className="w-1/3 flex  items-center justify-start mt-4">
          <InputText inputName="search" placeHolder="Search" />
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400 -ml-8 "
            aria-hidden="true"
          />
        </div>
        <div className="w-1/3">&nbsp;</div>
        <div className="w-1/3 flex items-center justify-end">
          <div className="w-full">
            <InputSelect
              labelName="Select Loan Status"
              inputOptions={loanStatusOptions}
              inputId="loanStatus"
              inputName="loanStatus"
              inputValue={selectedOption}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {filteredLoansarr.length === 0 ? (
        <div className="text-center shadow-md bg-gray-100 border-gray-300 border py-5 rounded-xl mt-4 px-5">No Loan Data</div>
      ) : (
        <ListTable
          ListHeader={headerList}
          ListItem={itemList}
          Divider={true}
        />
      )}
    </>
  );
};
export default LoanHistory;
