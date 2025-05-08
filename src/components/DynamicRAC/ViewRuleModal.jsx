import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Toolbox from "./ToolBox";
import convertToReadableString from "../../utils/convertToReadableString";
import { useSelector } from "react-redux";

const ViewRuleModal = ({
  isOpen,
  isEditMode = false,
  onClose,
  sectionId,
  sectionName,
}) => {

  const { currentRule } = useSelector((state) => state.dynamicRac);


  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-500/10 backdrop-blur-sm">
        <div className="relative w-[50%] max-h-[80vh] bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-500 ease-in-out  overflow-y-scroll">
          <div
            className={
              "sticky bg-white z-50 left-0 top-0 flex justify-between align-middle p-5 py-5 border-b-2"
            }
          >
            <p className={"font-semibold text-2xl"}>
              {convertToReadableString(
                isEditMode ? `Edit ${currentRule.name} Rule` : "Add New Rule"
              )}
            </p>
            <XMarkIcon
              onClick={onClose}
              className=" h-8 w-8 text-gray-500 rounded-full cursor-pointer"
            />
          </div>
          <Toolbox
            sectionId={sectionId}
            sectionName={sectionName}
            onClose={onClose}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    </>
  );
};

export default ViewRuleModal;
