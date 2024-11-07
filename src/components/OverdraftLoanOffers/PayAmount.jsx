import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { payOverdraftLoanAccount,getOverdraftAccountNumberList } from "../../redux/Slices/overdraftLoanOffersSlice";
import LoadingState from "../LoadingState/LoadingState";
import convertToReadableString from '../../utils/convertToReadableString'


const PayAmount = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { userID } = useParams();
  const { payAmount, accountNumberList, loading, error } = useSelector(state => state.overdraftLoanOffers)

  useEffect(() => {
    if (!accountNumberList) {
      dispatch(getOverdraftAccountNumberList(userID))
    }
  }, [dispatch, userID,accountNumberList]);

  const getCurrentFormattedDate = () => {
    const now = new Date();

    // Extract date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Format the date
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const [formData, setFormData] = useState({
    accountNumber: "",
    paidAmount: "",
    transactionId: "test-test-test-test",
    transactionDate: getCurrentFormattedDate(),
    paymentStatus: "SUCCESS",
  });

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
    return <ContainerTile className="text-center">No Pay Amount Account</ContainerTile>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
        <div className="text-lg">Proceed for Pay Amount</div>
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
            inputName={"paidAmount"}
            inputValue={formData.paidAmount}
            onChange={handleChange}
            placeHolder={"5000"}
          />
        </div>
        <Button
          rectangle={true}
          buttonName={"Submit"}
          onClick={() => dispatch(payOverdraftLoanAccount(formData))}
        />
      </ContainerTile>
      {payAmount?.accountStatus && <ContainerTile className={"mt-5"}>
        <div className="grid grid-cols-2 gap-4 text-[14px] pb-2">
          {
            Object.entries(payAmount?.accountStatus).map(([key, value]) => <InfoRow key={key} label={convertToReadableString(key)} value={value} />)
          }
        </div>
      </ContainerTile >}
    </>
  );
};

export default PayAmount;
