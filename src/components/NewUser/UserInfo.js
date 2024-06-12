import { useParams } from "react-router-dom";
import useUserInfo from "../utils/useUserInfo";
import LoadingState from "../LoadingState";

const UserInfo = () => {
  const { userID } = useParams();
  const url = "/check-eligibility";
  const methodType = "POST";
  const eligibilityData = useUserInfo(url, methodType);
  if (eligibilityData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div>
          <img
            className="rounded-full w-12"
            src="https://lmscarbon.com/assets/index.png"
            alt=""
          />
        </div>
        <div className="text-xl">User Id : {userID}</div>
      </div>
      <table className="divide-y divide-gray-300">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th className="py-3.5 px-4 text-center">Product Name</th>
            <th className="py-3.5 px-4 text-center ">
              Pre Registration Eligibility Status
            </th>
            <th className="py-3.5 px-4 text-center ">Comments</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {eligibilityData.eligibilityResults.projects.map(
            (eligible, index) => {
              return (
                <tr
                  key={index}
                  className="divide-x divide-gray-200 text-center w-full"
                >
                  <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                    <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      {eligible.projectName}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                    <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      {/* {eligible.eligibleStatus.replace(/_/g, " ")} */}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                    <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                      {eligible.inEligibilityReasons?.join(", ")}
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
