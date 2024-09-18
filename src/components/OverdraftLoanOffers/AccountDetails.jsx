import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { activateOverdraftLoanAccount,getOverdraftAccountNumberList, cancelOverdraftLoanAccount, closeOverdraftLoanAccount, getAccountDetails,updateAccountNumber } from "../../redux/Slices/overdraftLoanOffersSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import ListTable from "../Common/ListTable/ListTable";
import convertToReadableString from '../../utils/convertToReadableString'
import InputSelect from "../Common/InputSelect/InputSelect";

function AccountDetails() {
  const { accountDetails, accountNumberList,accountNumber, loading, error } = useSelector(state => state.overdraftLoanOffers)
  const { userID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  console.log(accountDetails)

  useEffect(() => {
    if(!accountNumberList){
      dispatch(getOverdraftAccountNumberList(userID))
    }
  }, [accountNumberList,userID, dispatch]);

  useEffect(() => {
    if (accountNumber) {
      dispatch(getAccountDetails(accountNumber));
    }
  }, [accountNumber, dispatch]);


  const handleActivateOverdraftLoanAccount = (accountNumber, supplementaryAccountsList) => {
    dispatch(activateOverdraftLoanAccount({ accountNumber, supplementaryAccountsList }))
      .unwrap()
      .then(() => {
        navigate(`/overdraft-loan-offers/${userID}/overdraft-details`);
      })
      .catch((error) => {
        console.error("Failed to create overdraft:", error);
      });
  };

  const handleCancelOverdraftLoanAccount = (accountNumber, supplementaryAccountsList) => {
    dispatch(cancelOverdraftLoanAccount({ accountNumber, supplementaryAccountsList }))
      .unwrap()
      .then(() => {
        navigate(`/overdraft-loan-offers/${userID}/overdraft-details`);
      })
      .catch((error) => {
        console.error("Failed to create overdraft:", error);
      });
  };

  const handleCloseOverdraftLoanAccount = (accountNumber, supplementaryAccountsList) => {
    dispatch(closeOverdraftLoanAccount({ accountNumber, supplementaryAccountsList }))
      .unwrap()
      .then(() => {
        navigate(`/overdraft-loan-offers/${userID}/overdraft-details`);
      })
      .catch((error) => {
        console.error("Failed to create overdraft:", error);
      });
  };

  const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || "N/A"}</div>
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateAccountNumber(value))
    dispatch(getAccountDetails(value))
  };


  const {
    accountType,
    balanceAmount,
    currency,
    maximumLimit,
    status,
    supplementaryAccountsList,
    userId,
  } = accountDetails;


  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-5 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer flex justify-between items-center w-full">
        <div className="w-1/4 font-bold">Account Details</div>
        <div className="w-1/4">
          <InputSelect
            labelName="Account Number List"
            inputOptions={accountNumberList}
            inputName="accountNumber"
            inputValue={accountNumber}
            onChange={handleChange}
          />
        </div>

      </div>
      <ContainerTile>
        <div className="grid grid-cols-2 gap-4 text-[14px] pb-2">
          <InfoRow label="Account Number" value={accountNumber} />
          <InfoRow label="Account Type" value={accountType} />
          <InfoRow label="Balance Amount" value={balanceAmount} />
          <InfoRow label="Currency" value={currency?.name} />
          <InfoRow label="Correction Factor" value={currency?.correctionFactor} />
          <InfoRow label="Maximum Limit" value={maximumLimit} />
          <InfoRow label="Status" value={status} />
          <InfoRow label="User ID" value={userId} />
          <div className={supplementaryAccountsList ? "col-span-2" : ""}>
            {supplementaryAccountsList ?
              (<ListTable
                ListName={"Supplementary Accounts List"}
                ListHeader={Object.keys(supplementaryAccountsList[0]).map(item => convertToReadableString(item))}
                ListItem={Object.values(supplementaryAccountsList).map(value => value)}
                Divider={true}
              />) :
              <InfoRow label="Supplementary Accounts List" value={supplementaryAccountsList} />}
          </div>
        </div>
        <div className="mt-5 flex justify-evenly align-middle">
          <Button
            buttonName={"Activate"}
            onClick={() => handleActivateOverdraftLoanAccount(accountNumber, supplementaryAccountsList)}
            rectangle={true}
            className={"bg-green-500"}
          />
          <Button
            buttonName={"Cancel"}
            onClick={() => handleCancelOverdraftLoanAccount(accountNumber, supplementaryAccountsList)}
            rectangle={true}
            className={"bg-red-500"}
          />
          <Button
            buttonName={"Close"}
            onClick={() => handleCloseOverdraftLoanAccount(
              accountNumber, supplementaryAccountsList)
            }
            rectangle={true}
            className={"bg-yellow-500"}
          />

        </div>
      </ContainerTile>
    </>
  );
}

export default AccountDetails;
