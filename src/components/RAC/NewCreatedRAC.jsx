import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RacMatrixConfig from "./RacMatrixConfig";
import { TrashIcon } from "@heroicons/react/20/solid";
import LoadingState from "../LoadingState/LoadingState";
import DynamicName from "../Common/DynamicName/DynamicName";
import Button from "../Common/Button/Button";
import CloneModal from "../Common/CloneModal/CloneModal";
import { fetchRACData } from "../../redux/Slices/sidebarSlice";
import { useDispatch } from "react-redux";

const NewCreatedRAC = () => {
  const [RACData, setRACData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { racID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac//${deleteURL}`,
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
      navigate("/rac");
      dispatch(fetchRACData());
      // Refresh the page after navigation
      // window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };
  const handleClone = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const createClone = async (cloneRACName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/" +
        racID +
        "/clone/" +
        cloneRACName,
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
      const racDetails = await data.json();
      console.log(racDetails);
      dispatch(fetchRACData());
      navigate("/newrac/" + racDetails.racId);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleNameUpdate = async (updateRACName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/" +
        racID +
        "/name/" +
        updateRACName,
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
      const racDetails = await data.json();
      console.log(racDetails);
      dispatch(fetchRACData());
      navigate("/newrac/" + racDetails.racId);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }; 
  
  useEffect(() => {
    async function getRACInfo() {
      try {
        const token = localStorage.getItem("authToken");
        const data = await fetch(
          "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/id/" +
          racID,
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
        const racDetails = await data.json();
        // console.log(racDetails);
        setRACData(racDetails);
        //   window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
    getRACInfo();
  }, [racID,handleNameUpdate]);
  if (RACData.length === 0) {
    return <LoadingState />;
  }
  return (
    <>
      <div className="flex justify-between items-baseline ">
        <DynamicName initialName={RACData.name} onSave={handleNameUpdate} />
        <div className="flex items-center justify-between gap-6">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button buttonIcon={TrashIcon} onClick={() => handleDelete(racID)} circle={true} />
        </div>
      </div>
      <div className="mt-4">
          <CloneModal isOpen={isModalOpen} onClose={closeModal} onCreateClone={createClone} initialName={RACData.name}/>
          <RacMatrixConfig />
      </div>
    </>
  );
};

export default NewCreatedRAC;
