import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";

const productOptions = [
  { value: "cashLoan", label: "Cash Loan" },
  { value: "BNPL", label: "BNPL" },
  { value: "overdraft", label: "Overdraft" },
];

const SystemConfig = () => {
  const [inputList, setInputList] = useState([
    {
      id: 1,
      product: "",
      mgmtFeeVat: "",
      noEMIEarlySetle: "",
      refinaceWith: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        product: "",
        mgmtFeeVat: "",
        noEMIEarlySetle: "",
        refinaceWith: "",
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
    <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
      <div className="flex items-center justify-between ">
        <div className="text-lg">System Configuration</div>
        <button
          onClick={handleAddFields}
          type="button"
          className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {inputList.map((item, index) => (
        <div key={item.id} className="flex gap-4 items-end mt-5">
          <div className="relative">
            <label
              htmlFor={`product_${item.id}`}
              className=" px-1 text-xs text-gray-900"
            >
              Product Name
            </label>
            <Select
              className="w-48"
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
              htmlFor={`mgmtFeeVat_${item.id}`}
              className=" px-1 text-xs text-gray-900"
            >
              Management Fee Vat
            </label>
            <input
              type="number"
              name="mgmtFeeVat"
              id={`mgmtFeeVat_${item.id}`}
              value={item.mgmtFeeVat}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="15%"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`noEMIEarlySetle_${item.id}`}
              className=" px-1 text-xs text-gray-900"
            >
              Number Of Emis For Early Settlement
            </label>
            <input
              type="number"
              name="noEMIEarlySetle"
              id={`noEMIEarlySetle_${item.id}`}
              value={item.noEMIEarlySetle}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="3"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`refinaceWith_${item.id}`}
              className=" text-gray-900 block text-xs text-center w-24 mb-2"
            >
              Refinanced With
            </label>
            <div className="flex h-6 justify-center">
              <input
                id={`refinaceWith_${item.id}`}
                value={item.refinaceWith}
                name="refinaceWith"
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
    </div>
  );
};

export default SystemConfig;
