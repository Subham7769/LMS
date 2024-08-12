import React, { useState, useEffect } from "react";
import DynamicName from "../Common/DynamicName/DynamicName";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import RulePolicy from "./RulePolicy";
import CloneModal from "../Common/CloneModal/CloneModal";
import Button from "../Common/Button/Button";
import { fetchRulePolicyData } from "../../redux/Slices/sidebarSlice";
import { useDispatch } from "react-redux";

const NewRulePolicy = () => {
  const [rulePolicyName, setRulePolicyName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rulePolicyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getCSEInfo();
  }, [rulePolicyId]);

  async function getCSEInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp/id/" +
          rulePolicyId,
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
      setRulePolicyName(CreditScoreDetails.name.replace(/-/g, " "));
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

  const createCloneRP = async (cloneRPName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_CREATE_CLONE}${rulePolicyId}/clone/${cloneRPName}`,
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
      const rpDetails = await data.json();
      console.log(rpDetails);
      dispatch(fetchRulePolicyData())

      navigate("/rule-policy/" + rpDetails.rulePolicyTempId);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRPName = async (updateRPName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_NAME_UPDATE}${rulePolicyId}/name/${updateRPName}`,
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
      const rpDetails = await data.json();
      console.log(rpDetails);
      getCSEInfo()
      dispatch(fetchRulePolicyData())

      navigate("/rule-policy/" + rpDetails.rulePolicyTempId);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_DELETE}${deleteURL}`,
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
      dispatch(fetchRulePolicyData())
      navigate("/rule-policy");
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
      <div className="flex justify-between items-center">
        <DynamicName initialName={rulePolicyName} onSave={handleUpdateRPName} />
        <div className="flex gap-6">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button
            buttonIcon={TrashIcon}
            onClick={() => handleDelete(rulePolicyId)}
            circle={true}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-4">
        <CloneModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreateClone={createCloneRP}
          initialName={rulePolicyName}
        />
        <RulePolicy />
      </div>
    </>
  );
};

export default NewRulePolicy;
