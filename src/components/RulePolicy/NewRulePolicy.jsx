import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RulePolicy from "./RulePolicy";
import CloneModal from "../Common/CloneModal/CloneModal";
import { fetchRulePolicyData } from "../../redux/Slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createClone,
  deleteRulePolicy,
  fetchName,
  updateRulePolicyName,
} from "../../redux/Slices/rulePolicySlice";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";

const NewRulePolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rulePolicyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemName } = useSelector((state) => state.rulePolicy);

  useEffect(() => {
    dispatch(fetchName(rulePolicyId));
  }, [dispatch, rulePolicyId]);

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createCloneRP = async (cloneRPName) => {
    try {
      const Details = await dispatch(
        createClone({ rulePolicyId, cloneRPName })
      ).unwrap();
      dispatch(fetchRulePolicyData());
      navigate("/rule-policy/" + Details.rulePolicyTempId);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRPName = async (updateRPName) => {
    try {
      await dispatch(
        updateRulePolicyName({ rulePolicyId, updateRPName })
      ).unwrap();
      dispatch(fetchName(rulePolicyId));
      dispatch(fetchRulePolicyData());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (rulePolicyId) => {
    try {
      await dispatch(deleteRulePolicy(rulePolicyId)).unwrap();
      dispatch(fetchRulePolicyData());
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
      <DynamicHeader
        itemName={itemName}
        handleNameUpdate={handleUpdateRPName}
        handleClone={handleClone}
        handleDelete={() => handleDelete(rulePolicyId)}
      />
      <div className="flex flex-col gap-8 mt-4">
        <CloneModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreateClone={createCloneRP}
          initialName={itemName}
        />
        <RulePolicy />
      </div>
    </>
  );
};

export default NewRulePolicy;
