import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const Disbursement = () => {
  const [disbursementData, setdisbursementData] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    userloanID: "",
  });
  const navigate = useNavigate(); // Adding useNavigate for navigation
  const { userID } = useParams();

  const handleDisbursement = async () => {
    const transID = formData.userloanID + "-reactivate";
    const postData = {
      loanId: formData.userloanID,
      status: true,
      transactionId: transID,
      activationType: 2,
      processDate: "2024-05-09 15:18:00",
      amount: formData.amount,
      reconciliationMethod: "mobile wallet",
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-payment-service/lmscarbon/api/v1/borrowers/" +
          userID +
          "/disbursement-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 400) {
        const errorData = await data.json();
        console.log(errorData.message);
        return; // Stop further execution
      }
      if (data.status === 202) {
        console.log("Disbursement done Successfully !!");
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Success"}
            message={"Disbursement done Successfully !!"}
          />
        ));
        setTimeout(() => {
          navigate("/borrower/" + userID + "/loanNpayment");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDisbursementInfo();
  }, []);

  async function getDisbursementInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/" +
          userID +
          "/disbursement",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const json = await data.json();
      setdisbursementData(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(disbursementData);
    setFormData({
      userloanID: disbursementData.loanId,
      amount: disbursementData.principleAmount,
    });
  }, [disbursementData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (disbursementData.length === 0) {
    return <div>Fetching Data</div>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
        <div className="text-lg">Proceed for disbursement</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <InputText
            labelName={"Loan Id"}
            inputName={"userloanID"}
            disabled={true}
            inputValue={formData.userloanID}
            onChange={handleChange}
          />
          <InputNumber
            labelName={"Enter Amount"}
            inputName={"amount"}
            inputValue={formData.amount}
            onChange={handleChange}
            placeHolder={"5000"}
          />
        </div>
        <Button
          rectangle={true}
          buttonName={"Submit"}
          onClick={handleDisbursement}
        />
      </ContainerTile>
    </>
  );
};

export default Disbursement;
