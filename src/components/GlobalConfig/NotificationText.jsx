import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
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
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { hasViewOnlyAccessGroup2 } from "../../utils/roleUtils";

const NotificationText = () => {
  const dispatch = useDispatch();
  const { notificationInputList, loading, error } = useSelector(
    (state) => state.globalConfig
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchNotificationData());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleSave = async (id, index) => {
    await dispatch(validateForm(notificationInputList[index]));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      await dispatch(saveNotificationData(id))
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2>
        <b
          title="Notification Text"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Notification Text
        </b>
      </h2>
      {notificationInputList?.map((notificationData, index) => (
        <ContainerTile
        loading={loading}
        // error={error}
        key={"notification"+index}
        >
          <div key={notificationData.id} className="flex flex-col gap-y-6 ">
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_50px] gap-5">
              <InputText
                labelName="Notification Type"
                inputName="notificationType"
                id={`notificationType_${notificationData?.id}`}
                inputValue={notificationData?.notificationType}
                disabled
                placeHolder="REMINDER_EMI"
              />
              <InputText
                labelName="Notification Display Name"
                inputName="notificationDisplayName"
                id={`notificationDisplayName_${notificationData?.id}`}
                inputValue={notificationData?.notificationDisplayName}
                disabled
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
              />
            </div>
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_50px] gap-5 items-end">
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
                isValidation={true}
                isIndex={notificationData.dataIndex}
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
                isValidation={true}
                isIndex={notificationData.dataIndex}
              />
              <InputTextarea
                labelName="Notification Description"
                rowCount={2}
                inputName="notificationDescription"
                inputId={`notificationDescription_${notificationData?.id}`}
                inputValue={notificationData?.notificationDescription}
                disabled
                placeHolder="2 days before the upcoming installment"
              />
              {!hasViewOnlyAccessGroup2(roleName) ? (
                <div>
                  <Button
                    buttonIcon={CheckCircleIcon}
                    buttonName={""}
                    onClick={() => handleSave(notificationData?.id, index)}
                    rectangle={true}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </ContainerTile>
      ))}
    </div>
  );
};

export default NotificationText;
