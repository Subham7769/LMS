import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { XCircleIcon, CalendarIcon } from "@heroicons/react/24/outline";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector } from "react-redux";
import { convertDate } from "../../../utils/convertDate";
import formatNumber from "../../../utils/formatNumber";

const InstallmentSummery = ({ onClose, installmentConfigData }) => {
  const { loanConfigData } = useSelector((state) => state.personalLoans);
  const columns = [
    { label: "EMI No.", field: "emiNo" },
    { label: "Date", field: "installmentDate" },
    { label: "Principal", field: "principalValue" },
    { label: "Interest", field: "interestValue" },
    { label: "Outstanding", field: "totalOutstandingAmount" },
    { label: "EMI Amount", field: "installmentValue" },
  ];

  const dataWithEmiNo = installmentConfigData.map((item, index) => ({
    ...item,
    emiNo: index + 1,
    principalValue: formatNumber(item.principalValue),
    interestValue: formatNumber(item.interestValue),
    totalOutstandingAmount: formatNumber(item.totalOutstandingAmount),
    installmentValue: formatNumber(item.installmentValue),
    installmentDate: convertDate(item.installmentDate),
  }));

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-500 border-y-2 p-5">
      <div className="grid grid-cols-4">
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Management Fee</p>
          <p className="text-lg font-semibold text-black">
            $ {rowData.managementFee}
          </p>
        </div>
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Vat Fee</p>
          <p className="text-lg font-semibold text-black">$ {rowData.vatFee}</p>
        </div>
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Third Party Cost</p>
          <p className="text-lg font-semibold text-black">
            $ {rowData.thirdPartyCost}
          </p>
        </div>
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Term Cost</p>
          <p className="text-lg font-semibold text-black">
            $ {formatNumber(rowData.termCost)}
          </p>
        </div>
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Early Settlement Fee</p>
          <p className="text-lg font-semibold text-black">
            $ {formatNumber(rowData.earlySettlementFee)}
          </p>
        </div>
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Saved Fee</p>
          <p className="text-lg font-semibold text-black">
            $ {formatNumber(rowData.savedFee)}
          </p>
        </div>
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Closing Amount</p>
          <p className="text-lg font-semibold text-black">
            $ {formatNumber(rowData.closingAmount)}
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative bg-white flex flex-col w-3/4 rounded-lg shadow-lg p-4">
          <div
            onClick={onClose}
            className="h-9 w-9 z-20 cursor-pointer rounded-full text-white absolute -top-3 -right-3 self-end"
          >
            <XCircleIcon className="w-9 h-9" fill="rgb(220 38 38)" />
          </div>
          <div className="text-xl font-semibold flex gap-x-2 items-center">
            <CalendarIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            EMI Schedule Details
          </div>
          <div className="grid grid-cols-2 my-3 shadow bg-gray-100 rounded-lg py-3 px-5">
            <div className="text-sm">
              <div className="text-gray-500">Monthly EMI Amount</div>
              <div className="font-semibold text-lg">
                {installmentConfigData[0]?.installmentValue}
              </div>
            </div>
            <div className="text-sm">
              <div className="text-gray-500">Number of EMIs</div>
              <div className="font-semibold text-lg">
                {installmentConfigData.length}
              </div>
            </div>
          </div>
          <div className="overflow-auto h-[400px]">
            <ExpandableTable
              columns={columns}
              data={dataWithEmiNo}
              renderExpandedRow={renderExpandedRow}
            />
          </div>
          <table
            className="min-w-full table-auto border-t border-gray-300"
            role="table"
          >
            <thead className="sticky top-0 z-10 invisible">
              <tr className="bg-gray-100 text-sm font-semibold text-gray-600">
                <th className="px-4"></th>
                <th className="px-4">EMI No.</th>
                <th className="px-4">Date</th>
                <th className="px-4">Principal</th>
                <th className="px-4">Interest</th>
                <th className="px-4">Outstanding</th>
                <th className="px-4">EMI Amount</th>
              </tr>
            </thead>
            <tbody>
              <>
                <tr className="hover:bg-gray-50 cursor-pointer text-xs font-medium px-4 py-6">
                  <td className="max-w-28 break-words text-sm text-center text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      Total
                    </span>
                  </td>
                  <td className="max-w-28 break-words text-sm text-center text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium`}
                    ></span>
                  </td>
                  <td className="max-w-28 break-words text-sm text-center text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium`}
                    ></span>
                  </td>
                  <td className="max-w-28 break-words text-sm text-center text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {formatNumber(
                        loanConfigData?.dynamicCashLoanOffers[0]?.principalAmount.toFixed(
                          2
                        )
                      )}
                    </span>
                  </td>
                  <td className="max-w-28 break-words text-sm text-center text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {formatNumber(
                        loanConfigData?.dynamicCashLoanOffers[0]?.totalInterestAmount.toFixed(
                          2
                        )
                      )}
                    </span>
                  </td>
                  <td className="max-w-28 break-words text-sm text-center text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      -
                    </span>
                  </td>
                  <td className="max-w-28 break-words text-sm text-center text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {formatNumber(
                        loanConfigData?.dynamicCashLoanOffers[0]?.totalLoanAmount.toFixed(
                          2
                        )
                      )}
                    </span>
                  </td>
                </tr>
              </>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InstallmentSummery;
