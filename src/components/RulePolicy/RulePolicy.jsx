import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MaxFinAmtTen from "./MaxFinAmtTen";
import LengthofService from "./LengthOfService";
import CityCard from "./CityCard";
import OccupationCard from "./OccupationCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchRulePolicyData } from "../../redux/Slices/sidebarSlice";
import {
  fetchRulePolicyData as fetchRPData,
  setRulePolicyId,
  createClone,
  deleteRulePolicy,
  fetchName,
  updateRulePolicyName,
} from "../../redux/Slices/rulePolicySlice";
import RiskBasedPricingEquation from "./RiskBaedPricingEquation";
import RiskBasedPricing from "./RiskBasedPricing";
import { clearValidationError } from "../../redux/Slices/validationSlice";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import CloneModal from "../Common/CloneModal/CloneModal";

const RulePolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { rulePolicyId } = useParams();
  const dispatch = useDispatch();
  const { itemName, cityData, occupationData, FAWTData, loading, error } =
    useSelector((state) => state.rulePolicy);

  useEffect(() => {
    dispatch(fetchName(rulePolicyId));
    dispatch(setRulePolicyId(rulePolicyId));
    dispatch(fetchRPData(rulePolicyId));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DynamicHeader
        itemName={itemName}
        handleNameUpdate={handleUpdateRPName}
        handleClone={handleClone}
        handleDelete={() => handleDelete(rulePolicyId)}
        loading={loading}
        error={error}
      />
      <div className="flex flex-col gap-4 mt-4">
        <CloneModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreateClone={createCloneRP}
          initialName={itemName}
        />
        <MaxFinAmtTen FAWTData={FAWTData} loading={loading} error={error} />
        <RiskBasedPricingEquation loading={loading} error={error} />
        <RiskBasedPricing loading={loading} error={error} />
        <LengthofService loading={loading} error={error} />
        <div className="grid grid-cols-2 gap-8">
          <CityCard cityData={cityData} loading={loading} error={error} />
          <OccupationCard
            occupationData={occupationData}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default RulePolicy;
