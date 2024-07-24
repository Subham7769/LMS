import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa";
import {
  PencilIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import DynamicName from "../Common/DynamicName/DynamicName";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputText from "../Common/InputText/InputText";
import { useNavigate, useParams } from "react-router-dom";
import { options } from "../../data/OptionsData";
import LoadingState from "../LoadingState/LoadingState";
import Button from "../Common/Button/Button";
import { Passed } from "../Toasts";
import CloneModal from "../Common/CloneModal/CloneModal";

const RecoveryConfig = () => {
  const { recoveryEquationTempId } = useParams();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    recoveryEquationId: "",
    recoveryEquationTempId: recoveryEquationTempId,
    tenure: "",
    tenureType: "",
    recoveryEquation: "",
  });
  const postURL =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-rule";
  const updateURL = `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-rule/${formData.recoveryEquationId}`;

  const [isEditingEquation, setIsEditingEquation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "recoveryEquation") {
      // Regex to match only the characters w, r, d, and other allowed characters
      const allowedCharactersRegex = /^[wrd\s0-9()+\-*/.><]*$/;
      if (!allowedCharactersRegex.test(value)) {
        toast.error(
          "Invalid character detected! Only 'w', 'r', 'd', numbers, and the following symbols are allowed: ' ', '(', ')', '+', '-', '*', '/'.,'<','>'"
        );
        return;
      }
    }

    // Update state
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNameUpdate = async (newName) => {
    const url = `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-temp/${recoveryEquationTempId}/name/${newName}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      } else if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Name Updated"}
            message={"The name was updated successfully"}
          />
        ));
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchName() {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-temp/id/" +
          recoveryEquationTempId,
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
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const retrievedname = await data.json();
      setItemName(retrievedname.name);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching name:", error);
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-rule/temp-id/" +
          recoveryEquationTempId,
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
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const response = await data.json();
      setData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching name:", error);
    }
  }

  useEffect(() => {
    fetchName();
    fetchData();
  }, [recoveryEquationTempId]);

  useEffect(() => {
    if (data.length > 0) {
      const assignedData = {
        recoveryEquationId: data[0].recoveryEquationId,
        recoveryEquationTempId: recoveryEquationTempId,
        tenure: data[0].tenure,
        tenureType: data[0].tenureType,
        recoveryEquation: data[0].recoveryEquation,
      };
      setFormData(assignedData);
      console.log(assignedData);
    }
  }, [data, recoveryEquationTempId]);

  const saveSettings = () => {
    toast.success("Equation modified!");
    toggleEditEquation();
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = fetch(data.length < 1 ? postURL : updateURL, {
        method: data.length < 1 ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      } else if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createClone = async (cloneName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-temp/" +
          recoveryEquationTempId +
          "/clone/" +
          cloneName,
        {
          method: "POST",
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
      const Details = await data.json();
      navigate("/recovery/" + Details.recoveryEquationTempId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSettings = async () => {
    try {
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-temp/${recoveryEquationTempId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      } else if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Item Deleted"}
            message={"Item was deleted successfully"}
          />
        ));
        navigate("/recovery");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleEditEquation = () => {
    setIsEditingEquation(!isEditingEquation);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-between mb-5">
        <DynamicName initialName={itemName} onSave={handleNameUpdate} />
        <div className="flex items-center gap-4">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button
            buttonIcon={TrashIcon}
            onClick={deleteSettings}
            circle={true}
            className={
              "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
            }
          />
        </div>
      </div>
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createClone}
        initialName={itemName}
      />
      <div className=" flex flex-col gap-4 rounded-lg border bg-white shadow-md border-red-600 p-6 ">
        <div className="flex gap-4 space-x-2 2xl:w-[50%] w-[75%]">
          <div className="flex-1">
            <InputNumber
              labelName={"Tenure"}
              inputName={"tenure"}
              inputValue={formData.tenure}
              onChange={handleChange}
              placeHolder={"24"}
            />
          </div>
          <div className="flex-1">
            <InputSelect
              labelName="Tenure Type"
              inputName="tenureType"
              inputValue={formData.tenureType}
              inputOptions={options}
              onChange={handleChange}
              placeHolder="Select Tenure Type"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="flex flex-col space-x-2 2xl:w-[50%] w-[75%]">
                {isEditingEquation && isEditingEquation ? (
                  <InputTextArea
                    labelName={"Recovery Equation"}
                    inputName={"recoveryEquation"}
                    rowCount={"3"}
                    inputValue={formData.recoveryEquation}
                    onChange={handleChange}
                    placeHolder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
                  />
                ) : (
                  <div className="flex items-center space-x-2 w-full">
                    <InputText
                      labelName={"Recovery Equation"}
                      inputName="recoveryEquation"
                      inputValue={formData.recoveryEquation}
                      onChange={handleChange}
                      placeHolder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
                      readOnly={true}
                    />
                  </div>
                )}
              </div>
              <div className="relative flex items-center justify-center gap-4 mt-4 group">
                <FaInfoCircle className="text-yellow-500 mt-2" size={24} />
                <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-2 whitespace-nowrap">
                  The Recovery Equation uses:
                  <ul className="list-disc ml-4">
                    <li>
                      <strong>w</strong>: Wallet
                    </li>
                    <li>
                      <strong>r</strong>: Repayment
                    </li>
                    <li>
                      <strong>d</strong>: Days Past Due
                    </li>
                  </ul>
                </div>

                {isEditingEquation ? (
                  <Button
                    buttonIcon={CheckCircleIcon}
                    onClick={saveSettings}
                    circle={true}
                  />
                ) : (
                  <Button
                    buttonIcon={PencilIcon}
                    onClick={toggleEditEquation}
                    circle={true}
                  />
                )}
              </div>
            </div>
            {isEditingEquation && (
              <p className="text-red-500">
                Clear the whole equation before you can assign a new equation
              </p>
            )}
          </div>
          <div className="text-right mt-5">
            <Button
              buttonIcon={CheckCircleIcon}
              buttonName={"Update"}
              onClick={postData}
              rectangle={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoveryConfig;
