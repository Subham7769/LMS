import React, { useEffect } from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import { interestMethodOptions, tenureOptions } from "../../data/OptionsData";
import { useDispatch, useSelector } from "react-redux";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { useOutletContext } from "react-router-dom";

const ProductConfig = () => {
  const { productData, handleChange } = useOutletContext();
  // Sidebar Redux Data

  const RPDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Rule Policy")[0]
        ?.submenuItems
  );
  const loanApprovalDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter(
        (item) => item.title === "Approval Config"
      )[0]?.submenuItems
  );
  const documentConfigDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter(
        (item) => item.title === "Document Config"
      )[0]?.submenuItems
  );
  const ProjectDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Loan Schema")[0]
        ?.submenuItems
  );
  const RecoveryDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Recovery")[0]
        ?.submenuItems
  );
  const { userData } = useSelector((state) => state?.auth);
  const roleName = userData?.roles[0]?.name;

  console.log(ProjectDataInfo);

  // Reusable function for formatting dropdown data
  function formateDataDropDown(replacerString, data) {
    const formattedData = data?.map(({ name, href }) => {
      let value = href.replace(replacerString, "");

      // If there's an additional segment (e.g., "/basic-details"), remove it
      value = value.split("/")[0];

      return {
        value,
        label: name,
      };
    });

    // Append the "None" option to the formatted data
    if (
      replacerString == "/loan/recovery/" ||
      replacerString == "/loan/rule-policy/"
    )
      formattedData?.push({
        value: "null",
        label: "None",
      });

    return formattedData;
  }

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Product Config
      </h2>
      <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-3">
        Loan Parameter
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <InputSelect
          labelName="Customer Type"
          inputOptions={tenureOptions}
          inputName="eligibleCustomerType"
          inputValue={
            productData?.eligibleCustomerType
              ? productData?.eligibleCustomerType
              : ""
          }
          onChange={handleChange}
          isValidation={true}
          disabled={hasViewOnlyAccess(roleName)}
        />
        <InputSelect
          labelName="Loan Schema"
          inputOptions={formateDataDropDown("/loan/project/", ProjectDataInfo)}
          inputName="projectId"
          inputValue={productData?.projectId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          inputOptions={formateDataDropDown(
            "/loan/recovery/",
            RecoveryDataInfo
          )}
          labelName="Recovery Type"
          inputName="recoveryEquationTempId"
          inputValue={productData?.recoveryEquationTempId}
          onChange={handleChange}
          // isValidation={true}
          // isClearable={true}
        />
        <InputSelect
          labelName="Rule Policy"
          inputOptions={formateDataDropDown("/loan/rule-policy/", RPDataInfo)}
          inputName="rulePolicyTempId"
          inputValue={productData?.rulePolicyTempId}
          onChange={handleChange}
          // isValidation={true}
          // isClearable={true}
        />
        <InputNumber
          labelName="No. of Early Settlement Installments"
          inputName="numberOfEmisForEarlySettlement"
          inputValue={productData?.numberOfEmisForEarlySettlement}
          onChange={handleChange}
          placeHolder="3"
          isValidation={true}
        />
        <InputSelect
          labelName="Interest Method"
          inputOptions={interestMethodOptions}
          inputName="interestMethod"
          inputValue={productData?.interestMethod}
          onChange={handleChange}
          isValidation={true}
        />
      </div>

      <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-3">
        Work Flow
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <InputSelect
          labelName="Approval Config"
          inputOptions={formateDataDropDown(
            "/loan/loan-approval/",
            loanApprovalDataInfo
          )}
          inputName="approvalsConfigurationsTempId"
          inputValue={productData?.approvalsConfigurationsTempId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="Loan Doc Config"
          inputOptions={formateDataDropDown(
            "/loan/document-config/",
            documentConfigDataInfo
          )}
          inputName="dynamicDocumentTempId"
          inputValue={productData?.dynamicDocumentTempId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="Refund Doc Config"
          inputOptions={formateDataDropDown(
            "/loan/document-config/",
            documentConfigDataInfo
          )}
          inputName="dynamicRefundDocTempId"
          inputValue={productData?.dynamicRefundDocTempId}
          onChange={handleChange}
          isValidation={true}
        />
      </div>
    </>
  );
};

export default ProductConfig;
