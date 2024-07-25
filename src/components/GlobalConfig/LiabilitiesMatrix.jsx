import React, { useState, useEffect, useCallback } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import _ from "lodash";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import {
  productOptions,
  issuerOptions,
  gdbrWMortageOptions,
  gdbrWoMortageOptions,
  defaultScoreOptions,
} from "../../data/OptionsData";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";

const LiabilitiesMatrix = () => {
  const token = localStorage.getItem("authToken");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const [newForm, setNewForm] = useState({
    product: "",
    simahDescriptionCode: "",
    issuer: "",
    applicabilityGDBR: "",
    totalExposure: "",
    activeRule: "",
    defaultConsideredInSIMAHscore: "",
  });

  const handleNewInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setNewForm((prevState) => ({
        ...prevState,
        [name]: checked ? "YES" : "NO",
      }));
    } else {
      setNewForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleInputChange = async (e, index) => {
    const { name, value, checked, type } = e.target;

    // Clone the current data to update it
    const updatedItem = { ...allData[index] };

    // Store the old simahDescriptionCode
    const oldSimahDescriptionCode = updatedItem.simahDescriptionCode;

    // Update the specific field
    if (type === "checkbox") {
      updatedItem[name] = checked;
    } else {
      updatedItem[name] = value;
    }

    // Update the state with the modified data
    const updatedData = [...allData];
    updatedData[index] = updatedItem;
    setAllData(updatedData);

    // Prepare the data for PUT request
    const putData = {
      product: updatedItem.product,
      issuer: updatedItem.issuer,
      activeRule: updatedItem.activeRule === true ? "YES" : "NO",
      applicabilityGDBR: updatedItem.applicabilityGDBR,
      totalExposure: updatedItem.totalExposure,
      defaultConsideredInSIMAHscore: updatedItem.defaultConsideredInSIMAHscore,
      simahDescriptionCode:
        name === "simahDescriptionCode"
          ? oldSimahDescriptionCode
          : updatedItem.simahDescriptionCode,
      newSimahDescriptionCode:
        name === "simahDescriptionCode"
          ? updatedItem.simahDescriptionCode
          : updatedItem.simahDescriptionCode,
    };

    // Send the PUT request
    try {
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/simah-liabilities/${oldSimahDescriptionCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(putData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Updated Successfully"}
            message={"The item has been updated successfully"}
          />
        ));
        fetchData();
      }

      const responseData = await response.json();
      console.log("PUT request successful:", responseData);
    } catch (error) {
      console.error("Error with PUT request:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/simah-liabilities",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const json = await data.json();
      setAllData(json);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    const token = localStorage.getItem("authToken");
    const postData = {
      product: newForm.product,
      simahDescriptionCode: newForm.simahDescriptionCode,
      issuer: newForm.issuer,
      applicabilityGDBR: newForm.applicabilityGDBR,
      totalExposure: newForm.totalExposure,
      defaultConsideredInSIMAHscore: newForm.defaultConsideredInSIMAHscore,
      activeRule: newForm.activeRule === "" ? "NO" : "YES",
    };

    try {
      const postResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/simah-liabilities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Added Successfully"}
            message={"The item has been added successfully"}
          />
        ));
        setNewForm({
          product: "",
          simahDescriptionCode: "",
          issuer: "",
          applicabilityGDBR: "",
          totalExposure: "",
          activeRule: "",
          defaultConsideredInSIMAHscore: "",
        });
        fetchData();
      }
    } catch (error) {
      console.error("Failed to add data:", error);
    }
  };

  async function handleDeleteRow(deleteURL) {
    try {
      const token = localStorage.getItem("authToken");
      const deleteResponse = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/simah-liabilities/${deleteURL}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the item");
      } else if (deleteResponse.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Delete Successful"}
            message={"The items has been deleted successfully"}
          />
        ));
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-6">
        <b
          title="Credit Bureau Liabilities Matrix"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Credit Bureau Liabilities Matrix
        </b>
      </h2>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600 relative">
        <div className="flex flex-col gap-y-6 mt-6 border-b border-gray-300 pb-6">
          <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-8 items-center">
            <InputSelect
              labelName="Product"
              inputOptions={productOptions}
              inputName="product"
              inputValue={newForm.product}
              onChange={handleNewInputChange}
            />
            <InputText
              labelName="CB Description (CODE)"
              inputName="simahDescriptionCode"
              placeHolder="TMTG"
              inputValue={newForm.simahDescriptionCode}
              onChange={handleNewInputChange}
            />

            <InputSelect
              labelName="Issuer"
              inputOptions={issuerOptions}
              inputName="issuer"
              inputValue={newForm.issuer}
              onChange={handleNewInputChange}
            />

            <div className="mt-2">
              <InputCheckbox
                labelName="Active Rule"
                inputName="activeRule"
                inputChecked={newForm.activeRule}
                onChange={handleNewInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8 items-end">
            <InputSelect
              labelName="GDBR (Without Mortgage)"
              inputOptions={gdbrWoMortageOptions}
              inputName="applicabilityGDBR"
              inputValue={newForm.applicabilityGDBR}
              onChange={handleNewInputChange}
            />

            <InputSelect
              labelName="GDBR (including Mortgage)"
              inputOptions={gdbrWMortageOptions}
              inputName="totalExposure"
              inputValue={newForm.totalExposure}
              onChange={handleNewInputChange}
            />

            <InputSelect
              labelName="Default considered in CB score"
              inputOptions={defaultScoreOptions}
              inputName="defaultConsideredInSIMAHscore"
              inputValue={newForm.defaultConsideredInSIMAHscore}
              onChange={handleNewInputChange}
            />

            <Button buttonIcon={PlusIcon} onClick={handleAdd} circle={true} />
          </div>
        </div>
        {allData.length > 0 ? (
          allData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-6 mt-6 border-b border-gray-300 pb-6"
            >
              <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-8 items-end">
                <InputSelect
                  labelName="Product"
                  inputOptions={productOptions}
                  inputName="product"
                  inputValue={item.product}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <InputText
                  labelName="CB Description (CODE)"
                  inputName="simahDescriptionCode"
                  inputValue={item.simahDescriptionCode}
                  placeHolder="TMTG"
                  onChange={(e) => handleInputChange(e, index)}
                />
                <InputSelect
                  labelName="Issuer"
                  inputOptions={issuerOptions}
                  inputName="issuer"
                  inputValue={item.issuer}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <div className="mb-2">
                  <InputCheckbox
                    labelName="Active Rule"
                    inputName="activeRule"
                    inputChecked={item.activeRule}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-8 items-end">
                <InputSelect
                  labelName="GDBR (Without Mortgage)"
                  inputOptions={gdbrWoMortageOptions}
                  inputName="applicabilityGDBR"
                  inputValue={item.applicabilityGDBR}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <InputSelect
                  labelName="GDBR (including Mortgage)"
                  inputOptions={gdbrWMortageOptions}
                  inputName="totalExposure"
                  inputValue={item.totalExposure}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <InputSelect
                  labelName="Default considered in CB score"
                  inputOptions={defaultScoreOptions}
                  inputName="defaultConsideredInSIMAHscore"
                  inputValue={item.defaultConsideredInSIMAHscore}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <Button
                  buttonIcon={TrashIcon}
                  onClick={() => handleDeleteRow(item.simahDescriptionCode)}
                  circle={true}
                  className={
                    "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No data available</p>
        )}
        <div className="absolute bottom-1 left-2 text-xs text-gray-500">
          *CB - Credit Bureau
        </div>
      </div>
    </>
  );
};

export default LiabilitiesMatrix;
