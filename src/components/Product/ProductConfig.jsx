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
  const RACDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "RAC")[0]
        ?.submenuItems
  );
  const DynamicRACDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter(
        (item) => item.title === "Decision Engine"
      )[0]?.submenuItems
  );

  const DBRConfigInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "DBR Config")[0]
        ?.submenuItems
  );
  const RPDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Rule Policy")[0]
        ?.submenuItems
  );
  const CSDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Credit Score")[0]
        ?.submenuItems
  );
  const CSETDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter(
        (item) => item.title === "Eligible Tenure"
      )[0]?.submenuItems
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
  const TCLDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "TCL")[0]
        ?.submenuItems
  );
  const RecoveryDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "Recovery")[0]
        ?.submenuItems
  );
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.auth);
  const roleName = userData?.roles[0]?.name;

  // console.log(ProjectDataInfo);

  // Reusable function for formatting dropdown data
  function formateDataDropDown(replacerString, data) {
    const formattedData = data?.map(({ name, href }) => ({
      value: href.replace(replacerString, ""),
      label: name,
    }));

    // Append the "None" option to the formatted data
    if (
      replacerString == "/loan/tcl/" ||
      replacerString == "/loan/recovery/" ||
      replacerString == "/loan/blocked-employer/" ||
      replacerString == "/loan/rule-policy/"
    )
      formattedData?.push({
        value: "null",
        label: "None",
      });

    return formattedData;
  }
  useEffect(() => {}, [
    DBRConfigInfo,
    ProjectDataInfo,
    RPDataInfo,
    TCLDataInfo,
    RecoveryDataInfo,
  ]);

  const SectionCard = ({ title, children }) => (
    <div className="mb-6">
      <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-3">
        {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">{children}</div>
    </div>
  );
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Basic Information">
        <InputSelect
          labelName="Eligible Customer Type"
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
          labelName="TCL"
          inputOptions={formateDataDropDown("/loan/tcl/", TCLDataInfo)}
          inputName="tclFileId"
          inputValue={productData?.tclFileId}
          onChange={handleChange}
          // isValidation={true}
          // isClearable={true}
        />
      </SectionCard>

      <SectionCard title="Eligibility & Configuration">
        <InputSelect
          labelName="RAC"
          inputOptions={formateDataDropDown(
            "/loan/dynamic-rac/",
            RACDataInfo ? RACDataInfo : DynamicRACDataInfo
          )}
          inputName="racId"
          inputValue={productData?.racId}
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
        <InputSelect
          labelName="Credit Score"
          inputOptions={formateDataDropDown("/loan/credit-score/", CSDataInfo)}
          inputName="creditScoreEqTempId"
          inputValue={productData?.creditScoreEqTempId}
          onChange={handleChange}
          isValidation={true}
        />
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
          labelName="Document Config"
          inputOptions={formateDataDropDown(
            "/loan/document-config/",
            documentConfigDataInfo
          )}
          inputName="dynamicDocumentTempId"
          inputValue={productData?.dynamicDocumentTempId}
          onChange={handleChange}
          isValidation={true}
        />
      </SectionCard>

      <SectionCard title="Loan Parameters">
        <InputSelect
          labelName="DBR Config"
          inputOptions={formateDataDropDown("/loan/dbr-config/", DBRConfigInfo)}
          inputName="dbcTempId"
          inputValue={productData?.dbcTempId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="Eligible Tenure"
          inputOptions={formateDataDropDown(
            "/loan/credit-score-eligible-tenure/",
            CSETDataInfo
          )}
          inputName="creditScoreEtTempId"
          inputValue={productData?.creditScoreEtTempId}
          onChange={handleChange}
          isValidation={true}
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
      </SectionCard>
    </div>
  );
};

export default ProductConfig;
