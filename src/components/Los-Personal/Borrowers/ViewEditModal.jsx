import React from "react";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { useDispatch } from "react-redux";
import { downloadDocumentFile } from "../../../redux/Slices/personalLoansSlice";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { accountStatusOptions } from "../../../data/LosData";

const ViewEditModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-stone-200/10 backdrop-blur-sm">
        <div className="relative w-1/3 p-8 bg-white border border-red-600 rounded-xl shadow-lg transition-all duration-500 ease-in-out">
          <XMarkIcon
            onClick={onClose}
            className="absolute p-1 top-1 right-1 h-6 w-6 text-white bg-red-500 rounded-full cursor-pointer"
          />
          <div className="flex justify-start gap-5 flex-col mt-4">
              <Button
                buttonName={"Edit"}
                onClick={() => handleEdit(rowData.uid)}
                className={"text-center"}
                rectangle={true}
              />
              <InputSelect
                labelName={"Account Status"}
                inputName={"accountStatus"}
                inputOptions={accountStatusOptions}
                inputValue={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
              />
              <Button
                buttonName={"Change Status"}
                onClick={() => handleChangeStatus(rowData.uid, currentStatus)}
                className={"bg-red-500 hover:bg-red-600"}
                rectangle={true}
              />
            </div>
        </div>
      </div>
    </>
  );
};

export default ViewEditModal;
