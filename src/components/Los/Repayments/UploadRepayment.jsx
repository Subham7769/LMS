import React from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import save_as_csv from "../../../assets/image/save_as_csv.jpg";
import save_as_csv2 from "../../../assets/image/save_as_csv2.jpg";

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
          {/* Table */}

          <div className="flex flex-col gap-4 border border-gray-300 bg-white rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="flex font-bold text-sm bg-gray-50">
              <div className="w-[30%] p-2 py-3 border-b border-gray-600">
                Required Columns
              </div>
              <div className="w-[70%] p-2 py-3 border-b border-gray-600">
                Allowed Values
              </div>
            </div>

            {/* Table Row 1 */}
            <div className="flex">
              <div className="w-[30%] p-2 border-b">Amount</div>
              <div className="w-[70%] p-2 border-b">
                Numbers or Decimals only
              </div>
            </div>

            {/* Table Row 2 */}
            <div className="flex">
              <div className="w-[30%] p-2 border-b">Collection Method</div>
              <div className="w-[70%] p-2 border-b">
                Cash / ATM / Cheque / Paypal / Online Transfer
              </div>
            </div>

            {/* Table Row 3 */}
            <div className="flex">
              <div className="w-[30%] p-2 border-b">Collection Date</div>
              <div className="w-[70%] p-2 border-b">dd/mm/yyyy</div>
            </div>

            <div className="flex">
              <div className="w-[30%] p-2 border-b">Loan Unique Number</div>
              <div className="w-[70%] p-2 border-b">
                Unique Loan Number. If you don't enter a loan unique number, a
                Loan column will be added in Step 2 so you can select the
                corresponding loan for each repayment.
              </div>
            </div>

            <div className="flex">
              <div className="w-[30%] p-2 border-b">Collected By</div>
              <div className="w-[70%] p-2 border-b">Tahseen Jamal</div>
            </div>

            <div className="flex">
              <div className="w-[30%] p-2 border-b">Description (Optional)</div>
              <div className="w-[70%] p-2 border-b">Any</div>
            </div>

          </div>

          {/* Tips */}
          <div className="p-4 border border-gray-300 rounded-md">
            <h2 className="font-bold text-lg mb-2">Tips:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a href={"https://x.loandisk.com/sample_file_bulk_repayments.csv"} className="text-blue-600 underline">
                  Click here to download a sample file.
                </a>
              </li>
              <li>
                Repayments will be uploaded in Branch #1 since you are currently
                logged into this branch.
              </li>
              <li>
                It is advisable that you have a Loan Unique Number column in the
                repayments file, otherwise you will have to manually select the
                loan number for each repayment.
              </li>
              <li>
                Please delete commas and currency symbols in the Amount column.
                Only have numbers or decimals in the Amount column.
              </li>
              <li>
                The Collection Date column must have dates in the{" "}
                <strong>dd/mm/yyyy</strong> format.
              </li>
            </ul>
          </div>

          {/* Options */}
          <div className="abc">

          </div>
        </div>
      </ContainerTile>
    </div>
  );
};

export default UploadRepayment;
