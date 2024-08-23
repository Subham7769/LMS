import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import {
  fetchUsers,
  suspendUser,
} from "../../redux/Slices/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";

const SuspendUserModal = ({ isOpen, onClose, userDetails }) => {
  const [suspensionReason, setSuspensionReason] = useState("");
  const dispatch = useDispatch();

  const handleSuspendUser = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        suspendUser({
          userName: userDetails.username,
          reason: suspensionReason,
        })
      ).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Success"}
          message={"User Suspended Successfully !!"}
        />
      ));
      onClose();
    } catch (error) {
      toast.custom((t) => (
        <Failed t={t} toast={toast} title={"Failed"} message={error} />
      ));
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
              onClick={handleSuspendUser}
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
