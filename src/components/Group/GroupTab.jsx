import { useState } from "react";
import {
  PlusIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";

const options = [
  { value: "Cash Loan", label: "Cash Loan" },
  { value: "BNPL", label: "BNPL" },
  { value: "Overdraft", label: "Overdraft" },
];
const GroupTab = () => {
  const [tagValue, setTagValue] = useState({ city: "", points: "" });
  const [tags, setTags] = useState([]);
  const [selectedOption, setSelctedOption] = useState([]);
  const handleChange = (selectedOption) => {
    setSelctedOption(selectedOption);
    setTagValue({ ...tagValue, city: selectedOption.label });
  };
  const addTags = () => {
    if (tagValue) {
      if (isSimilarTag(tagValue.city)) {
        alert("Product already exists");
        return true;
      }

      setTags([...tags, tagValue]);
      setTagValue({ city: "", points: "" });
    }
  };
  const isSimilarTag = (unique) => {
    if (tags && tags.length > 0) {
      const city = tags.filter((c) => c?.city?.includes(unique));
      if (city.length > 0) {
        return true;
      }
    }
  };
  const deleteTag = (value) => {
    const remainTags = tags.filter((t) => t !== value);
    setTags(remainTags);
  };

  const [inputList, setInputList] = useState([
    {
      id: 1,
      products: "",
      productLimit: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        products: "",
        productLimit: "",
      },
    ]);
  };
  const handleChangeFields = (e, id) => {
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
    <>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 w-full">
        <div className="text-right">
          <button
            onClick={handleAddFields}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {inputList.map((item, index) => (
          <div key={item.id} className="mb-5">
            <div className="flex gap-8 items-end mb-5">
              <div className="text-lg">Group</div>
              <button
                onClick={() => handleDelete(index)}
                type="button"
                className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex gap-10 items-end">
              <div className="mb-3">
                <label htmlFor={`products_${item.id}`} className="block">
                  Add Products
                </label>
                <Select
                  className="w-[350px]"
                  id={`products_${item.id}`}
                  name="products"
                  options={options}
                  value={options.find((option) => option.value === item.per)}
                  onChange={(selectedOption) =>
                    handleDDChange("products", selectedOption, item.id)
                  }
                  isSearchable={false}
                />
              </div>
              <div className="mb-3">
                <label htmlFor={`productLimit_${item.id}`} className="block">
                  Max Product Limit
                </label>
                <input
                  type="number"
                  id={`productLimit_${item.id}`}
                  name="productLimit"
                  value={item.productLimit}
                  onChange={(e) => handleChangeFields(e, item.id)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="2"
                />
              </div>
              <button
                onClick={addTags}
                type="button"
                className="w-9 h-9 mb-3 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-wrap">
              {tags.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="bg-yellow-400 m-2 p-2 rounded-md flex items-center gap-2"
                    >
                      <div>
                        <button className="mr-1 cursor-auto">
                          {item.city} | {item.points}
                        </button>
                      </div>
                      <div>
                        <span
                          className="cursor-pointer"
                          onClick={() => deleteTag(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </>
                );
              })}
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
      </div>
    </>
  );
};

export default GroupTab;
