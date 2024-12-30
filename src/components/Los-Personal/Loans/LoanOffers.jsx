import InstallmentSummery from "./InstallmentSummery";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../Common/Button/Button";
import {
  fetchLoanProductData,
  getLoanOffers,
  handleProceed,
  updateLoanOfferFields,
} from "../../../redux/Slices/personalLoansSlice";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { fetchAllBorrowers } from "../../../redux/Slices/personalBorrowersSlice";

const LoanOffers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallmentData, setSelectedInstallmentData] = useState(null);
  const [borrowerOptions, setBorrowerOptions] = useState([]);
  const { userID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  const {
    loanProductOptions,
    loanConfigData,
    loanOfferFields,
    loading,
    error,
  } = useSelector((state) => state.personalLoans);
  const { allBorrowersData } = useSelector((state) => state.personalBorrowers);

  useEffect(() => {
    dispatch(fetchLoanProductData());
    dispatch(fetchAllBorrowers({ page: 0, size: 20 }));
  }, [dispatch]);

  useEffect(() => {
    const options = allBorrowersData.map((item) => ({
      label: `${item.borrowerProfile?.personalDetails?.title} ${item.borrowerProfile?.personalDetails?.surname} ${item.borrowerProfile?.personalDetails?.otherName}`,
      value: item.uid,
    }));

    setBorrowerOptions(options);
  }, [allBorrowersData]);

  const SubmitProceed = async (transactionId, index) => {
    const uid = loanOfferFields.uid;
    const proceedPayload = {
      transactionId: transactionId,
    };
    await dispatch(handleProceed({ proceedPayload, uid })).unwrap();
    navigate(`/loan/loan-origination-system/personal/loans/approve-loans`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateLoanOfferFields({ name, value }));
  };

  const handleGetOffers = () => {
    dispatch(getLoanOffers(loanOfferFields));
  };

  const handleInstallmentModal = (data) => {
    setIsModalOpen(true);
    setSelectedInstallmentData(data); // Set the selected installment data
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstallmentData(null); // Clear the data when closing the modal
  };

  const InfoRow = ({ label, value }) => (
    <div className="grid grid-cols-2 py-2">
      <div>{label}:</div>
      <div>{value}</div>
    </div>
  );

  return (
    <>
      <ContainerTile className={"mb-5"} loading={loading}>
        <div className="grid grid-cols-3 gap-5 items-end">
          <InputSelect
            labelName={"Loan Product"}
            inputName="loanProductId"
            inputOptions={loanProductOptions}
            inputValue={loanOfferFields.loanProductId}
            onChange={handleChange}
          />
          <InputSelect
            labelName={"Borrower"}
            inputName="uid"
            inputOptions={borrowerOptions}
            inputValue={loanOfferFields.uid}
            onChange={handleChange}
          />
          <div>
            <Button
              buttonName="Get Offers"
              onClick={handleGetOffers}
              rectangle={true}
            />
          </div>
        </div>
      </ContainerTile>
      {loanConfigData?.message === "No loan offers in cache" ? (
        <ContainerTile loading={loading}>
          <div className="text-center">No loan offers available</div>
        </ContainerTile>
      ) : Object.keys(loanConfigData || {}).length > 0 ? (
        <div className="flex flex-col gap-5 mt-4">
          <div className="grid grid-cols-2 gap-5">
            <ContainerTile loading={loading}>
              <div className="font-semibold text-center -mt-3 mb-3">
                Profile :{" "}
              </div>
              <div className="grid grid-cols-2 gap-5 text-[14px]">
                <InfoRow
                  label="Cash Credit Score"
                  value={loanConfigData?.profile?.cashCreditScore}
                />
                <InfoRow
                  label="Cash TCL"
                  value={loanConfigData?.profile?.cashTCL}
                />
                <InfoRow
                  label="Net Cash TCL"
                  value={loanConfigData?.profile?.netCashTCL}
                />
              </div>
            </ContainerTile>
            <ContainerTile loading={loading}>
              <div className="font-semibold text-center -mt-3 mb-3">
                Cash Loan Stats :{" "}
              </div>
              <div className="grid grid-cols-2 gap-5 text-[14px]">
                <InfoRow
                  label="Max Loan Amount"
                  value={loanConfigData?.cashLoanStats?.maxLoanAmount.toFixed(
                    2
                  )}
                />
                <InfoRow
                  label="Min Loan Amount"
                  value={loanConfigData?.cashLoanStats?.minLoanAmount.toFixed(
                    2
                  )}
                />
                <InfoRow
                  label="Max Loan Duration Days"
                  value={loanConfigData?.cashLoanStats?.maxLoanDuration}
                />
                <InfoRow
                  label="Min Loan Duration Days"
                  value={loanConfigData?.cashLoanStats?.minLoanDuration}
                />
                <InfoRow
                  label="Max Tenure Months"
                  value={loanConfigData?.cashLoanStats?.maxTenure}
                />
                <InfoRow
                  label="Min Tenure Months"
                  value={loanConfigData?.cashLoanStats?.minTenure}
                />
              </div>
            </ContainerTile>
          </div>
          <ContainerTile loading={loading}>
            <div className="font-semibold text-center -mt-3 mb-3">
              Dynamic Cash Loan Offers Stats
            </div>
            <div className="grid grid-cols-2 gap-5 text-[14px]">
              {loanConfigData?.dynamicCashLoanOffers?.map((ci, index) => (
                <React.Fragment key={index}>
                  <InfoRow label="Transaction Id" value={ci?.transactionId} />
                  <InfoRow
                    label="Annual Flat Rate Percent"
                    value={ci?.annualFlatRatePercent}
                  />
                  <InfoRow
                    label="Annual Interest Rate Percent"
                    value={ci?.annualInterestRatePercent}
                  />
                  <InfoRow
                    label="Annual Interest Rate Percent Without Fee"
                    value={ci?.annualInterestRatePercentWithoutFee}
                  />
                  <InfoRow
                    label="APR As Per Tenure Percent"
                    value={ci?.aprAsPerTenorPercent}
                  />
                  <InfoRow
                    label="APR Per Month Percent"
                    value={ci?.aprPerMonthPercent}
                  />
                  <InfoRow
                    label="APR Without Fee Per Month Percent"
                    value={ci?.aprWithoutFeePerMonthPercent}
                  />
                  <InfoRow
                    label="Average Number Of Installments"
                    value={ci?.avrageNumberOfenstallment}
                  />
                  <InfoRow
                    label="Daily Interest Rate"
                    value={ci?.dailyInterestRate}
                  />
                  <InfoRow
                    label="Daily Interest Rate Percent Without Fee"
                    value={ci?.dailyInterestRatePercentWithoutFee}
                  />
                  <InfoRow label="Duration" value={ci?.duration} />
                  <InfoRow
                    label="Duration In Months"
                    value={ci?.durationInMonths}
                  />
                  <InfoRow label="Tenure" value={ci?.instalmentsNumber} />
                  <InfoRow
                    label="Installments Summary Response"
                    value={
                      <span
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() =>
                          handleInstallmentModal(ci?.installmentSummaryResponse)
                        }
                      >
                        EMI Details
                      </span>
                    }
                  />
                  <InfoRow label="Loan Flat Rate" value={ci?.loanFlatRate} />
                  <InfoRow
                    label="Monthly Flat Rate Percent"
                    value={ci?.monthlyFlatRatePercent}
                  />
                  <InfoRow
                    label="Monthly Interest Rate Percent"
                    value={ci?.monthlyInterestRatePercent}
                  />
                  <InfoRow
                    label="Monthly Interest Rate Percent Without Fee"
                    value={ci?.monthlyInterestRatePercentWithoutFee}
                  />
                  <InfoRow
                    label="Principal Amount"
                    value={ci?.principalAmount}
                  />
                  <InfoRow label="Schema" value={ci?.schema} />
                  <InfoRow label="Service Fee" value={ci?.serviceFee} />
                  <InfoRow label="Service Fee Tax" value={ci?.serviceFeeTax} />
                  <InfoRow
                    label="Total Interest Amount"
                    value={ci?.totalInterestAmount}
                  />
                  <InfoRow
                    label="Total Loan Amount"
                    value={ci?.totalLoanAmount}
                  />
                  <InfoRow
                    label="Total Management Fee"
                    value={ci?.totalManagementFee}
                  />
                  <InfoRow
                    label="Total Management VAT Fee"
                    value={ci?.totalManagementVatFee}
                  />
                  <div className="text-right mt-5">
                    <Button
                      buttonName="Proceed"
                      onClick={() => SubmitProceed(ci.transactionId, index)}
                      rectangle={true}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
            {isModalOpen && selectedInstallmentData && (
              <InstallmentSummery
                isOpen={isModalOpen}
                onClose={closeModal}
                installmentConfigData={selectedInstallmentData}
              />
            )}
          </ContainerTile>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoanOffers;
