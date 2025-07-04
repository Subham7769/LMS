import React, { useState } from "react";
import Modal from "../Common/Modal/Modal";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import convertToReadableString from "../../utils/convertToReadableString";
import { AddIcon, DeleteIcon } from "../../assets/icons";
import ListTableClassic from "../Common/ListTable/ListTableClassic";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { useDispatch, useSelector } from "react-redux";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch";
import ShimmerTable from "../Common/ShimmerTable/ShimmerTable";
import {
  deleteCategoryFromParametersData,
  handleChangeParametersData,
} from "../../redux/Slices/drlRulesetSlice";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import AddCategoryModal from "./AddCategoryModal";

const ParameterDataModal = ({
  loading,
  isOpen,
  onClose,
  tag,
  ruleManagerData,
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const dispatch = useDispatch();
  const { dynamicParameterDTOList } = ruleManagerData;
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const handleChange = (e, tagName, index) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const fieldName = type === "checkbox" ? name.split("_")[0] : name;

    if (!hasViewOnlyAccess(roleName)) {
      dispatch(
        handleChangeParametersData({
          tagName, // e.g., "nationality"
          index, // which entry inside parameterNameValueList or parameterNumberRangeValueList
          name: fieldName,
          value: fieldValue,
        })
      );
    }
  };

  const handleDelete = (index) => {
    dispatch(
      deleteCategoryFromParametersData({
        tagName: tag.name,
        tagType: tag.type,
        index,
      })
    );
  };

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

  const handleAddCategory = () => {
    setShowAddCategory(true);
  };

  const closeAddCategoryModal = () => {
    setShowAddCategory(false);
  };

  const matchedParam = dynamicParameterDTOList?.find(
    (param) => param.name === tag?.name
  );

  const isNumber = tag?.type === "NUMBER";
  const isString = tag?.type === "STRING";

  const rows = isNumber
    ? matchedParam?.parameterNumberRangeValueList
    : matchedParam?.parameterNameValueList;

  let ListHeader = [];

  if (isNumber) {
    ListHeader.push(
      { name: "Min", sortKey: null },
      { name: "Max", sortKey: null }
    );
  }

  if (isString) {
    ListHeader.push({ name: "Category Value", sortKey: null });
  }

  ListHeader.push(
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
              onClick={handleAddCategory}
            />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-scroll mb-5">
          <ListTableClassic
            ListName={`List of ${convertToReadableString(tag.name)}`}
            ListNameLength={rows?.length}
            ListHeader={ListHeader}
          >
            {rows?.map((paramData, index) => (
              <tr key={index}>
                {isNumber && (
                  <>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <InputText
                        inputName="minimum"
                        inputValue={paramData?.minimum}
                        onChange={(e) => handleChange(e, tag.name, index)}
                        isValidation={true}
                        isIndex={paramData?.dataIndex}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <InputText
                        inputName="maximum"
                        inputValue={paramData?.maximum}
                        onChange={(e) => handleChange(e, tag.name, index)}
                        isValidation={true}
                        isIndex={paramData?.dataIndex}
                      />
                    </td>
                  </>
                )}
                {isString && (
                  <>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <InputText
                        inputName="name"
                        inputValue={paramData?.name}
                        onChange={(e) => handleChange(e, tag.name, index)}
                        isValidation={true}
                        isIndex={paramData?.dataIndex}
                      />
                    </td>
                  </>
                )}
                <td className="px-4 py-4 whitespace-nowrap">
                  <InputText
                    inputName="value"
                    inputValue={paramData?.value}
                    onChange={(e) => handleChange(e, tag.name, index)}
                    isValidation={true}
                    isIndex={paramData?.dataIndex}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <ToggleSwitch
                    inputName={`baseline_${index}`}
                    inputChecked={paramData?.baseline}
                    onChange={(e) => handleChange(e, tag.name, index)}
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
                      buttonIcon={DeleteIcon}
                      onClick={() => handleDelete(index)}
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
      <AddCategoryModal
        isOpen={showAddCategory}
        onClose={closeAddCategoryModal}
        tag={tag}
      />
    </>
  );
};

export default ParameterDataModal;
