import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector } from "react-redux";
import { convertDate } from "../../../utils/convertDate";
import formatNumber from "../../../utils/formatNumber";
import Modal from "../../Common/Modal/Modal";

const InstallmentSummery = ({
  onClose,
  installmentConfigData,
  loanConfigData,
}) => {
  // const { loanConfigData } = useSelector((state) => state.personalLoans);
  const columns = [
    { label: "EMI No.", field: "emiNo" },
    { label: "Date", field: "installmentDate" },
    { label: "Principal", field: "principalValue" },
    { label: "Interest", field: "interestValue" },
    { label: "Monthly Admin Fee", field: "serviceFee" },
    { label: "Outstanding", field: "totalOutstandingAmount" },
    { label: "EMI Amount", field: "totalRequiredAmount" },
  ];

  const dataWithEmiNo = installmentConfigData.map((item, index) => ({
    ...item,
    emiNo: index + 1,
    principalValue: item.principalValue,
    interestValue: item.interestValue,
    totalOutstandingAmount: item.totalOutstandingAmount,
    totalRequiredAmount: item.totalRequiredAmount,
    installmentDate: convertDate(item.installmentDate),
  }));

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm border-y-2 dark:border-gray-600 p-5">
      <div className="grid grid-cols-4">
        <div className="border-r border-gray-300 dark:border-gray-600 py-2 px-4">
          <p>Management Fee</p>
          <p className="text-lg font-semibold">{rowData.managementFee}</p>
        </div>
        <div className="border-r border-gray-300 dark:border-gray-600 py-2 px-4">
          <p>Vat Fee</p>
          <p className="text-lg font-semibold">{rowData.vatFee}</p>
        </div>
        <div className="border-r border-gray-300 dark:border-gray-600 py-2 px-4">
          <p>Third Party Cost</p>
          <p className="text-lg font-semibold">{rowData.thirdPartyCost}</p>
        </div>
        <div className="border-r border-gray-300 dark:border-gray-600 py-2 px-4">
          <p>Term Cost</p>
          <p className="text-lg font-semibold">
            {formatNumber(rowData.termCost)}
          </p>
        </div>
        <div className="border-r border-gray-300 dark:border-gray-600 py-2 px-4">
          <p>Early Settlement Fee</p>
          <p className="text-lg font-semibold">
            {formatNumber(rowData.earlySettlementFee)}
          </p>
        </div>
        <div className="border-r border-gray-300 dark:border-gray-600 py-2 px-4">
          <p>Saved Fee</p>
          <p className="text-lg font-semibold">
            {formatNumber(rowData.savedFee)}
          </p>
        </div>
        <div className="border-r border-gray-300 dark:border-gray-600 py-2 px-4">
          <p>Closing Amount</p>
          <p className="text-lg font-semibold">
            {formatNumber(rowData.closingAmount)}
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        title={"EMI Schedule Details"}
        isFooter={false}
        secondaryOnClick={onClose}
        modalWidth="lg:w-3/4"
      >
        <div className="grid md:grid-cols-2 mb-3 shadow bg-gray-100 dark:bg-gray-700/60 rounded-lg py-3 px-5">
          <div className="text-sm">
            <div className="">Monthly EMI Amount</div>
            <div className="font-semibold text-lg">
              {installmentConfigData[0]?.totalRequiredAmount}
            </div>
          </div>
          <div className="text-sm">
            <div className="">Number of EMIs</div>
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
            defaultClass={false}
            className={
              "bg-white dark:bg-gray-800 shadow-md border dark:border-gray-700 relative"
            }
          />
        </div>
        <div className="hidden xl:block">
          <table
            className="table-auto w-full border-t border-gray-300 dark:border-gray-600"
            role="table"
          >
            <thead className="sticky top-0 z-10 invisible">
              <tr className="text-sm font-semibold">
                <th className="px-4">EMI No.</th>
                <th className="px-4">Date</th>
                <th className="px-4">Principal</th>
                <th className="px-4">Interest</th>
                <th className="px-4">Monthly Admin Fee</th>
                <th className="px-4">Outstanding</th>
                <th className="px-4">EMI Amount</th>
                <th className="px-4"></th>
              </tr>
            </thead>
            <tbody>
              <>
                <tr className="">
                  <td className="max-w-28 break-words text-sm px-2">
                    <span
                      className={`inline-block min-w-24 rounded-full font-medium`}
                    >
                      Total
                    </span>
                  </td>
                  <td className="max-w-28 break-words text-sm px-2">
                    <span
                      className={`inline-block min-w-24 rounded-full font-medium`}
                    ></span>
                  </td>
                  <td className="max-w-28 break-words text-sm px-2">
                    <span
                      className={`inline-block min-w-24 rounded-full font-medium`}
                    >
                      <div className="">
                        {formatNumber(
                          loanConfigData?.dynamicCashLoanOffers[0]?.principalAmount.toFixed(
                            2
                          )
                        )}
                      </div>
                    </span>
                  </td>
                  <td className="max-w-28 break-words text-sm px-2">
                    <span
                      className={`inline-block min-w-24 rounded-full font-medium `}
                    >
                      <div className="">
                        {formatNumber(
                          loanConfigData?.dynamicCashLoanOffers[0]?.totalInterestAmount.toFixed(
                            2
                          )
                        )}
                      </div>
                    </span>
                  </td>
                  <td className="max-w-28 break-words text-sm px-2">
                    <span
                      className={`inline-block min-w-24 rounded-full font-medium `}
                    ></span>
                  </td>
                  <td className="max-w-28 break-words text-sm px-2">
                    <span
                      className={`inline-block min-w-24 rounded-full font-medium `}
                    ></span>
                  </td>
                  <td className="max-w-28 break-words text-sm px-2">
                    <span
                      className={`inline-block min-w-24 rounded-full font-medium `}
                    >
                      <div className="">
                        {formatNumber(
                          loanConfigData?.dynamicCashLoanOffers[0]?.totalLoanAmount.toFixed(
                            2
                          )
                        )}
                      </div>
                    </span>
                  </td>
                  <td className="max-w-28 break-words text-sm px-2">
                    <span
                      className={` rounded-full text-xs font-medium`}
                    ></span>
                  </td>
                </tr>
              </>
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default InstallmentSummery;
