import React from "react";
import LoadingState from "../LoadingState/LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";

const Score = () => {
  const url = "/simah-recent-response";
  const CBDetailsData = useBorrowerInfo(url);

  if (CBDetailsData.length === 0 || CBDetailsData.response.length === 0) {
    return <LoadingState />;
  }

  const { score } =
    CBDetailsData.response.message.item[0].rspreport.consumer[0];
  const {
    scscore,
    scscorecard,
    scscoreindex,
    scminimum,
    scmaximum,
    screasoncodes,
  } = score;

  return (
    <div className="shadow-md rounded-xl py-5 px-10 border border-red-600 w-fit mx-auto">
      <div className="flex gap-10">
        <div className="py-2 pr-10 flex flex-col border-r border-gray-300">
          <ScoreDetail label="Score" value={scscore} />
          <ScoreDetail label="Score Card" value={scscorecard} />
          <ScoreDetail label="Score Index" value={scscoreindex} />
        </div>
        <div className="py-2 flex flex-col">
          <ScoreDetail label="Minimum Score" value={scminimum} />
          <ScoreDetail label="Maximum Score" value={scmaximum} />
          <ScoreDetail
            label="Reason Codes"
            value={screasoncodes.screasoncode.join(" ")}
          />
        </div>
      </div>
    </div>
  );
};

const ScoreDetail = ({ label, value }) => (
  <div className="flex gap-2 py-1.5">
    <div className="w-32">{label}:</div>
    <div>{value}</div>
  </div>
);

export default Score;
