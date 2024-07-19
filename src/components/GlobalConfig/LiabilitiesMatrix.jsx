import React, { useState, useEffect, useCallback } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import _ from "lodash";
import useGlobalConfig from "../../utils/useGlobalConfig";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState";

const productOptions = [
  { value: "Consumer", label: "Consumer" },
  { value: "Non-Consumer", label: "Non-Consumer" },
];

const issuerOptions = [
  { value: "Bank", label: "Bank" },
  { value: "Other", label: "Other" },
  { value: "Bank,Other", label: "Bank, Other" },
];

const gdbrWoMortageOptions = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "N/A" },
  { value: "BANK", label: "Yes if issuer is bank" },
];
const gdbrWMortageOptions = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "N/A" },
];
const defaultScoreOptions = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "N/A" },
];

const LiabilitiesMatrix = () => {
  const [LiabilitiesMatrixDataNew, setLiabilitiesMatrixDataNew] = useState([]);
  const [localData, setLocalData] = useState({});
  const [simahCode, setSimahCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState("");
  const [selectedGDBRwoMortage, setSelectedGDBRwoMortage] = useState("");
  const [selectedGDBRwMortage, setSelectedGDBRwMortage] = useState("");
  const [selectedDefaultScore, setSelectedDefaultScore] = useState("");
  const [activeRule, setActiveRule] = useState(null);

  const url = "simah-liabilities";
  const LiabilitiesMatrixData = useGlobalConfig(url);

  useEffect(() => {
    if (LiabilitiesMatrixData.length > 0) {
      setLiabilitiesMatrixDataNew(LiabilitiesMatrixData);
    }
  }, [LiabilitiesMatrixData]);

  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken");
    const postData = {
      product: selectedProduct.value,
      simahDescriptionCode: simahCode,
      issuer: selectedIssuer.value,
      applicabilityGDBR: selectedGDBRwoMortage.value,
      totalExposure: selectedGDBRwMortage.value,
      defaultConsideredInSIMAHscore: selectedDefaultScore.value,
      activeRule: activeRule,
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
      }

      const getResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/simah-liabilities",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error(`HTTP error! Status: ${getResponse.status}`);
      }

      const updatedData = await getResponse.json();
      setLiabilitiesMatrixDataNew(updatedData);
      setSimahCode("");
      setSelectedProduct("");
      setSelectedIssuer("");
      setSelectedGDBRwoMortage("");
      setSelectedGDBRwMortage("");
      setSelectedDefaultScore("");
      setActiveRule(null);
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleChange = async (name, value, simahDescriptionCode) => {
    console.log("Field Changed:", name, "New Value:", value);
    const token = localStorage.getItem("authToken");
    const currentItem = (
      LiabilitiesMatrixDataNew.length === 0
        ? LiabilitiesMatrixData
        : LiabilitiesMatrixDataNew
    ).find((item) => item.simahDescriptionCode === simahDescriptionCode);

    if (!currentItem) {
      console.error("Item not found!");
      return;
    }

    const updatedData = {
      ...currentItem,
      newSimahDescriptionCode: value,
    };

    try {
      const putResponse = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/lmscarbon/api/v1/configs/simah-liabilities/${simahDescriptionCode}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!putResponse.ok) {
        throw new Error(`HTTP error! Status: ${putResponse.status}`);
      } else if (putResponse.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Edit Successful"}
            message={"The item has been updated successfully"}
          />
        ));
      }

      const getResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/simah-liabilities",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error(`HTTP error! Status: ${getResponse.status}`);
      }

      const updatedList = await getResponse.json();
      console.log("Fetched Updated List:", updatedList);
      setLiabilitiesMatrixDataNew(updatedList);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const debouncedHandleChange = useCallback(
    _.debounce((name, value, simahDescriptionCode) => {
      handleChange(name, value, simahDescriptionCode);
    }, 200),
    [LiabilitiesMatrixDataNew]
  );

  const addTags = (e, simahDescriptionCode) => {
    if (e.keyCode === 13) {
      debouncedHandleChange(
        e.target.name,
        e.target.value,
        simahDescriptionCode
      );
    }
  };
  const handleInputChange = (e, simahDescriptionCode) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [simahDescriptionCode]: {
        ...prev[simahDescriptionCode],
        [name]: value,
      },
    }));
    // debouncedHandleChange(name, value, simahDescriptionCode);
  };

  const handleDDChange = async (
    propName,
    selectedOption,
    simahDescriptionCode
  ) => {
    const token = localStorage.getItem("authToken");
    const currentItem = (
      LiabilitiesMatrixDataNew.length === 0
        ? LiabilitiesMatrixData
        : LiabilitiesMatrixDataNew
    ).find((item) => item.simahDescriptionCode === simahDescriptionCode);

    if (!currentItem) {
      console.error("Item not found!");
      return;
    }
    console.log(currentItem);
    const updatedData = {
      ...currentItem,
      [propName]: selectedOption.value,
      newSimahDescriptionCode: simahDescriptionCode,
    };

    try {
      const putResponse = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/lmscarbon/api/v1/configs/simah-liabilities/${simahDescriptionCode}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!putResponse.ok) {
        throw new Error(`HTTP error! Status: ${putResponse.status}`);
      } else if (putResponse.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Edit Successful"}
            message={"The item has been updated successfully"}
          />
        ));
      }

      const getResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/simah-liabilities",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error(`HTTP error! Status: ${getResponse.status}`);
      }

      const updatedList = await getResponse.json();
      setLiabilitiesMatrixDataNew(updatedList);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleCheckbox = async (e, simahDescriptionCode) => {
    const token = localStorage.getItem("authToken");
    const currentItem = (
      LiabilitiesMatrixDataNew.length === 0
        ? LiabilitiesMatrixData
        : LiabilitiesMatrixDataNew
    ).find((item) => item.simahDescriptionCode === simahDescriptionCode);

    if (!currentItem) {
      console.error("Item not found!");
      return;
    }

    const updatedData = {
      ...currentItem,
      newSimahDescriptionCode: simahDescriptionCode,
      activeRule: e.target.checked ? "YES" : "NO",
    };

    try {
      const putResponse = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/lmscarbon/api/v1/configs/simah-liabilities/${simahDescriptionCode}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!putResponse.ok) {
        throw new Error(`HTTP error! Status: ${putResponse.status}`);
      } else if (putResponse.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Edit Successful"}
            message={"The item has been updated successfully"}
          />
        ));
      }

      const getResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/simah-liabilities",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error(`HTTP error! Status: ${getResponse.status}`);
      }

      const updatedList = await getResponse.json();
      console.log("Fetched Updated List:", updatedList);
      setLiabilitiesMatrixDataNew(updatedList);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  async function handleDeleteRow(deleteURL) {
    try {
      const token = localStorage.getItem("authToken");
      const deleteResponse = await fetch(
        `https://lmscarbon.com/xc-tm-customer-care/lmscarbon/api/v1/configs/simah-liabilities/${deleteURL}`,
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

      const getResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/simah-liabilities",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error("Failed to fetch updated data");
      }

      const updatedData = await getResponse.json();
      setLiabilitiesMatrixDataNew(updatedData);
    } catch (error) {
      console.error(error);
    }
  }
  const handleBlur = (e, simahDescriptionCode) => {
    debouncedHandleChange(e.target.name, e.target.value, simahDescriptionCode);
  };

  if (LiabilitiesMatrixData === 0) {
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
        <div className="flex items-center justify-between ">
          <button
            onClick={handleAddFields}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-col gap-y-6 mt-6 border-b border-gray-300 pb-6">
          <div className="flex gap-8 items-end">
            <div className="relative ">
              <label
                htmlFor="product"
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Product
              </label>
              <Select
                className="w-64"
                options={productOptions}
                id="product"
                name="product"
                value={selectedProduct}
                onChange={(selectedOption) =>
                  setSelectedProduct(selectedOption)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="simahCode"
                className=" bg-white px-1 text-xs text-gray-900"
              >
                CB Description (CODE)
              </label>
              <input
                type="text"
                name="simahCode"
                id="simahCode"
                value={simahCode}
                onChange={(e) => setSimahCode(e.target.value)}
                className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="TMTG"
              />
            </div>
            <div className="relative ">
              <label
                htmlFor="issuer"
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Issuer
              </label>
              <Select
                className="w-64"
                options={issuerOptions}
                id="issuer"
                name="issuer"
                value={selectedIssuer}
                onChange={(selectedOption) => setSelectedIssuer(selectedOption)}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="activeRule"
                className=" text-gray-900 block text-xs mx-auto w-16 mb-2"
              >
                Active Rule
              </label>
              <div className="flex h-6 justify-center">
                <input
                  id="activeRule"
                  checked={activeRule === "YES"}
                  value={activeRule}
                  name="activeRule"
                  type="checkbox"
                  onChange={(e) =>
                    setActiveRule(e.target.checked ? "YES" : null)
                  }
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-8 items-end">
            <div className="relative">
              <label
                htmlFor="gdbrWoMortage"
                className=" bg-white px-1 text-xs text-gray-900"
              >
                GDBR (Without Mortgage)
              </label>
              <Select
                className="w-64"
                options={gdbrWoMortageOptions}
                id="gdbrWoMortage"
                name="gdbrWoMortage"
                value={selectedGDBRwoMortage}
                onChange={(selectedOption) =>
                  setSelectedGDBRwoMortage(selectedOption)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="gdbrWMortage"
                className=" bg-white px-1 text-xs text-gray-900"
              >
                GDBR (including Mortgage)
              </label>
              <Select
                className="w-64"
                options={gdbrWMortageOptions}
                id="gdbrWMortage"
                name="gdbrWMortage"
                value={selectedGDBRwMortage}
                onChange={(selectedOption) =>
                  setSelectedGDBRwMortage(selectedOption)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="defaultScore"
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Default considered in CB score
              </label>
              <Select
                className="w-64"
                options={defaultScoreOptions}
                id="defaultScore"
                name="defaultScore"
                value={selectedDefaultScore}
                onChange={(selectedOption) =>
                  setSelectedDefaultScore(selectedOption)
                }
                isSearchable={false}
              />
            </div>
          </div>
        </div>
        {(LiabilitiesMatrixDataNew.length === 0
          ? LiabilitiesMatrixData
          : LiabilitiesMatrixDataNew
        ).map((lmdata, index) => (
          <div
            key={index}
            className="flex flex-col gap-y-6 mt-6 border-b border-gray-300 pb-6"
          >
            <div className="flex gap-8 items-end">
              <div className="relative ">
                <label
                  htmlFor="product"
                  className=" bg-white px-1 text-xs text-gray-900"
                >
                  Product
                </label>
                <Select
                  className="w-64"
                  options={productOptions}
                  name="product"
                  value={productOptions.find(
                    (option) => option.value === lmdata.product
                  )}
                  onChange={(selectedOption) =>
                    handleDDChange(
                      "product",
                      selectedOption,
                      lmdata.simahDescriptionCode
                    )
                  }
                  isSearchable={false}
                  isDisabled
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="simahDescriptionCode"
                  className=" bg-white px-1 text-xs text-gray-900"
                >
                  CB Description (CODE)
                </label>
                <input
                  type="text"
                  name="simahDescriptionCode"
                  value={
                    localData[lmdata.simahDescriptionCode]
                      ?.simahDescriptionCode || lmdata.simahDescriptionCode
                  }
                  onChange={(e) =>
                    handleInputChange(e, lmdata.simahDescriptionCode)
                  }
                  onKeyDown={(e) => addTags(e, lmdata.simahDescriptionCode)}
                  onBlur={(e) => handleBlur(e, lmdata.simahDescriptionCode)}
                  className="block w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="TMTG"
                />
              </div>
              <div className="relative ">
                <label
                  htmlFor="issuer"
                  className=" bg-white px-1 text-xs text-gray-900"
                >
                  Issuer
                </label>
                <Select
                  className="w-64"
                  options={issuerOptions}
                  name="issuer"
                  value={issuerOptions.find(
                    (option) => option.value === lmdata.issuer
                  )}
                  onChange={(selectedOption) =>
                    handleDDChange(
                      "issuer",
                      selectedOption,
                      lmdata.simahDescriptionCode
                    )
                  }
                  isSearchable={false}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="activeRule"
                  className=" text-gray-900 block text-xs mx-auto w-16 mb-2"
                >
                  Active Rule
                </label>
                <div className="flex h-6 justify-center">
                  <input
                    id="activeRule"
                    value={lmdata.activeRule}
                    checked={lmdata.activeRule === "YES"}
                    name="activeRule"
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckbox(e, lmdata.simahDescriptionCode)
                    }
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
              </div>
              <button
                onClick={() => handleDeleteRow(lmdata.simahDescriptionCode)}
                type="button"
                className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex gap-8 items-end">
              <div className="relative">
                <label
                  htmlFor="applicabilityGDBR"
                  className=" bg-white px-1 text-xs text-gray-900"
                >
                  GDBR (Without Mortgage)
                </label>
                <Select
                  className="w-64"
                  options={gdbrWoMortageOptions}
                  name="applicabilityGDBR"
                  value={gdbrWoMortageOptions.find(
                    (option) => option.value === lmdata.applicabilityGDBR
                  )}
                  onChange={(selectedOption) =>
                    handleDDChange(
                      "applicabilityGDBR",
                      selectedOption,
                      lmdata.simahDescriptionCode
                    )
                  }
                  isSearchable={false}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="totalExposure"
                  className=" bg-white px-1 text-xs text-gray-900"
                >
                  GDBR (including Mortgage)
                </label>
                <Select
                  className="w-64"
                  options={gdbrWMortageOptions}
                  name="totalExposure"
                  value={gdbrWMortageOptions.find(
                    (option) => option.value === lmdata.totalExposure
                  )}
                  onChange={(selectedOption) =>
                    handleDDChange(
                      "totalExposure",
                      selectedOption,
                      lmdata.simahDescriptionCode
                    )
                  }
                  isSearchable={false}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="defaultConsideredInSIMAHscore"
                  className=" bg-white px-1 text-xs text-gray-900"
                >
                  Default considered in CB score
                </label>
                <Select
                  className="w-64"
                  options={defaultScoreOptions}
                  name="defaultConsideredInSIMAHscore"
                  value={defaultScoreOptions.find(
                    (option) =>
                      option.value === lmdata.defaultConsideredInSIMAHscore
                  )}
                  onChange={(selectedOption) =>
                    handleDDChange(
                      "defaultConsideredInSIMAHscore",
                      selectedOption,
                      lmdata.simahDescriptionCode
                    )
                  }
                  isSearchable={false}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="text-right mt-5">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </div>
        <div className="absolute bottom-1 left-2 text-xs text-gray-500">
          *CB - Credit Bureau
        </div>
      </div>
    </>
  );
};

export default LiabilitiesMatrix;
