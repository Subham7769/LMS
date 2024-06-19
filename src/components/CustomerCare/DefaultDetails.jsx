import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useBorrowerInfo from "../../Utils/useBorrowerInfo";
import LoadingState from "../LoadingState";

const DefaultDetails = () => {
  const url = "/simah-recent-response";
  const CBDetilsData = useBorrowerInfo(url);
  if (CBDetilsData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }
  const defaultDet =
    CBDetilsData.response.message.item[0].rspreport.consumer[0].defaults
      .default;
  return (
    <>
      <table className="divide-y divide-gray-300">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th className="py-3.5 px-2 text-center">No. </th>
            <th className="py-3.5 px-2 text-center ">Product Type</th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Applicant Type
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Account Number
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">Creditor</th>
            <th className="py-3.5 px-2 text-center text-gray-900">Load Date</th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Original Amount at Load Date
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Outstanding Balance
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">Status</th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Settlement Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {defaultDet.map((dd, index) => {
            return (
              <tr
                key={index}
                className="divide-x divide-gray-200 text-center w-full"
              >
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {index + 1}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {dd.dfprd}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {dd.dfcapl}
                  </div>
                </td>
                <td className="py-4 px-2 text-gray-500 whitespace-nowrap">
                  <div
                    title={dd.dfaccno}
                    className="w-[100px] cursor-pointer flex mx-auto hover:text-gray-900"
                  >
                    <div className="w-[84px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {dd.dfaccno}
                    </div>
                    <div>
                      <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {dd.dfcrdtr}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {dd.dfloaddt}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {dd.dforigamt}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {dd.dfcub}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {dd.dfstat}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {dd.dfsettlddate}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DefaultDetails;
