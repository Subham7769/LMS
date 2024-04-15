import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";

const notiChannelOptions = [
  { value: "push", label: "Push" },
  { value: "sms", label: "SMS" },
  { value: "both", label: "Both" },
];

const NotificationText = () => {
  const [inputList, setInputList] = useState([
    {
      id: 1,
      notiType: "",
      notiMsg: "",
      notiMsgHi: "",
      notiDescription: "",
      notiDisplayName: "",
      notiChannel: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        id: Date.now(),
        notiType: "",
        notiMsg: "",
        notiMsgHi: "",
        notiDescription: "",
        notiDisplayName: "",
        notiChannel: "",
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
        <div className="">Notification Text</div>
        <button
          onClick={handleAddFields}
          type="button"
          className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {inputList.map((item, index) => (
        <div key={item.id} className="flex gap-4 mt-5">
          <div className="relative">
            <label
              htmlFor={`notiType_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Notification Type
            </label>
            <input
              type="text"
              name="notiType"
              id={`notiType_${item.id}`}
              value={item.notiType}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="REMINDER_EMI"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`notiMsg_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Notification Message En
            </label>
            <textarea
              type="text"
              rows={4}
              name="notiMsg"
              id={`notiMsg_${item.id}`}
              value={item.notiMsg}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="This is the emi reminder message, last payment amount is"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`notiMsgHi_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Notification Message Hi
            </label>
            <textarea
              type="text"
              rows={4}
              name="notiMsgHi"
              id={`notiMsgHi_${item.id}`}
              value={item.notiMsgHi}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="This is the emi reminder message, last payment amount is"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`notiDescription_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Notification Description
            </label>
            <textarea
              type="text"
              rows={4}
              name="notiDescription"
              id={`notiDescription_${item.id}`}
              value={item.notiDescription}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="2 days before the upcoming installment"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`notiDisplayName_${item.id}`}
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Notification Display Name
            </label>
            <input
              type="text"
              name="notiDisplayName"
              id={`notiDisplayName_${item.id}`}
              value={item.notiDisplayName}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Installment reminder"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`notiChannel_${item.id}`}
              className="absolute z-[2] -top-2 left-2 inline-block bg-white px-1 text-xs text-gray-900"
            >
              Notification Channel
            </label>
            <Select
              className="w-40"
              options={notiChannelOptions}
              id={`notiChannel_${item.id}`}
              name="notiChannel"
              value={notiChannelOptions.find(
                (option) => option.value === item.notiChannel
              )}
              onChange={(selectedOption) =>
                handleDDChange("notiChannel", selectedOption, item.id)
              }
              isSearchable={false}
            />
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

export default NotificationText;
