import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";

const productOptions = [
  { value: "consumer", label: "Consumer" },
  { value: "nonConsumer", label: "Non-Consumer" },
];

const issuerOptions = [
  { value: "bank", label: "Bank" },
  { value: "other", label: "Other" },
  { value: "bankOther", label: "Bank, Other" },
];

const gdbrWoMortageOptions = [
  { value: "yes", label: "Yes" },
  { value: "N/A", label: "N/A" },
  { value: "yesBank", label: "Yes if issuer is bank" },
];
const gdbrWMortageOptions = [
  { value: "yes", label: "Yes" },
  { value: "N/A", label: "N/A" },
];
const defaultScoreOptions = [
  { value: "yes", label: "Yes" },
  { value: "N/A", label: "N/A" },
];

const LiabilitiesMatrix = () => {
  const [inputList, setInputList] = useState([
    {
      id: 1,
      product: "",
      simahCode: "",
      issuer: "",
      gdbrWoMortage: "",
      gdbrWMortage: "",
      defaultScore: "",
      comments: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        product: "",
        simahCode: "",
        issuer: "",
        gdbrWoMortage: "",
        gdbrWMortage: "",
        defaultScore: "",
        comments: "",
      },
    ]);
  };
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const list = [...inputList];
    const index = list.findIndex((item) => item.id === id);
    list[index][name] = value;
    setInputList(list);
  };
  const handleDDChange = (propName, selectedOption, id) => {
    const name = propName;
    const list2 = [...inputList];
    const index = list2.findIndex((item) => item.id === id);
    list2[index][name] = selectedOption.value;
    setInputList(list2);
  };

  const handleDelete = (index) => {
    const deleteList = [...inputList];
    deleteList.splice(index, 1);
    setInputList(deleteList);
  };
  return (
    <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 relative">
      <div className="flex items-center justify-between ">
        <div className="text-lg">Credit Bureau Liabilities Matrix</div>
        <button
          onClick={handleAddFields}
          type="button"
          className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {inputList.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col gap-y-6 mt-6 border-b border-gray-300 pb-6"
        >
          <div className="flex gap-8 items-end">
            <div className="relative ">
              <label
                htmlFor={`product_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Product
              </label>
              <Select
                className="w-64"
                options={productOptions}
                id={`product_${item.id}`}
                name="product"
                value={productOptions.find(
                  (option) => option.value === item.product
                )}
                onChange={(selectedOption) =>
                  handleDDChange("product", selectedOption, item.id)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`simahCode_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                CB Description (CODE)
              </label>
              <input
                type="text"
                name="simahCode"
                id={`simahCode_${item.id}`}
                value={item.simahCode}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="TMTG"
              />
            </div>
            <div className="relative ">
              <label
                htmlFor={`issuer_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Issuer
              </label>
              <Select
                className="w-64"
                options={issuerOptions}
                id={`issuer_${item.id}`}
                name="issuer"
                value={issuerOptions.find(
                  (option) => option.value === item.issuer
                )}
                onChange={(selectedOption) =>
                  handleDDChange("issuer", selectedOption, item.id)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`comments_${item.id}`}
                className=" text-gray-900 block text-xs mx-auto w-16 mb-2"
              >
                Active Rule
              </label>
              <div className="flex h-6 justify-center">
                <input
                  id={`comments_${item.id}`}
                  value={item.comments}
                  name="comments"
                  type="checkbox"
                  onChange={(e) => handleChange(e, item.id)}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
            </div>
            <button
              onClick={() => handleDelete(index)}
              type="button"
              className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex gap-8 items-end">
            <div className="relative">
              <label
                htmlFor={`gdbrWoMortage_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                GDBR (Without Mortgage)
              </label>
              <Select
                className="w-64"
                options={gdbrWoMortageOptions}
                id={`gdbrWoMortage_${item.id}`}
                name="gdbrWoMortage"
                value={gdbrWoMortageOptions.find(
                  (option) => option.value === item.gdbrWoMortage
                )}
                onChange={(selectedOption) =>
                  handleDDChange("gdbrWoMortage", selectedOption, item.id)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`gdbrWMortage_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                GDBR (including Mortgage)
              </label>
              <Select
                className="w-64"
                options={gdbrWMortageOptions}
                id={`gdbrWMortage_${item.id}`}
                name="gdbrWMortage"
                value={gdbrWMortageOptions.find(
                  (option) => option.value === item.gdbrWMortage
                )}
                onChange={(selectedOption) =>
                  handleDDChange("gdbrWMortage", selectedOption, item.id)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`defaultScore_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Default considered in CB score
              </label>
              <Select
                className="w-64"
                options={defaultScoreOptions}
                id={`defaultScore_${item.id}`}
                name="defaultScore"
                value={defaultScoreOptions.find(
                  (option) => option.value === item.defaultScore
                )}
                onChange={(selectedOption) =>
                  handleDDChange("defaultScore", selectedOption, item.id)
                }
                isSearchable={false}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="text-right mt-5">
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Save
        </button>
      </div>
      <div className="absolute bottom-1 left-2 text-xs text-gray-500">
        *CB - Credit Bureau
      </div>
    </div>
  );
};

export default LiabilitiesMatrix;
