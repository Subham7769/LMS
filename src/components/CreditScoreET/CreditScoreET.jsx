import InputSelect from "../Common/InputSelect/InputSelect";
import { operatorOptions } from "../../data/OptionsData";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import {
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { RowChanged, Warning } from "../Toasts";
import Button from "../Common/Button/Button";
import DynamicName from "../Common/DynamicName/DynamicName";
import CloneModal from "../Common/CloneModal/CloneModal";
import { fetchCreditScoreEligibleTenureData } from "../../redux/Slices/sidebarSlice";
import { useDispatch } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const CreditScoreET = () => {
  const { creditScoreETId } = useParams();
  const [loading, setLoading] = useState(false);
  const [tenure, setTenure] = useState("");
  const [creditScoreETName, setCreditScoreETName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    operators: {
      firstCreditScoreOperator: "",
      secondCreditScoreOperator: "",
    },
    rules: [
      {
        firstCreditScore: "",
        secondCreditScore: "",
        creditScoreEtTempId: creditScoreETId,
        ruleName: "0",
        fieldType: "Employer",
        tenure: [],
      },
    ],
  });

  async function getCreditScoreETInfo() {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_READ
        }${creditScoreETId}`,
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
      } else if (data.ok) {
        setLoading(false);
      }
      const creditScoreETDetails = await data.json();
      const updatedDetails = {
        operators: creditScoreETDetails.operators || {
          firstCreditScoreOperator: "",
          secondCreditScoreOperator: "",
        },
        rules: creditScoreETDetails.rules || [
          {
            firstCreditScore: "",
            secondCreditScore: "",
            creditScoreEtTempId: creditScoreETId,
            ruleName: "0",
            fieldType: "Employer",
            tenure: [],
          },
        ],
      };
      setFormData((prevState) => ({ ...prevState, ...updatedDetails }));
      // console.log(formData);
      //   window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async function getCreditScoreETName() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_NAME_READ
        }${creditScoreETId}`,
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
      const CreditScoreETDetails = await data.json();
      setCreditScoreETName(CreditScoreETDetails.name.replace(/-/g, " "));
      // console.log(CreditScoreEqData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCreditScoreETInfo();
    getCreditScoreETName();
  }, [creditScoreETId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const isOperator = prevState.operators.hasOwnProperty(name);
      const isRuleField = prevState.rules[0].hasOwnProperty(name);

      if (isOperator) {
        // Update an operator
        return {
          ...prevState,
          operators: {
            ...prevState.operators,
            [name]: value,
          },
        };
      } else if (isRuleField) {
        // Update a rule
        console.log(isRuleField);
        return {
          ...prevState,
          rules: [
            {
              ...prevState.rules[0],
              [name]: value,
            },
          ],
        };
      }
    });
  };

  const handleAddET = async () => {
    setFormData((prevFormData) => {
      // Copy the existing rules array
      const updatedRules = [...prevFormData.rules];

      // Append the new tenure value to the tenure array in rules[0]
      updatedRules[0].tenure = [...updatedRules[0].tenure, tenure];

      // Update the formData state with the new rules array
      return {
        ...prevFormData,
        rules: updatedRules,
      };
    });
    setTenure("");
  };

  const handleSaveET = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token
    try {
      // POST request to add new fields
      const postResponse = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_UPDATE}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
        getCreditScoreETInfo();
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleDelete = (index) => {
    const deleteList = [...formData.rules];
    deleteList[0].tenure.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      rules: deleteList,
    }));
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Not Yet Deleted!"}
        message={"Please click the save button to confirm removal of entry"}
      />
    ));
  };

  const handleTenureChange = (index, e) => {
    const updatedTenure = formData.rules[0].tenure.map((item, idx) => {
      if (index === idx) {
        return e.target.value; // Update the specific tenure value at the index
      }
      return item;
    });
    setFormData((prevState) => {
      const updatedRules = [...prevState.rules];
      updatedRules[0].tenure = updatedTenure; // Update the tenure array in rules[0]

      return {
        ...prevState,
        rules: updatedRules,
      };
    });
  };

  const handleUpdateCSET = async (updatecsetName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_NAME_UPDATE
        }${creditScoreETId}/name/${updatecsetName}`,
        {
          method: "PUT",
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
      const csetDetails = await data.json();
      console.log(csetDetails);
      navigate(
        "/credit-score-eligible-tenure/" + csetDetails.creditScoreEtTempId
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createCloneCSET = async (cloneCSETName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_CREATE_CLONE
        }${creditScoreETId}/clone/${cloneCSETName}`,
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
      const csetDetails = await data.json();
      console.log(csetDetails);
      dispatch(fetchCreditScoreEligibleTenureData())
      navigate(
        "/credit-score-eligible-tenure/" + csetDetails.creditScoreEtTempId
      );

      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCSET = async (creditScoreETId) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_DELETE
        }${creditScoreETId}`,
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
      }
      dispatch(fetchCreditScoreEligibleTenureData())
      navigate("/credit-score-eligible-tenure");
      // Refresh the page after navigation
      // window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };

  if (loading) {
    return <LoadingState />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4 flex items-center justify-between">
        <DynamicName
          initialName={creditScoreETName}
          onSave={handleUpdateCSET}
        />
        <div className="flex gap-4">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button
            buttonIcon={TrashIcon}
            onClick={() => handleDeleteCSET(creditScoreETId)}
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
        onCreateClone={createCloneCSET}
        initialName={creditScoreETName}
      />
      <ContainerTile>
        <div className="grid grid-cols-4 gap-2 mb-5">
          <InputSelect
            labelName={"Rule 1"}
            inputName={"firstCreditScoreOperator"}
            inputValue={formData?.operators?.firstCreditScoreOperator}
            inputOptions={operatorOptions}
            onChange={handleChange}
          />
          <InputSelect
            labelName={"Rule 2"}
            inputName={"secondCreditScoreOperator"}
            inputValue={formData?.operators?.secondCreditScoreOperator}
            inputOptions={operatorOptions}
            onChange={handleChange}
          />
          <InputNumber
            labelName="Minimum Credit Score"
            inputName={"firstCreditScore"}
            inputValue={formData?.rules[0]?.firstCreditScore}
            onChange={handleChange}
            placeHolder="0"
          />
          <InputNumber
            labelName="Maximum Credit Score"
            inputName={"secondCreditScore"}
            inputValue={formData?.rules[0]?.secondCreditScore}
            onChange={handleChange}
            placeHolder="2"
          />
        </div>
        <div className="flex items-end gap-5 border-b border-gray-300 pb-4 mb-4">
          <div>
            <InputNumber
              labelName={"Eligible Tenures"}
              inputName={"tenure"}
              inputValue={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeHolder={"3"}
            />
          </div>
          <div>
            <Button buttonIcon={PlusIcon} onClick={handleAddET} circle={true} />
          </div>
        </div>
        {formData?.rules[0]?.tenure.map((item, index) => (
          <div key={index} className="flex items-end gap-5 mb-3">
            <div>
              <InputNumber
                inputName={"tenure"}
                // inputId={item.ruleName}
                inputValue={item}
                onChange={(e) => {
                  handleTenureChange(index, e);
                }}
                placeHolder={"0.54"}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="block w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
        <div className="text-right">
          <button
            type="button"
            onClick={handleSaveET}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </div>
      </ContainerTile>
    </>
  );
};

export default CreditScoreET;
