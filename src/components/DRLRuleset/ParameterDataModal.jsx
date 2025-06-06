import React from "react";
import Modal from "../Common/Modal/Modal";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import convertToReadableString from "../../utils/convertToReadableString";
import { AddIcon, CheckIcon, DeleteIcon } from "../../assets/icons";
import ListTableClassic from "../Common/ListTable/ListTableClassic";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { useDispatch, useSelector } from "react-redux";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch";
import ShimmerTable from "../Common/ShimmerTable/ShimmerTable";
import { handleChangeParametersData } from "../../redux/Slices/drlRulesetSlice";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const ParameterDataModal = ({ loading, isOpen, onClose, tag, paramertersData }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const handleChange = (e, id) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const fieldName = type === "checkbox" ? name.split("_")[0] : name;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(
        handleChangeParametersData({ id, name: fieldName, value: fieldValue })
      );
    }
  };
  const handleSave = () => {};
  const handleDelete = () => {};

  const getStatusClass = (status) => {
    const normalizedStatus = status?.toLowerCase();
    const statusClasses = {
      high: "bg-green-500/20 text-green-700 px-2",
      medium: "bg-yellow-500/20 text-yellow-700 px-2",
      low: "bg-red-500/20 text-red-700 px-2",
    };

    // Default class for unknown statuses
    return (
      Object.entries(statusClasses).find(([key]) =>
        normalizedStatus?.includes(key)
      )?.[1] || "bg-gray-400/20 text-gray-500 dark:text-gray-400 px-2"
    );
  };

  let ListHeader = [];

  if (tag?.fieldType === "NUMBER") {
    ListHeader.push(
      { name: "Min", sortKey: null },
      { name: "Max", sortKey: null }
    );
  }

  ListHeader.push(
    { name: "Category Value", sortKey: null },
    { name: "Numerical Score", sortKey: null },
    { name: "Baseline", sortKey: null },
    { name: "Impact", sortKey: null }
  );

  if (!hasViewOnlyAccess(roleName)) {
    ListHeader.push({ name: "Actions", sortKey: null });
  }

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed z-50 inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl w-3/4 h-[500px] relative shadow-lg transition-all duration-500 ease-in-out">
          <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
            <ShimmerTable />
            <ShimmerTable />
            <ShimmerTable />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Modal
        title={convertToReadableString(tag.name)}
        secondaryOnClick={onClose}
        isFooter={false}
        modalWidth="lg:w-3/4"
      >
        <div className="flex justify-between mb-5">
          <div>Variable: {tag.name}</div>
          <div>
            <Button
              buttonName="Add Category"
              buttonIcon={AddIcon}
              buttonType="primary"
            />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-scroll mb-5">
          <ListTableClassic
            ListName={`List of ${convertToReadableString(tag.name)}`}
            ListNameLength={paramertersData?.length}
            ListHeader={ListHeader}
          >
            {paramertersData?.map((paramData, index) => (
              <tr key={index}>
                {tag?.fieldType === "NUMBER" && (
                  <>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <InputText
                        inputName="min"
                        inputValue={paramData?.min}
                        onChange={(e) => handleChange(e, paramData?.id)}
                        isValidation={true}
                        isIndex={paramData?.dataIndex}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <InputText
                        inputName="max"
                        inputValue={paramData?.max}
                        onChange={(e) => handleChange(e, paramData?.id)}
                        isValidation={true}
                        isIndex={paramData?.dataIndex}
                      />
                    </td>
                  </>
                )}
                <td className="px-4 py-4 whitespace-nowrap">
                  <InputText
                    inputName="categoryValue"
                    inputValue={paramData?.categoryValue}
                    onChange={(e) => handleChange(e, paramData?.id)}
                    isValidation={true}
                    isIndex={paramData?.dataIndex}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <InputText
                    inputName="numericalScore"
                    inputValue={paramData?.numericalScore}
                    onChange={(e) => handleChange(e, paramData?.id)}
                    isValidation={true}
                    isIndex={paramData?.dataIndex}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <ToggleSwitch
                    inputName={`baseline_${paramData?.id}`}
                    inputChecked={paramData?.baseline}
                    onChange={(e) => handleChange(e, paramData?.id)}
                    onLabel="Yes"
                    offLabel="No"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block min-w-24 rounded-full font-medium py-0.5 ${getStatusClass(
                      paramData?.impact
                    )} text-center`}
                  >
                    {paramData?.impact}
                  </span>
                </td>
                {!hasViewOnlyAccess(roleName) && (
                  <td className="px-4 py-4 whitespace-nowrap flex gap-2">
                    <Button
                      buttonIcon={CheckIcon}
                      onClick={() => handleSave(paramData?.id, index)}
                      buttonType="success"
                    />
                    <Button
                      buttonIcon={DeleteIcon}
                      onClick={() => handleDelete(paramData?.id)}
                      buttonType="destructive"
                    />
                  </td>
                )}
              </tr>
            ))}
          </ListTableClassic>
        </div>
        <div className="bg-sky-500/20 text-sky-700 p-2 rounded-lg text-sm">
          <InformationCircleIcon className="h-4 w-4 inline-block" />{" "}
          <strong>Tip:</strong> Set one category as baseline (reference point).
          Higher scores indicate positive impact on the outcome.
        </div>
      </Modal>
    </>
  );
};

export default ParameterDataModal;
