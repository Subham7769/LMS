import { useEffect, useState } from "react";
import { PlusIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import Select from "react-select";
import useGlobalConfig from "../../utils/useGlobalConfig";
import { toast, Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import Button from "../Common/Button/Button";
import { notiChannelOptions } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputTextarea from "../Common/InputTextArea/InputTextArea";
import InputSelect from "../Common/InputSelect/InputSelect";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const NotificationText = () => {
  const [inputList, setInputList] = useState([]);
  const url = "notifications-data";
  const notificationsData = useGlobalConfig(url);

  useEffect(() => {
    if (notificationsData.length > 0) {
      setInputList(notificationsData);
    }
  }, [notificationsData]);

  if (notificationsData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    const list = [...inputList];
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      list[index][name] = value;
      setInputList(list);
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
          `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/notifications-data/${id}`,
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
      <ContainerTile>
        {inputList.map((notdata) => (
          <div
            key={notdata.id}
            className="flex flex-col gap-y-6 mb-10 border-b border-gray-300 pb-8"
          >
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_50px] gap-5">
              <InputText
                labelName="Notification Type"
                inputName="notificationType"
                id={`notificationType_${notdata.id}`}
                inputValue={notdata.notificationType}
                disabled
                placeHolder="REMINDER_EMI"
              />
              <InputText
                labelName="Notification Display Name"
                inputName="notificationDisplayName"
                id={`notificationDisplayName_${notdata.id}`}
                inputValue={notdata.notificationDisplayName}
                disabled
                placeHolder="Installment reminder"
              />
              <InputSelect
                labelName="Notification Channel"
                inputOptions={notiChannelOptions}
                inputId={notdata.id}
                inputName="notificationChannel"
                inputValue={notdata.notificationChannel}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_50px] gap-5">
              <InputTextarea
                labelName="Notification Message En"
                rowCount={2}
                inputName="notificationMessageEn"
                inputId={notdata.id}
                inputValue={notdata.notificationMessageEn}
                onChange={handleChange}
                placeHolder="This is the emi reminder message, last payment amount is"
              />
              <InputTextarea
                labelName="Notification Message Hi"
                rowCount={2}
                inputName="notificationMessageAr"
                inputId={notdata.id}
                inputValue={notdata.notificationMessageAr}
                onChange={handleChange}
                placeHolder="This is the emi reminder message, last payment amount is"
              />
              <InputTextarea
                labelName="Notification Description"
                rowCount={2}
                inputName="notificationDescription"
                inputId={`notificationDescription_${notdata.id}`}
                inputValue={notdata.notificationDescription}
                disabled
                placeHolder="2 days before the upcoming installment"
              />
              <div>
                <Button
                  buttonIcon={CheckCircleIcon}
                  buttonName={""}
                  onClick={() => handleSave(notdata.id)}
                  rectangle={true}
                />
              </div>
            </div>
          </div>
        ))}
      </ContainerTile>
    </>
  );
};

export default NotificationText;
