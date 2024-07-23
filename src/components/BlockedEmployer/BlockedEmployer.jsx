import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import DynamicName from "../Common/DynamicName/DynamicName";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import CloneModal from "../Common/CloneModal/CloneModal";

const BlockedEmployer = () => {
  const [itemName, setItemName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { blockEmployersTempId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    blockEmployersTempId: blockEmployersTempId,
    name: "",
    cloneBEName: "",
    fieldType: "Employer",
    result: 1,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  async function fetchData() {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/block-employers-rule/" +
        blockEmployersTempId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let responseData = await response.json();
      if (response.ok) {
        setData(responseData);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteItem(name, ruleName) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/${blockEmployersTempId}/${ruleName}/block-employers-rule/${name}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Item Deleted"}
            message={"Item has been deleted successfully"}
          />
        ));
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchName() {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/id/" +
        blockEmployersTempId,
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

  async function updateName(newName) {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/${blockEmployersTempId}/name/${newName}`,
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
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      } else if (data.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Update Successful"}
            message={"The name was updated successfully"}
          />
        ));
        window.location.reload();
      }
    } catch (error) {
      console.error("Error Updating Name:", error);
    }
  }

  const deleteBE = async () => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/${blockEmployersTempId}`,
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
        navigate("/blocked-employer");
        // Refresh the page after navigation
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function postItem(e) {
    e.preventDefault();
    // setLoading(true)
    const payload = {
      blockEmployerName: formData.name,
      blockEmployersTempId: formData.blockEmployersTempId,
      fieldType: formData.fieldType,
      result: formData.result,
      ruleName: data && data[0] && data[0].ruleName ? data[0].ruleName : "0",
    };
    try {
      if (formData.name === "") {
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Adding Failed"}
            message={"Cannot post empty data"}
          />
        ));
        return;
      }
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/block-employers-rule`,
        {
          method: data.length === 0 ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ blockEmployersRules: [payload] }),
        }
      );
      if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Item Added"}
            message={"Item was added successfully"}
          />
        ));
        fetchData();
        setFormData({
          blockEmployersTempId: blockEmployersTempId,
          name: "",
          cloneBEName: "",
          fieldType: "Employer",
          result: 1,
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const createCloneBE = async (cloneBEName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/" +
        blockEmployersTempId +
        "/clone/" +
        cloneBEName,
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
      const beDetails = await data.json();
      console.log(beDetails);
      navigate("/blocked-employer/" + beDetails.blockEmployerTempId);
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

  useEffect(() => {
    fetchData();
    fetchName();
  }, [blockEmployersTempId]);

  if (loading) {
    return <LoadingState />;
  }
  console.log("test");
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4 flex items-center justify-between">
        <DynamicName initialName={itemName} onSave={updateName} />
        <div className="flex gap-4">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button buttonIcon={TrashIcon} onClick={() => deleteBE()} circle={true} className={"bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"}/>
        </div>
      </div>
        <CloneModal isOpen={isModalOpen} onClose={closeModal} onCreateClone={createCloneBE} initialName={itemName}/>
        <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
          <div className="flex items-center justify-between "></div>
          <div className="flex items-center gap-5 border-b border-gray-300 pb-5">
            <div className="relative w-1/4">
              <InputText
                labelName="Add Blocked Employer"
                inputName="name"
                inputValue={formData.name}
                onChange={handleChange}
                placeHolder="Blocked Employer"
              />
            </div>
            <Button buttonIcon={PlusIcon} onClick={postItem} circle={true}/> 
          </div>
          {data.map((item, index) => {
            return item.blockEmployersName.map((name, i) => (
              <div key={`${index}-${i}`} className="flex gap-5 items-end mt-5">
                <div className="relative w-1/4">
                  <InputText inputValue={name} disabled={true} />
                </div>
                <Button buttonIcon={TrashIcon} onClick={() => deleteItem(name, item.ruleName)} circle={true} className={"bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"}/>
              </div>
            ));
          })}
        </div>
    </>
  );
};

export default BlockedEmployer;
