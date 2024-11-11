import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreditScore from "./CreditScore";
import CloneModal from "../Common/CloneModal/CloneModal";
import { useDispatch } from "react-redux";
import { fetchCreditScoreEqData } from "../../redux/Slices/sidebarSlice";
import {
  cloneCreditScore,
  deleteCreditScore,
  renameCreditScore,
} from "../../redux/Slices/creditScoreSlice";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";

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
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }
      const CreditScoreDetails = await data.json();
      setCreditScoreName(CreditScoreDetails.name.replace(/-/g, " "));
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
      const response = await dispatch(
        cloneCreditScore({ creditScoreId, cloneCSEName })
      ).unwrap();
      setIsModalOpen(false);
      dispatch(fetchCreditScoreEqData());

      if (response?.creditScoreEqTempId) {
        navigate(`/credit-score/${response.creditScoreEqTempId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRename = async (updatecseName) => {
    try {
      await dispatch(
        renameCreditScore({ creditScoreId, updatecseName })
      ).unwrap();
      setCreditScoreName(updatecseName);
      dispatch(fetchCreditScoreEqData());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteCreditScore(creditScoreId)).unwrap();
      navigate("/credit-score");
      dispatch(fetchCreditScoreEqData());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-3 pt-3">
        <DynamicHeader
          itemName={creditScoreName}
          handleNameUpdate={handleRename}
          handleClone={handleClone}
          handleDelete={handleDelete}
        />
        <CreditScore />
        <CloneModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreateClone={createCloneCSE} // This is where the issue is
          initialName={creditScoreName}
        />
      </div>
    </>
  );
};

export default NewCreatedCreditScore;
