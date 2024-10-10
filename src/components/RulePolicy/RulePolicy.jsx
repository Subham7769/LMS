import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MaxFinAmtTen from "./MaxFinAmtTen";
import LengthofService from "./LengthOfService";
import CityCard from "./CityCard";
import OccupationCard from "./OccupationCard";
import { Toaster } from "react-hot-toast";
import LoadingState from "../LoadingState/LoadingState";
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

  if (loading) {
    return <LoadingState />;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <MaxFinAmtTen FAWTData={FAWTData} />
      <RiskBasedPricingEquation />
      <RiskBasedPricing />
      <LengthofService />
      <div className="flex gap-8 w-full">
        <CityCard cityData={cityData} />
        <OccupationCard occupationData={occupationData} />
      </div>
    </>
  );
};

export default CreditPolicy;
