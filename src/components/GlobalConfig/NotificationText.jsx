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
import {
  clearValidationError,
  setValidationError,
  validateFormFields,
} from "../../redux/Slices/validationSlice";

const NotificationText = () => {
  const dispatch = useDispatch();
  const { notificationInputList, loading, error } = useSelector((state) => state.globalConfig);
  const { validationError } = useSelector((state) => state.validation);
  const fields = ["notificationType", "notificationDisplayName", "notificationChannel", "notificationMessageEn", "notificationMessageAr", "notificationDescription"];

  useEffect(() => {
    dispatch(fetchNotificationData());
    if (notificationInputList?.length) {
      const initialValidationError = {};
      notificationInputList.forEach((_, index) => {
        fields.forEach((field) => {
          // Create validation keys dynamically based on the index
          initialValidationError[`${field}_${index}`] = false;
        });
      });
      dispatch(setValidationError(initialValidationError));
    }
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleSave = async (id, index) => {
    const isValid = validateFormFields(fields, notificationInputList[index], dispatch, null, index);
    console.log(notificationInputList[index])
    console.log(isValid)
    if (isValid) {
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
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-6">
        <b
          title="Notification Text"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Notification Text
        </b>
      </h2>
      {notificationInputList?.map((notificationData, index) => (
        <ContainerTile>
          <div
            key={notificationData.id}
            className="flex flex-col gap-y-6 "
          >
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_50px] gap-5">
              <InputText
                labelName="Notification Type"
                inputName="notificationType"
                id={`notificationType_${notificationData?.id}`}
                inputValue={notificationData?.notificationType}
                disabled
                placeHolder="REMINDER_EMI"
                showError={validationError[`notificationType_${index}`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({ ...validationError, [`notificationType_${index}`]: false })
                  )
                }
              />
              <InputText
                labelName="Notification Display Name"
                inputName="notificationDisplayName"
                id={`notificationDisplayName_${notificationData?.id}`}
                inputValue={notificationData?.notificationDisplayName}
                disabled
                place showError={validationError[`notificationDisplayName_${index}`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({ ...validationError, [`notificationDisplayName_${index}`]: false })
                  )
                } Holder="Installment reminder"

              />
              <InputSelect
                labelName="Notification Channel"
                inputOptions={notiChannelOptions}
                inputId={notificationData?.id}
                inputName="notificationChannel"
                inputValue={notificationData?.notificationChannel}
                onChange={(e) =>
                  dispatch(
                    handleNotificationChange({
                      id: notificationData?.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                showError={validationError[`notificationChannel_${index}`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({ ...validationError, [`notificationChannel_${index}`]: false })
                  )
                }
              />
            </div>
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_50px] gap-5">
              <InputTextarea
                labelName="Notification Message En"
                rowCount={2}
                inputName="notificationMessageEn"
                inputId={notificationData?.id}
                inputValue={notificationData?.notificationMessageEn}
                onChange={(e) =>
                  dispatch(
                    handleNotificationChange({
                      id: notificationData?.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                placeHolder="This is the emi reminder message, last payment amount is"
                showError={validationError[`notificationMessageEn_${index}`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({ ...validationError, [`notificationMessageEn_${index}`]: false })
                  )
                }
              />
              <InputTextarea
                labelName="Notification Message Hi"
                rowCount={2}
                inputName="notificationMessageAr"
                inputId={notificationData?.id}
                inputValue={notificationData?.notificationMessageAr}
                onChange={(e) =>
                  dispatch(
                    handleNotificationChange({
                      id: notificationData?.id,
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                placeHolder="This is the emi reminder message, last payment amount is"
                showError={validationError[`notificationMessageAr_${index}`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({ ...validationError, [`notificationMessageAr_${index}`]: false })
                  )
                }
              />
              <InputTextarea
                labelName="Notification Description"
                rowCount={2}
                inputName="notificationDescription"
                inputId={`notificationDescription_${notificationData?.id}`}
                inputValue={notificationData?.notificationDescription}
                disabled
                placeHolder="2 days before the upcoming installment"
                showError={validationError[`notificationDescription_${index}`]}
                onFocus={() =>
                  dispatch(
                    setValidationError({ ...validationError, [`notificationDescription_${index}`]: false })
                  )
                }
              />
              <div>
                <Button
                  buttonIcon={CheckCircleIcon}
                  buttonName={""}
                  onClick={() => handleSave(notificationData?.id, index)}
                  rectangle={true}
                />
              </div>
            </div>
          </div>
        </ContainerTile>
      ))}
    </div>
  );
};

export default NotificationText;
