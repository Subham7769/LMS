import { useEffect, useState } from "react";
import TagInput from "../TagInput/TagInput";
import { useDispatch, useSelector } from "react-redux";
import {
  setApprovalFormData,
  addApprovalData,
  deleteApprovalData,
} from "../../redux/Slices/productSlice";
import { validateForm } from "../../redux/Slices/validationSlice";

import { toast } from "react-toastify";
import store from "../../redux/store";

const ApprovalCard = ({ approvalData, role }) => {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { approvalFormData } = useSelector(
    (state) => state.product.productData
  );

  useEffect(() => {
    if (approvalData) {
      console.log("Entered here");
      setTags(
        approvalData.map((data) => ({
          role: data.role,
          limit: data.limit,
        }))
      );
    }
  }, [approvalData]);

  console.log(approvalData);
  console.log(approvalFormData);

  useEffect(() => {
    // if (tags.length > 0) {
    dispatch(setApprovalFormData({ name: "tags", value: tags }));
    // }
  }, [tags, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setApprovalFormData({ name, value }));
  };

  const addTag = async () => {
    dispatch(addApprovalData());
  };

  // const isSimilarTag = (city) => {
  //   return approvalFormData.tags.some((tag) => tag.city === city);
  // };

  const deleteTag = async (tagToDelete) => {
    dispatch(
      setApprovalFormData({
        name: "tags",
        value: approvalFormData.tags.filter((tag) => tag !== tagToDelete),
      })
    );
  };

  const handleDeleteTag = (tag) => {
    dispatch(deleteApprovalData({ tag })); // Dispatch with ruleIndex and tag
  };

  return (
    <>
      <div className="text-lg mb-3 mt-5 border-t border-gray-300 pt-3">
        Approval Hierarchy
      </div>
      <TagInput
        formData={approvalFormData}
        handleChange={handleChange}
        inputSelectName={"role"}
        inputSelectLabel={"Role"}
        productTypeOptions={role}
        addTag={addTag}
        deleteTag={(tag) => handleDeleteTag(tag)}
        inputNumberName={"limit"}
        inputNumberLabel={"Principal Amount Limit"}
        isValidation={true}
        isValidation2={true}
      />
    </>
  );
};

export default ApprovalCard;
