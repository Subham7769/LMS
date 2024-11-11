import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { getOverdraftAccountNumberList, debitOverdraftLoanAccount } from "../../redux/Slices/overdraftLoanOffersSlice";
import LoadingState from "../LoadingState/LoadingState";
import convertToReadableString from '../../utils/convertToReadableString'


const DebitAmount = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { userID } = useParams();
  const { debitAmount, accountNumberList, loading, error } = useSelector(state => state.overdraftLoanOffers)

  const [formData, setFormData] = useState({
    accountNumber: "",
    debitAmount: "",
    transactionId: "test-test-test-test",
  });

  useEffect(() => {
    if (!accountNumberList) {
      dispatch(getOverdraftAccountNumberList(userID))
    }
  }, [dispatch, userID, accountNumberList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || "N/A"}</div>
    </div>
  );

  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  // if (error) {
  //   return <ContainerTile>Error: {error}</ContainerTile>;
  // }

  if (accountNumberList?.length < 1) {
    return <ContainerTile className="text-center">No Debit Amount Account</ContainerTile>;
  }

  return (
    <>
      <ContainerTile>
        <div className="text-lg">Proceed for Debit Amount</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <InputSelect
            labelName="Account Number List"
            inputOptions={accountNumberList}
            inputName="accountNumber"
            inputValue={formData.accountNumber}
            onChange={handleChange}
          />
          <InputNumber
            labelName={"Enter Amount"}
            inputName={"debitAmount"}
            inputValue={formData.debitAmount}
            onChange={handleChange}
            placeHolder={"5000"}
          />
        </div>
        <Button
          rectangle={true}
          buttonName={"Submit"}
          onClick={() => dispatch(debitOverdraftLoanAccount(formData))}
        />
      </ContainerTile>
      {debitAmount?.accountStatus && <ContainerTile className={"mt-5"}>
        <div className="grid grid-cols-2 gap-4 text-[14px] pb-2">
          {
            Object.entries(debitAmount?.accountStatus).map(([key, value]) => <InfoRow key={key} label={convertToReadableString(key)} value={value} />)
          }
        </div>
      </ContainerTile >}
    </>
  );
};

export default DebitAmount;
