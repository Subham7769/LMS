import React, { useEffect } from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Eligibility = () => {
  const { productData, handleChange } = useOutletContext();
  // Sidebar Redux Data
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
  const TCLDataInfo = useSelector(
    (state) =>
      state?.sidebar?.menus?.filter((item) => item.title === "TCL")[0]
        ?.submenuItems
  );

  // console.log(ProjectDataInfo);

  // Reusable function for formatting dropdown data
  function formateDataDropDown(replacerString, data) {
    const formattedData = data?.map(({ name, href }) => ({
      value: href.replace(replacerString, ""),
      label: name,
    }));

    // Append the "None" option to the formatted data
    if (replacerString == "/loan/tcl/")
      formattedData?.push({
        value: "null",
        label: "None",
      });

    return formattedData;
  }
  useEffect(() => {}, [DBRConfigInfo, TCLDataInfo]);

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Eligibility
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-end">
        <InputSelect
          labelName="TCL"
          inputOptions={formateDataDropDown("/loan/tcl/", TCLDataInfo)}
          inputName="tclFileId"
          inputValue={productData?.tclFileId}
          onChange={handleChange}
        />
        <InputSelect
          labelName="RAC"
          inputOptions={formateDataDropDown(
            "/loan/dynamic-rac/",
            DynamicRACDataInfo
          )}
          inputName="racId"
          inputValue={productData?.racId}
          onChange={handleChange}
          isValidation={true}
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
          labelName="Eligible Tenure"
          inputOptions={formateDataDropDown(
            "/loan/eligible-tenure/",
            CSETDataInfo
          )}
          inputName="creditScoreEtTempId"
          inputValue={productData?.creditScoreEtTempId}
          onChange={handleChange}
          isValidation={true}
        />
        <InputSelect
          labelName="DBR Config"
          inputOptions={formateDataDropDown("/loan/dbr-config/", DBRConfigInfo)}
          inputName="dbcTempId"
          inputValue={productData?.dbcTempId}
          onChange={handleChange}
          isValidation={true}
        />
      </div>
    </>
  );
};

export default Eligibility;
