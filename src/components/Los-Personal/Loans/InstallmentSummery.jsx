import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { XCircleIcon, CalendarIcon } from "@heroicons/react/24/outline";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector } from "react-redux";
import { convertDate } from "../../../utils/convertDate";

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
            $ {rowData.termCost}
          </p>
        </div>
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Early Settlement Fee</p>
          <p className="text-lg font-semibold text-black">
            $ {rowData.earlySettlementFee}
          </p>
        </div>
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Saved Fee</p>
          <p className="text-lg font-semibold text-black">
            $ {rowData.savedFee}
          </p>
        </div>
        <div className="border-r border-gray-300 py-2 px-4">
          <p>Closing Amount</p>
          <p className="text-lg font-semibold text-black">
            $ {rowData.closingAmount}
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
          {/* <div className="grid grid-cols-7">
            <div>Total</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>
              $
              {loanConfigData?.dynamicCashLoanOffers[0]?.principalAmount.toFixed(
                2
              )}
            </div>
            <div>
              $
              {loanConfigData?.dynamicCashLoanOffers[0]?.totalInterestAmount.toFixed(
                2
              )}
            </div>
            <div>-</div>
            <div>
              $
              {loanConfigData?.dynamicCashLoanOffers[0]?.totalLoanAmount.toFixed(
                2
              )}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default InstallmentSummery;
