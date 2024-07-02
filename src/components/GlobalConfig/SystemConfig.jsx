import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Select from "react-select";
import useGlobalConfig from "../../utils/useGlobalConfig";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState";

const productOptions = [
  { value: "Cash loan", label: "Cash Loan" },
  { value: "BNPL", label: "BNPL" },
  { value: "Overdraft", label: "Overdraft" },
];

const SystemConfig = () => {
  const [systemConfigDataNew, setsystemConfigDataNew] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [lastEditedItem, setLastEditedItem] = useState(null);

  const url = "project-system-configs";
  const systemConfigData = useGlobalConfig(url);
  useEffect(() => {
    if (systemConfigData.length > 0) {
      setInputList(systemConfigData);
    }
  }, [systemConfigData]);
  // console.log(systemConfigData);
  if (systemConfigData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  const handleDDChange = (propName, selectedOption, id) => {
    const name = propName;
    const list2 = [...inputList];
    const index = list2.findIndex((item) => item.id === id);
    list2[index][name] = selectedOption ? selectedOption.value : "";
    setInputList(list2);
    setLastEditedItem(list2[index]);
  };

  const handleChange = (e, id) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    const list = [...inputList];
    const index = list.findIndex((item) => item.id === id);
    list[index][name] = value;
    setInputList(list);
    setLastEditedItem(list[index]);
  };

  const handleSave = async () => {
    if (lastEditedItem) {
      const token = localStorage.getItem("authToken");
      const targetData = {
        projectId: lastEditedItem.projectId,
        projectName: lastEditedItem.projectName,
        managementFeeVat: lastEditedItem.managementFeeVat,
        numberOfEmisForEarlySettlement:
          lastEditedItem.numberOfEmisForEarlySettlement,
        refinancedWith: lastEditedItem.refinancedWith,
        triggerValue: lastEditedItem.triggerValue,
      };

      const response = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/api/v1/configs/project-system-configs",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(targetData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log(
          `Data for ${lastEditedItem.projectName} saved successfully`
        );
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Saved Successfully"}
            message={`The item ${lastEditedItem.projectName} has been updated`}
          />
        ));
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-center justify-between ">
          <div className="text-lg">System Configuration</div>
        </div>
        {(systemConfigDataNew.length === 0
          ? systemConfigData
          : systemConfigDataNew
        ).map((scdata) => (
          <div key={scdata.id} className="flex gap-4 items-end mt-5">
            <div className="relative">
              <label
                htmlFor={`projectName_${scdata.id}`}
                className=" px-1 text-xs text-gray-900"
              >
                Product Name
              </label>
              <Select
                className="w-48"
                options={productOptions}
                id={`projectName_${scdata.id}`}
                name="projectName"
                value={productOptions.find(
                  (option) => option.value === scdata.projectName
                )}
                onChange={(selectedOption) =>
                  handleDDChange("projectName", selectedOption, scdata.id)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`managementFeeVat_${scdata.id}`}
                className=" px-1 text-xs text-gray-900"
              >
                Management Fee Vat
              </label>
              <input
                type="text"
                name="managementFeeVat"
                id={`managementFeeVat_${scdata.id}`}
                value={scdata.managementFeeVat}
                onChange={(e) => handleChange(e, scdata.id)}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="15%"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`numberOfEmisForEarlySettlement_${scdata.id}`}
                className=" px-1 text-xs text-gray-900"
              >
                Number Of Emis For Early Settlement
              </label>
              <input
                type="number"
                name="numberOfEmisForEarlySettlement"
                id={`numberOfEmisForEarlySettlement_${scdata.id}`}
                value={scdata.numberOfEmisForEarlySettlement}
                onChange={(e) => handleChange(e, scdata.id)}
                className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="3"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`refinaceWith_${scdata.id}`}
                className=" text-gray-900 block text-xs text-center w-24 mb-2"
              >
                Refinanced With
              </label>
              <div className="flex h-6 justify-center">
                <input
                  id={`refinancedWith_${scdata.id}`}
                  value={scdata.refinancedWith}
                  checked={scdata.refinancedWith}
                  name="refinancedWith"
                  type="checkbox"
                  onChange={(e) => handleChange(e, scdata.id)}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="w-9 h-9 rounded-md bg-indigo-600 p-2 ml-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SystemConfig;
