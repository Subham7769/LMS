import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MaxFinAmtTen from "./MaxFinAmtTen";
import LengthofService from "./LengthOfService";
import CityCard from "./CityCard";
import OccupationCard from "./OccupationCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRulePolicyData,
  setRulePolicyId,
} from "../../redux/Slices/rulePolicySlice";
import RiskBasedPricingEquation from "./RiskBaedPricingEquation";
import RiskBasedPricing from "./RiskBasedPricing";
import { clearValidationError } from "../../redux/Slices/validationSlice";

const CreditPolicy = () => {
  const { rulePolicyId } = useParams();
  const dispatch = useDispatch();
  const { cityData, occupationData, FAWTData, loading, error } = useSelector(
    (state) => state.rulePolicy
  );

  useEffect(() => {
    dispatch(setRulePolicyId(rulePolicyId));
    dispatch(fetchRulePolicyData(rulePolicyId));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, rulePolicyId]);

  return (
    <>
      <MaxFinAmtTen FAWTData={FAWTData} loading={loading} error={error} />
      <RiskBasedPricingEquation loading={loading} error={error} />
      <RiskBasedPricing loading={loading} error={error} />
      <LengthofService loading={loading} error={error} />
      <div className="grid grid-cols-2 gap-8">
        <CityCard cityData={cityData} loading={loading} error={error} />
        <OccupationCard occupationData={occupationData} loading={loading} error={error} />
      </div>
    </>
  );
};

export default CreditPolicy;
