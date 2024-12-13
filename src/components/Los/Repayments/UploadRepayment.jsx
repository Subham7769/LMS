import React from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import save_as_csv from "../../../assets/image/save_as_csv.jpg";
import save_as_csv2 from "../../../assets/image/save_as_csv2.jpg";
import InputRadio from "../../Common/InputRadio/InputRadio"
import { yesNoOptions} from "../../../data/LosData"

const UploadRepayment = () => {
  return (
    <div className="flex flex-col gap-3">
      <ContainerTile>
        <div className={`flex flex-col gap-2`}>
          <h2 className="font-bold text-lg mb-2">
            Upload Repayments from CSV file
          </h2>
          <p className={`text-xs`}>
            If you have repayments data in an Excel or CSV file, you can import
            the data using this page.
          </p>
        </div>
        <div className={`mt-5`}>
          <h4>How to convert Excel file to CSV</h4>
          {/* List */}
          <div className={`flex gap-5`}>
            <ul
              style={{ listStyleType: "disc", paddingLeft: "20px" }}
              className={`text-sm`}
            >
              <li style={{ marginBottom: "10px" }}>Open your Excel file.</li>
              <li style={{ marginBottom: "10px" }}>
                Go to "File" &gt; "Save As".
              </li>

              <li style={{ marginBottom: "10px" }}>
                In the File Name area, name your document.
              </li>
              <li style={{ marginBottom: "10px" }}>
                In the Save as Type area, select CSV (Comma Delimited).
              </li>
              <li style={{ marginBottom: "10px" }}>Click Save.</li>
              <li style={{ marginBottom: "10px" }}>
                You may see warnings about CSV formatting; click 'Yes' to
                proceed.
              </li>
            </ul>
            {/* Images */}
            <div className="flex flex-1 gap-2">
              <img
                src={save_as_csv}
                alt=""
                className="w-[35%] h-full shadow-md bg-gray-100 border border-gray-300 rounded-sm"
              />
              <img
                src={save_as_csv2}
                alt=""
                className="w-[65%] h-full shadow-md bg-gray-100 border border-gray-300 rounded-sm"
              />
            </div>
          </div>
        </div>
      </ContainerTile>

      <ContainerTile>
        <div className={`flex flex-col gap-2`}>
          <h2 className="font-bold text-lg mb-2">
            Prepare your repayments file
          </h2>
        </div>
        <div className="flex flex-col gap-3 text-xs rounded-lg">
          {/* Table 1 */}
          <div className="flex flex-col gap-4 border border-gray-300 bg-white rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="flex font-bold text-sm bg-gray-50">
              <div className="w-[40%] p-2 py-3 border-b border-gray-600">
                Required Columns
              </div>
              <div className="w-[60%] p-2 py-3 border-b border-gray-600">
                Allowed Values
              </div>
            </div>

            {/* Table Row 1 */}
            <div className="flex">
              <div className="w-[40%] p-2 border-b">Amount</div>
              <div className="w-[60%] p-2 border-b">
                Numbers or Decimals only
              </div>
            </div>

            {/* Table Row 2 */}
            <div className="flex">
              <div className="w-[40%] p-2 border-b">Collection Method</div>
              <div className="w-[60%] p-2 border-b">
                Cash / ATM / Cheque / Paypal / Online Transfer
              </div>
            </div>

            {/* Table Row 3 */}
            <div className="flex">
              <div className="w-[40%] p-2 border-b">Collection Date</div>
              <div className="w-[60%] p-2 border-b">dd/mm/yyyy</div>
            </div>

            <div className="flex">
              <div className="w-[40%] p-2 border-b">Loan Unique Number</div>
              <div className="w-[60%] p-2 border-b">
                Unique Loan Number. If you don't enter a loan unique number, a
                Loan column will be added in Step 2 so you can select the
                corresponding loan for each repayment.
              </div>
            </div>

            <div className="flex">
              <div className="w-[40%] p-2 border-b">Collected By</div>
              <div className="w-[60%] p-2 border-b">Tahseen Jamal</div>
            </div>

            <div className="flex">
              <div className="w-[40%] p-2 border-b">Description (Optional)</div>
              <div className="w-[60%] p-2 border-b">Any</div>
            </div>

            <div className="flex">
              <div className="w-[40%] p-2 border-b">
                Destination of Funds for Repayment Amount (Optional)
              </div>
              <div className="w-[60%] p-2 border-b">Cash</div>
            </div>

          </div>
        </div>
      </ContainerTile>

      <ContainerTile className={`flex flex-col gap-2`}>
        <h2 className="font-bold text-lg mb-2">Advance Settings</h2>
        <p className={`text-xs`}>
          Please be careful with the below settings. Most likely you will not
          need to use the below fields.
        </p>
        <h2 className="font-bold text-md mb-2">
          Option 1: Recalculate Schedule
        </h2>
        {/* Table 2 */}
        <div className="flex flex-col gap-4 border border-gray-300 bg-white rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="flex font-bold text-sm bg-gray-50">
            <div className="w-[40%] p-2 py-3 border-b border-gray-600">
              Required Columns
            </div>
            <div className="w-[60%] p-2 py-3 border-b border-gray-600">
              Allowed Values
            </div>
          </div>

          <div className="flex">
            <div className="w-[40%] p-2 border-b">
              Recalculate remaining schedule with balance principal amount
            </div>
            <div className="w-[60%] p-2 border-b">Yes / No</div>
          </div>

          <div className="flex">
            <div className="w-[40%] p-2 border-b">
              Adjust interest on a pro-rata basis until the Collection Date
              selected above
            </div>
            <div className="w-[60%] p-2 border-b">Yes / No</div>
          </div>
        </div>

        <h2 className="font-bold text-md mb-2">Option 2: Manual Composition</h2>
        {/* Table 3 */}
        <div className="flex flex-col gap-4 border border-gray-300 bg-white rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="flex font-bold text-sm bg-gray-50">
            <div className="w-[40%] p-2 py-3 border-b border-gray-600">
              Required Columns
            </div>
            <div className="w-[60%] p-2 py-3 border-b border-gray-600">
              Allowed Values
            </div>
          </div>

          <div className="flex">
            <div className="w-[40%] p-2 border-b">
              Allocate repayment amount manually based on the below value
            </div>
            <div className="w-[60%] p-2 border-b">Yes / No</div>
          </div>

          <div className="flex">
            <div className="w-[40%] p-2 border-b">Principal Amount</div>
            <div className="w-[60%] p-2 border-b">Numbers or Decimals only</div>
          </div>

          <div className="flex">
            <div className="w-[40%] p-2 border-b">Interest Amount</div>
            <div className="w-[60%] p-2 border-b">Numbers or Decimals only</div>
          </div>

          <div className="flex">
            <div className="w-[40%] p-2 border-b">Fees Amount</div>
            <div className="w-[60%] p-2 border-b">Numbers or Decimals only</div>
          </div>

          <div className="flex">
            <div className="w-[40%] p-2 border-b">Penalty Amount</div>
            <div className="w-[60%] p-2 border-b">
              Numbers or Decimals only
              <br />
              (If you specify an amount for Principal, Interest, Fees, or
              Penalty Amount fields, then Allocate repayment amount manually
              based on the below value must be selected as Yes also.)
            </div>
          </div>
        </div>
      </ContainerTile>

      <ContainerTile>
        {/* Tips */}

        <h2 className="font-bold text-lg mb-2">Tips</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a
              href={"https://x.loandisk.com/sample_file_bulk_repayments.csv"}
              className="text-blue-600 underline"
            >
              Click here to download a sample file.
            </a>
          </li>
          <li>
            Repayments will be uploaded in Branch #1 since you are currently
            logged into this branch.
          </li>
          <li>
            It is advisable that you have a Loan Unique Number column in the
            repayments file, otherwise you will have to manually select the loan
            number for each repayment.
          </li>
          <li>
            Please delete commas and currency symbols in the Amount column. Only
            have numbers or decimals in the Amount column.
          </li>
          <li>
            The Collection Date column must have dates in the{" "}
            <strong>dd/mm/yyyy</strong> format.
          </li>
        </ul>
      </ContainerTile>

      <ContainerTile>
        {/* Options */}
        <div className="flex flex-col gap-3 ">
          <h2 className="font-bold text-lg mb-2">
            Select the options that you have these columns in your repayments file
          </h2>
          <div className="grid grid-cols-3 gap-5 ">
            <div className="flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white p-5">
              <div className="text-center">Loan Id</div>
              <div className="flex justify-center">
                <InputRadio inputName={"Loan Id"}  options={yesNoOptions} onChange={()=>{}}/>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white p-5">
              <div className="text-center">Collection Method</div>
              <div className="flex justify-center">
                <InputRadio inputName={"Loan Id"}  options={yesNoOptions} onChange={()=>{}}/>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white p-5">
              <div className="text-center">Collection By</div>
              <div className="flex justify-center">
                <InputRadio inputName={"Loan Id"}  options={yesNoOptions} onChange={()=>{}}/>
              </div>
            </div>
          </div>
        </div>
      </ContainerTile>
    </div>
  );
};

export default UploadRepayment;
