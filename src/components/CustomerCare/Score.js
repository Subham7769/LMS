import { CBDetails } from "../../config";

const Score = () => {
  const score = CBDetails.response.message.item[0].rspreport.consumer[0].score;
  return (
    <>
      <div className="shadow-md rounded-xl py-5 px-10 border border-red-600 w-fit mx-auto">
        <div className="flex gap-10">
          <div className="py-2 pr-10 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-1.5">
              <div className="w-32">Score : </div>
              <div>{score.scscore}</div>
            </div>
            <div className="flex gap-2 py-1.5">
              <div className="w-32">Score Card : </div>
              <div>{score.scscorecard}</div>
            </div>
            <div className="flex gap-2 py-1.5">
              <div className="w-32">Score Index : </div>
              <div>{score.scscoreindex}</div>
            </div>
          </div>
          <div className="py-2 flex flex-col">
            <div className="flex gap-2 py-1.5">
              <div className="w-40">Minimum Score : </div>
              <div>{score.scminimum}</div>
            </div>
            <div className="flex gap-2 py-1.5">
              <div className="w-40">Maximum Score : </div>
              <div>{score.scmaximum}</div>
            </div>
            <div className="flex gap-2 py-1.5">
              <div className="w-40">Reason Codes : </div>
              <div>{score.screasoncodes.screasoncode.join(" ")}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Score;
