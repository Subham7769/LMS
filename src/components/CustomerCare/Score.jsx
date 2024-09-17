import React from "react";
import LoadingState from "../LoadingState/LoadingState";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useSelector } from "react-redux";
import SectionErrorBoundary from "../ErrorBoundary/SectionErrorBoundary";

const Score = () => {
  const { CreditBureauDetails, loading, error } = useSelector(
    (state) => state.customerCare
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  if (
    CreditBureauDetails.length === 0 ||
    CreditBureauDetails.response.length === 0
  ) {
    return <LoadingState />;
  }

  // Subcomponents for cleaner structure
  const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || "N/A"}</div>
    </div>
  );

  const { score } =
    CreditBureauDetails?.response?.message?.item[0]?.rspreport?.consumer[0];
  const {
    scscore,
    scscorecard,
    scscoreindex,
    scminimum,
    scmaximum,
    screasoncodes,
  } = score;

  const Content = () => (
    <>
      <InfoRow label="Score" value={scscore} />
      <InfoRow label="Score Card" value={scscorecard} />
      <InfoRow label="Score Index" value={scscoreindex} />
      <InfoRow label="Minimum Score" value={scminimum} />
      <InfoRow label="Maximum Score" value={scmaximum} />
      <InfoRow
        label="Reason Codes"
        value={screasoncodes.screasoncode.join(" ")}
      />
    </>
  );

  return (
    <ContainerTile>
      <div className="grid grid-cols-2 gap-4 text-[14px]">
        <SectionErrorBoundary>
          <Content />
        </SectionErrorBoundary>
      </div>
    </ContainerTile>
  );
};

export default Score;
