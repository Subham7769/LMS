import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import useGlobalConfig from "../utils/useGlobalConfig";

const notiChannelOptions = [
  { value: "PUSH", label: "Push" },
  { value: "SMS", label: "SMS" },
  { value: "BOTH", label: "Both" },
];

const NotificationText = () => {
  const [notificationsDataNew, setNotificationsDataNew] = useState([]);
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
  const url = "notifications-data";
  const notificationsData = useGlobalConfig(url);
  // console.log(notificationsData);
  if (notificationsData.length === 0) {
    return (
      <>
        <div>Fetching Data</div>
      </>
    );
  }
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
  // const handleDelete = async (deleteURL) => {
  //   try {
  //     const token = localStorage.getItem("authToken"); // Assuming you store your token in localStorage

  //     // First, send a DELETE request
  //     const deleteResponse = await fetch(
  //       `https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/notifications-data/${deleteURL}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!deleteResponse.ok) {
  //       throw new Error("Failed to delete the item");
  //     }

  //     // After deletion, fetch the updated data list
  //     const getResponse = await fetch(
  //       "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/configs/notifications-data",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!getResponse.ok) {
  //       throw new Error("Failed to fetch updated data");
  //     }

  //     const updatedData = await getResponse.json();

  //     setNotificationsDataNew(updatedData); // Assuming you have a state or function like this to update your UI
  //   } catch (error) {
  //     console.error(error);
  //     // Optionally, handle the error in the UI, such as showing an error message
  //   }
  // };
  return (
    <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
      <div className="flex items-start justify-between ">
        <div className="mb-10 text-lg">Notification Text</div>
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
          className="flex flex-col gap-y-6 mb-10 border-b border-gray-300 pb-8"
        >
          <div className="flex gap-8">
            <div className="relative">
              <label
                htmlFor={`notiType_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Type
              </label>
              <input
                type="text"
                name="notiType"
                id={`notiType_${item.id}`}
                value={item.notiType}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                placeholder="REMINDER_EMI"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`notiDisplayName_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Display Name
              </label>
              <input
                type="text"
                name="notiDisplayName"
                id={`notiDisplayName_${item.id}`}
                value={item.notiDisplayName}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Installment reminder"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`notiChannel_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Channel
              </label>
              <Select
                className="w-80"
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
          <div className="flex gap-8">
            <div className="relative">
              <label
                htmlFor={`notiMsg_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Message En
              </label>
              <textarea
                type="text"
                rows={2}
                name="notiMsg"
                id={`notiMsg_${item.id}`}
                value={item.notiMsg}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="This is the emi reminder message, last payment amount is"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`notiMsgHi_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Message Hi
              </label>
              <textarea
                type="text"
                rows={2}
                name="notiMsgHi"
                id={`notiMsgHi_${item.id}`}
                value={item.notiMsgHi}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="This is the emi reminder message, last payment amount is"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`notiDescription_${item.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Description
              </label>
              <textarea
                type="text"
                rows={2}
                name="notiDescription"
                id={`notiDescription_${item.id}`}
                value={item.notiDescription}
                onChange={(e) => handleChange(e, item.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="2 days before the upcoming installment"
              />
            </div>
          </div>
        </div>
      ))}
      {(notificationsDataNew.length === 0
        ? notificationsData
        : notificationsDataNew
      ).map((notdata) => (
        <div
          key={notdata.id}
          className="flex flex-col gap-y-6 mb-10 border-b border-gray-300 pb-8"
        >
          <div className="flex gap-8">
            <div className="relative">
              <label
                htmlFor={`notificationType_${notdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Type
              </label>
              <input
                type="text"
                name="notificationType"
                id={`notificationType_${notdata.id}`}
                value={notdata.notificationType}
                onChange={(e) => handleChange(e, notdata.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                placeholder="REMINDER_EMI"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`notificationDisplayName_${notdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Display Name
              </label>
              <input
                type="text"
                name="notificationDisplayName"
                id={`notificationDisplayName_${notdata.id}`}
                value={notdata.notificationDisplayName}
                onChange={(e) => handleChange(e, notdata.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Installment reminder"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`notificationChannel_${notdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Channel
              </label>
              <Select
                className="w-80"
                options={notiChannelOptions}
                id={`notificationChannel_${notdata.id}`}
                name="notificationChannel"
                value={notiChannelOptions.find(
                  (option) => option.value === notdata.notificationChannel
                )}
                onChange={(selectedOption) =>
                  handleDDChange("notiChannel", selectedOption, notdata.id)
                }
                isSearchable={false}
              />
            </div>
            {/* <button
              onClick={() => handleDelete(notdata.id)}
              type="button"
              className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button> */}
          </div>
          <div className="flex gap-8">
            <div className="relative">
              <label
                htmlFor={`notificationMessageEn_${notdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Message En
              </label>
              <textarea
                type="text"
                rows={2}
                name="notificationMessageEn"
                id={`notificationMessageEn_${notdata.id}`}
                value={notdata.notificationMessageEn}
                onChange={(e) => handleChange(e, notdata.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="This is the emi reminder message, last payment amount is"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`notificationMessageAr_${notdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Message Ar
              </label>
              <textarea
                type="text"
                rows={2}
                name="notificationMessageAr"
                id={`notificationMessageAr_${notdata.id}`}
                value={notdata.notificationMessageAr}
                onChange={(e) => handleChange(e, notdata.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="This is the emi reminder message, last payment amount is"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`notificationDescription_${notdata.id}`}
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Notification Description
              </label>
              <textarea
                type="text"
                rows={2}
                name="notificationDescription"
                id={`notificationDescription_${notdata.id}`}
                value={notdata.notificationDescription}
                onChange={(e) => handleChange(e, notdata.id)}
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="2 days before the upcoming installment"
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
    </div>
  );
};

export default NotificationText;
