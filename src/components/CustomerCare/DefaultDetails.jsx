import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import LoadingState from "../LoadingState/LoadingState";

const TableHeader = () => (
  <thead>
    <tr className="divide-x divide-gray-200">
      {[
        "No.",
        "Product Type",
        "Applicant Type",
        "Account Number",
        "Creditor",
        "Load Date",
        "Original Amount at Load Date",
        "Outstanding Balance",
        "Status",
        "Settlement Date",
      ].map((header, index) => (
        <th key={index} className="py-3.5 px-2 text-center text-gray-900">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({ dd, index }) => (
  <tr className="divide-x divide-gray-200 text-center w-full">
    <TableCell>{index + 1}</TableCell>
    <TableCell>{dd.dfprd}</TableCell>
    <TableCell>{dd.dfcapl}</TableCell>
    <TableCell>
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
    </TableCell>
    <TableCell>{dd.dfcrdtr}</TableCell>
    <TableCell>{dd.dfloaddt}</TableCell>
    <TableCell>{dd.dforigamt}</TableCell>
    <TableCell>{dd.dfcub}</TableCell>
    <TableCell>{dd.dfstat}</TableCell>
    <TableCell>{dd.dfsettlddate}</TableCell>
  </tr>
);

const TableCell = ({ children }) => (
  <td className="whitespace-nowrap py-4 px-2 text-gray-500">
    <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
      {children}
    </div>
  </td>
);

const DefaultDetails = () => {
  const url = "/simah-recent-response";
  const CBDetilsData = useBorrowerInfo(url);

  if (CBDetilsData.length === 0) {
    return <LoadingState />;
  }

  const defaultDet =
    CBDetilsData.response.message.item[0].rspreport.consumer[0].defaults
      .default;

  return (
    <table className="divide-y divide-gray-300">
      <TableHeader />
      <tbody className="divide-y divide-gray-200 bg-white">
        {defaultDet.map((dd, index) => (
          <TableRow key={dd.dfaccno} dd={dd} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default DefaultDetails;
