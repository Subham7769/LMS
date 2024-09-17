import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { toast, Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import Button from "../Common/Button/Button";
import { notiChannelOptions } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputTextarea from "../Common/InputTextArea/InputTextArea";
import InputSelect from "../Common/InputSelect/InputSelect";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationData,
  handleNotificationChange,
  saveNotificationData,
} from "../../redux/Slices/globalConfigSlice";

const NotificationText = () => {
  const dispatch = useDispatch();
  const { notificationInputList, loading, error } = useSelector(
    (state) => state.globalConfig
  );

  useEffect(() => {
    dispatch(fetchNotificationData());
  }, [dispatch]);

  const handleSave = async (id) => {
    try {
      await dispatch(saveNotificationData(id)).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Updated Successfully"}
          message={"Data has been updated successfully"}
        />
      ));
    } catch (error) {
      // Handle the error here if needed
      toast.custom((t) => (
        <Failed
          t={t}
          toast={toast}
          title={"Edit Failed"}
          message={`${error.message}`}
        />
      ));
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
        {notificationInputList?.map((notdata) => (
          <div
            key={notdata.id}
            className="flex flex-col gap-y-6 mb-10 border-b border-gray-300 pb-8"
          >
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_50px] gap-5">
              <InputText
                labelName="Notification Type"
                inputName="notificationType"
                id={`notificationType_${notdata?.id}`}
                inputValue={notdata?.notificationType}
                disabled
                placeHolder="REMINDER_EMI"
              />
              <InputText
                labelName="Notification Display Name"
                inputName="notificationDisplayName"
                id={`notificationDisplayName_${notdata?.id}`}
                inputValue={notdata?.notificationDisplayName}
                disabled
                placeHolder="Installment reminder"
              />
              <InputSelect
                labelName="Notification Channel"
                inputOptions={notiChannelOptions}
                inputId={notdata?.id}
                inputName="notificationChannel"
                inputValue={notdata?.notificationChannel}
                onChange={(e) =>
                  dispatch(
                    handleNotificationChange({
                      id: notdata?.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_50px] gap-5">
              <InputTextarea
                labelName="Notification Message En"
                rowCount={2}
                inputName="notificationMessageEn"
                inputId={notdata?.id}
                inputValue={notdata?.notificationMessageEn}
                onChange={(e) =>
                  dispatch(
                    handleNotificationChange({
                      id: notdata?.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                placeHolder="This is the emi reminder message, last payment amount is"
              />
              <InputTextarea
                labelName="Notification Message Hi"
                rowCount={2}
                inputName="notificationMessageAr"
                inputId={notdata?.id}
                inputValue={notdata?.notificationMessageAr}
                onChange={(e) =>
                  dispatch(
                    handleNotificationChange({
                      id: notdata?.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                placeHolder="This is the emi reminder message, last payment amount is"
              />
              <InputTextarea
                labelName="Notification Description"
                rowCount={2}
                inputName="notificationDescription"
                inputId={`notificationDescription_${notdata?.id}`}
                inputValue={notdata?.notificationDescription}
                disabled
                placeHolder="2 days before the upcoming installment"
              />
              <div>
                <Button
                  buttonIcon={CheckCircleIcon}
                  buttonName={""}
                  onClick={() => handleSave(notdata?.id)}
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
