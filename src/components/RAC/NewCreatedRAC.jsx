import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RacMatrixConfig from "./RacMatrixConfig";
import { TrashIcon } from "@heroicons/react/20/solid";
import LoadingState from "../LoadingState";
import DynamicName from "../Common/DynamicName/DynamicName";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";

const NewCreatedRAC = () => {
  const [RACData, setRACData] = useState([]);
  const [cloneRAC, setCloneRAC] = useState(false);
  const [cloneRACName, setCloneRACName] = useState("");
  const { racID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function getRACInfo() {
      try {
        const token = localStorage.getItem("authToken");
        const data = await fetch(
          "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/id/" +
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
  }, [racID]);

  const handleDelete = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac//${deleteURL}`,
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
      // Refresh the page after navigation
      window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };
  const handleClone = () => {
    setCloneRAC(true);
  };
  const createCloneRac = async (cloneRACName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/" +
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
      navigate("/newrac/" + racDetails.racId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateRAC = async (updateRACName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/" +
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
      navigate("/newrac/" + racDetails.racId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  if (RACData.length === 0) {
    return <LoadingState />;
  }
  return (
    <>
      <div className="flex justify-between items-baseline ">
        <DynamicName initialName={RACData.name} onSave={handleUpdateRAC} />
        <div className="flex items-center justify-between gap-6">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button buttonIcon={TrashIcon} onClick={() => handleDelete(racID)} circle={true} className={"bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"} />
        </div>
      </div>
      <div className="mt-4">
        {cloneRAC ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <InputText
              labelName={"Create Clone RAC"}
              inputName={"racName"}
              inputValue={cloneRACName}
              onChange={(e) => {
                setCloneRACName(e.target.value);
              }}
              placeHolder={"Enter Clone RAC Name"}
            />
            <div className="flex justify-center items-end">
              <Button buttonName={"Create Clone"} onClick={() => createCloneRac(cloneRACName)} rectangle={true} />
            </div>
          </div>
        ) : (
          <RacMatrixConfig />
        )}
      </div>
    </>
  );
};

export default NewCreatedRAC;
