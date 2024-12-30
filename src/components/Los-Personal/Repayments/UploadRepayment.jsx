import React, { useEffect, useState } from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import save_as_csv from "../../../assets/image/save_as_csv.jpg";
import save_as_csv2 from "../../../assets/image/save_as_csv2.jpg";
import InputRadio from "../../Common/InputRadio/InputRadio";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputFile from "../../Common/InputFile/InputFile";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import { yesNoOptions, repaymentOptions } from "../../../data/LosData";
import Papa from "papaparse";
import { useSelector, useDispatch } from "react-redux";
import {
  setRepaymentData,
  updateRepaymentData,
  setRepaymentHeaderData,
  updateRepaymentHeaderData,
} from "../../../redux/Slices/personalRepaymentsSlice";

const UploadRepayment = () => {
  const [formData, setFormData] = useState({
    loanProduct: "",
  });
  const dispatch = useDispatch();
  const { repaymentData, repaymentHeaderData } = useSelector(
    (state) => state.personalRepayments
  );
  const [showStep2, setShowStep2] = useState(false);
  const [columnArray, setColumnArray] = useState([]);
  const [saveHeadersOption, setSaveHeadersOption] = useState("");

  useEffect(() => {
    const savedHeaderData = localStorage.getItem("repaymentHeaderData");
    if (savedHeaderData) {
      dispatch(setRepaymentHeaderData(JSON.parse(savedHeaderData)));
    }
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeRepaymentData = (e, rowIndex) => {
    const { name, value } = e.target;
    dispatch(updateRepaymentData({ rowIndex, fieldName: name, value }));
  };

  const handleChangeRepaymentHeaderData = (e, index) => {
    const { name, value } = e.target;
    dispatch(updateRepaymentHeaderData({ fieldName: name, value }));
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    Papa.parse(files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const columnArray = [];
        results.data.forEach((row) => {
          columnArray.push(Object.keys(row));
        });
        setColumnArray(columnArray[0]);
        dispatch(setRepaymentData(results.data));
      },
    });
  };

  const handleSubmit = () => {
    console.log(saveHeadersOption);
    if (saveHeadersOption === "yes") {
      localStorage.setItem(
        "repaymentHeaderData",
        JSON.stringify(repaymentHeaderData)
      );
      console.log("Data saved");
    } else {
      localStorage.removeItem("repaymentHeaderData"); // Remove data if the option is not "yes"
    }
    
    console.log(localStorage.getItem("repaymentHeaderData"));
  };

  return (
    <div className="flex flex-col gap-3">
      <ContainerTile>
        <div className={`flex flex-col gap-2`}>
          <h2 className="font-bold text-lg mb-2">
            Step 1: Upload Repayments from CSV file
          </h2>
          <p className={`text-sm`}>
            If you have repayments data in an Excel or CSV file, you can import
            the data using this page.
          </p>
        </div>
        <div className={`mt-5`}>
          <h4>How to convert Excel file to CSV</h4>
          {/* List */}
          <div className={`flex gap-5 text-sm`}>
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
        <div className="flex flex-col gap-3 text-sm rounded-lg">
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
        <p className={`text-sm`}>
          Please be careful with the below settings. Most likely you will not
          need to use the below fields.
        </p>
        <h2 className="font-bold text-md mb-2">
          Option 1: Recalculate Schedule
        </h2>
        {/* Table 2 */}
        <div className="flex flex-col gap-4 border border-gray-300 bg-white rounded-lg overflow-hidden text-sm">
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
        <div className="flex flex-col gap-4 border border-gray-300 bg-white rounded-lg overflow-hidden text-sm">
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

      <ContainerTile className={`grid grid-cols-2 gap-5`}>
        {/* Tips */}
        <div className="rounded-lg border-gray-50 shadow-md bg-white p-5 text-sm">
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
        <div className="flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white text-sm p-5">
          <h2 className="font-bold text-lg mb-2">
            Select the columns available in your repayments file.
          </h2>
          <div className="grid grid-cols-1 gap-5 ">
            <div className="flex justify-between px-1 gap-3">
              <div className="text-center">Loan Id</div>
              <div className="flex justify-center">
                <InputRadio
                  inputName={"Loan Id"}
                  options={yesNoOptions}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="flex justify-between px-1 gap-3">
              <div className="text-center">Collection Method</div>
              <div className="flex justify-center">
                <InputRadio
                  inputName={"Loan Id"}
                  options={yesNoOptions}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="flex justify-between px-1 gap-3">
              <div className="text-center">Collection By</div>
              <div className="flex justify-center">
                <InputRadio
                  inputName={"Loan Id"}
                  options={yesNoOptions}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </ContainerTile>

      <ContainerTile className={`flex flex-col gap-2`}>
        <h2 className="font-bold text-lg mb-2">Save options</h2>
        <div className="grid grid-cols-2 gap-5 text-sm">
          <div className="flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white p-5">
            <div className="text-center">Save options on this page</div>
            <div className="flex justify-center">
              <InputRadio
                inputName={"Save options on this page"}
                options={yesNoOptions}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white p-5">
            <p>
              If you select Yes above, the options you have selected on this
              page will be saved so when you load this page again for this
              branch, the options will be preselected. This will save you time
              from entering them again.
            </p>
          </div>
        </div>
      </ContainerTile>

      <ContainerTile className={`flex flex-col gap-2`}>
        <h2 className="font-bold text-lg mb-2">Upload your file</h2>
        <div className="grid grid-cols-2 gap-5 ">
          <div className="flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white p-5">
            <div className="text-center">Columns Separated By (optional)</div>
            <div className="grid grid-cols-1">
              <InputSelect
                inputName="loanProduct"
                inputOptions={[
                  { value: "Commas", label: "Commas" },
                  { value: "SemiColon", label: "SemiColon" },
                ]}
                inputValue={formData.loanProduct}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white p-5">
            <InputFile
              labelName="Loan Files (.csv)"
              inputName="loanFiles"
              onChange={handleFileUpload}
              accept=".csv"
              placeholder="Click or drag to upload"
            />
          </div>
        </div>
      </ContainerTile>

      <div className="flex justify-between px-20 ">
        <Button
          buttonName={"Reset"}
          onClick={() => {}}
          rectangle={true}
          className={`mt-4 h-fit self-center`}
        />
        <Button
          buttonName={"Proceed"}
          onClick={() => {
            setShowStep2(!showStep2);
          }}
          rectangle={true}
          className={`mt-4 h-fit self-center disabled:bg-gray-500`}
          disabled={!repaymentData}
        />
      </div>

      {showStep2 && (
        <>
          <div className="border-b-2 border-gray-400 my-5"></div>
          <ContainerTile>
            <h2 className="font-bold text-lg mb-2">
              Step 2: Select the headings for each column
            </h2>
            <div className="grid grid-cols-2 gap-5">
              <div
                className={`flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white p-5 text-sm`}
              >
                <p className={``}>
                  Please make sure you select the right headings. <br />
                  If you do not want a column to be uploaded. Please ignore.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-lg border-gray-50 shadow-md bg-white p-5 text-sm">
                <div className="text-center">
                  Save the below selected Row Headings for future use?
                </div>
                <div className="flex justify-center">
                  <InputRadio
                    inputName={"saveHeadersOption"}
                    selectedValue={saveHeadersOption} // Updated prop name
                    options={yesNoOptions}
                    onChange={(e) => {
                      setSaveHeadersOption(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </ContainerTile>
          <div
            className={
              "shadow-md bg-gray-100 border-gray-300 border p-5 rounded-xl mt-4 "
            }
          >
            <div className="flow-root overflow-hidden">
              <div className="max-h-[400px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  {/* Table Header */}
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr className="divide-x divide-gray-200">
                      {
                        <th className={`max-w-24 text-center py-3 px-2`}>
                          {"No."}
                        </th>
                      }
                      {columnArray.map((column, index) => (
                        <th
                          key={index}
                          className={`w-1/${
                            columnArray.length + 1
                          } max-w-24 text-center py-3 px-2`}
                        >
                          <InputSelect
                            inputName={column}
                            inputOptions={repaymentOptions}
                            inputValue={repaymentHeaderData[column] || ""}
                            onChange={handleChangeRepaymentHeaderData}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {repaymentData.map((rowData, index) => (
                      <tr key={index} className="divide-x divide-gray-200">
                        <td
                          className={`text-center py-3 px-1 text-[14px] text-gray-500`}
                        >
                          {index + 1}
                        </td>
                        {Object.entries(rowData).map(([key, value]) => (
                          <td
                            key={key}
                            className={`w-1/${
                              Object.keys(rowData).length
                            } text-center py-3 px-1 text-[14px] text-gray-500`}
                          >
                            <InputText
                              inputName={key}
                              inputValue={value}
                              onChange={(e) =>
                                handleChangeRepaymentData(e, index)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-center align-middle">
            <Button
              buttonName={"Submit"}
              onClick={handleSubmit}
              rectangle={true}
              className={`mt-4 h-fit self-center`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UploadRepayment;
