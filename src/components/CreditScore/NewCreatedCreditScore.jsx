import React, { useState, useEffect } from "react";
import DynamicName from "../Common/DynamicName/DynamicName";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import CreditScore from "./CreditScore";
import Button from "../Common/Button/Button";
import CloneModal from "../Common/CloneModal/CloneModal";
import { fetchCreditScoreEqData } from "../../redux/Slices/sidebarSlice";
import { useDispatch } from "react-redux";

const NewCreatedCreditScore = () => {
  const [creditScoreName, setCreditScoreName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { creditScoreId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getCSEInfo();
  }, [creditScoreId]);

  async function getCSEInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_READ_BY_ID}${creditScoreId}`,
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
      const CreditScoreDetails = await data.json();
      setCreditScoreName(CreditScoreDetails.name.replace(/-/g, " "));
      // console.log(CreditScoreEqData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createCloneCSE = async (cloneCSEName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_CREATE_CLONE}${creditScoreId}/clone/${cloneCSEName}`,
        {
          method: "POST",
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
      const cseDetails = await data.json();
      console.log(cseDetails);
      dispatch(fetchCreditScoreEqData())

      navigate("/credit-score/" + cseDetails.creditScoreEqTempId);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCSE = async (updatecseName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_NAME_UPDATE}${creditScoreId}/name/${updatecseName}`,
        {
          method: "PUT",
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
      const cseDetails = await data.json();
      console.log(cseDetails);
      navigate("/credit-score/" + cseDetails.creditScoreEqTempId);
      dispatch(fetchCreditScoreEqData())
      getCSEInfo()
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (creditScoreId) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_DELETE}${creditScoreId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the item");
      }
      dispatch(fetchCreditScoreEqData())

      navigate("/credit-score");
      // Refresh the page after navigation
      // window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };
  return (
    <>
      <div className="flex justify-between items-baseline border-b border-gray-300 pb-5">
        <DynamicName initialName={creditScoreName} onSave={handleUpdateCSE} />
        <div className="flex items-center justify-between gap-6">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button
            buttonIcon={TrashIcon}
            onClick={() => handleDelete(creditScoreId)}
            circle={true}
            className={
              "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
            }
          />
        </div>
      </div>
      <div className="mt-4">
        <CloneModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreateClone={createCloneCSE}
          initialName={creditScoreName}
        />
        <CreditScore />
      </div>
    </>
  );
};

export default NewCreatedCreditScore;
