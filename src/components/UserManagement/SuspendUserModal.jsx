import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";

const SuspendUserModal = ({ isOpen, onClose, getUser, userDetails }) => {
  const [suspensionReason, setSuspensionReason] = useState("");

  const suspendUser = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/users/${userDetails.username}/suspend/${suspensionReason}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 400) {
        const errorData = await data.json();
        console.log(errorData.message);
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Failed"}
            message={errorData.message}
          />
        ));
        return; // Stop further execution
      }
      if (data.status === 200) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Success"}
            message={"User Suspended Successfully !!"}
          />
        ));
        getUser();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white flex flex-col gap-7 p-5 rounded-lg shadow-lg w-4/5 ">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            <InputText
              labelName="Reason for Suspension"
              inputName="suspensionReason"
              inputValue={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              required
            />
          </form>
          <div className="flex gap-3 justify-center md:justify-end">
            <Button
              buttonName={"Cancel"}
              onClick={() => {
                onClose();
              }}
              className={" bg-gray-600 text-white hover:bg-gray-500 self-end"}
              rectangle={true}
            />
            <Button
              buttonName={"Suspend"}
              onClick={suspendUser}
              rectangle={true}
              className={"self-end"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuspendUserModal;
