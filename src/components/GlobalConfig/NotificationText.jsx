import { useEffect, useState } from "react";
import { PlusIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import Select from "react-select";
import useGlobalConfig from "../../utils/useGlobalConfig";
import { toast, Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import Button from "../Common/Button/Button";

const notiChannelOptions = [
  { value: "PUSH", label: "Push" },
  { value: "SMS", label: "SMS" },
  { value: "BOTH", label: "Both" },
];

const NotificationText = () => {
  const [notificationsDataNew, setNotificationsDataNew] = useState([]);
  const [inputList, setInputList] = useState([]);
  const url = "notifications-data";
  const notificationsData = useGlobalConfig(url);

  useEffect(() => {
    if (notificationsData.length > 0) {
      setInputList(notificationsData);
    }
  }, [notificationsData]);

  // console.log(notificationsData);
  if (notificationsData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const list = [...inputList];
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      list[index][name] = value;
      setInputList(list);
    }
  };
  const handleDDChange = (propName, selectedOption, id) => {
    const name = propName;
    const list2 = [...inputList];
    const index = list2.findIndex((item) => item.id === id);
    if (index !== -1) {
      list2[index][name] = selectedOption.value;
      setInputList(list2);
    }
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem("authToken");
    const item = inputList.find((item) => item.id === id);
    if (item) {
      const updatedItem = {
        notificationMessageEn: item.notificationMessageEn,
        notificationMessageAr: item.notificationMessageAr,
        notificationChannel: item.notificationChannel,
      };

      try {
        const response = await fetch(
          `https://lmscarbon.com/xc-tm-customer-care/lmscarbon/api/v1/configs/notifications-data/${id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem), // Pass the updatedItem instead of item
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Edit Successful"}
            message={"Notification edit was successful"}
          />
        ));
      } catch (error) {
        console.log(error.message);
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Edit Failed"}
            message={`${error.message}`}
          />
        ));
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-6">
        <b
          title="Notification Text"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Notification Text
        </b>
      </h2>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-start justify-between ">
          <div></div>
        </div>
        {(notificationsDataNew.length === 0
          ? notificationsData
          : notificationsDataNew
        ).map((notdata) => (
          <div
            key={notdata.id}
            className="flex flex-col gap-y-6 mb-10 border-b border-gray-300 pb-8"
          >
            <div className="flex gap-8">
              <div className="relative w-[27%]">
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
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                  placeholder="REMINDER_EMI"
                />
              </div>
              <div className="relative w-[27%]">
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
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Installment reminder"
                />
              </div>
              <div className="relative w-[27%]">
                <label
                  htmlFor={`notificationChannel_${notdata.id}`}
                  className=" bg-white px-1 text-xs text-gray-900"
                >
                  Notification Channel
                </label>
                <Select
                  className=""
                  options={notiChannelOptions}
                  id={`notificationChannel_${notdata.id}`}
                  name="notificationChannel"
                  value={notiChannelOptions.find(
                    (option) => option.value === notdata.notificationChannel
                  )}
                  onChange={(selectedOption) =>
                    handleDDChange(
                      "notificationChannel",
                      selectedOption,
                      notdata.id
                    )
                  }
                  isSearchable={false}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="relative w-[27%]">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="This is the emi reminder message, last payment amount is"
                />
              </div>
              <div className="relative w-[27%]">
                <label
                  htmlFor={`notificationMessageAr_${notdata.id}`}
                  className=" bg-white px-1 text-xs text-gray-900"
                >
                  Notification Message Hi
                </label>
                <textarea
                  type="text"
                  rows={2}
                  name="notificationMessageAr"
                  id={`notificationMessageAr_${notdata.id}`}
                  value={notdata.notificationMessageAr}
                  onChange={(e) => handleChange(e, notdata.id)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="This is the emi reminder message, last payment amount is"
                />
              </div>
              <div className="relative w-[27%]">
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
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="2 days before the upcoming installment"
                />
              </div>
              <div>
                <Button buttonIcon={CheckCircleIcon} buttonName={""} onClick={() => handleSave(notdata.id)} rectangle={true} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationText;
