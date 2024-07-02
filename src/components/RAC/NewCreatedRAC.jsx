import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RacMatrixConfig from "./RacMatrixConfig";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import LoadingState from "../LoadingState";
const NewCreatedRAC = () => {
  const [RACData, setRACData] = useState([]);
  const [cloneRAC, setCloneRAC] = useState(false);
  const [updateRACFlag, setUpdateRACFlag] = useState(false);
  const [cloneRACName, setCloneRACName] = useState("");
  const [updateRACName, setUpdateRACName] = useState("");
  const { racID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getRACInfo();
  }, [racID]);

  async function getRACInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/rac/id/" +
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
  if (RACData.length === 0) {
    return <LoadingState />;
  }
  const handleDelete = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/rac//${deleteURL}`,
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
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/rac/" +
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
  const handleUpdateRACName = () => {
    setUpdateRACFlag(true);
  };
  const handleUpdateRAC = async (updateRACName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/rac/" +
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
  return (
    <div className="mt-4">
      <div className="flex justify-between items-baseline">
        <div className="flex mb-5 items-baseline gap-5">
          <h2 className="">
            Name: <b>{RACData.name}</b>
          </h2>
          <button
            onClick={handleUpdateRACName}
            type="button"
            title="Update RAC Name"
            className="w-8 h-8 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <PencilIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="text-right mt-5">
            <button
              type="button"
              onClick={handleClone}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Clone
            </button>
          </div>
        </div>
        <button
          onClick={() => handleDelete(racID)}
          type="button"
          className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="">
        {cloneRAC ? (
          <>
            <div>Create Clone RAC</div>
            <div className="my-5">
              <input
                type="text"
                name="racName"
                id="racName"
                value={cloneRACName}
                onChange={(e) => {
                  setCloneRACName(e.target.value);
                }}
                className="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Clonned RAC Name"
              />
            </div>
            <div>
              <button
                onClick={() => createCloneRac(cloneRACName)}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Clone
              </button>
            </div>
          </>
        ) : updateRACFlag ? (
          <>
            <div>Update RAC Name</div>
            <div className="my-5">
              <input
                type="text"
                name="racName"
                id="racName"
                value={updateRACName}
                onChange={(e) => {
                  setUpdateRACName(e.target.value);
                }}
                className="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Updated RAC Name"
              />
            </div>
            <div>
              <button
                onClick={() => handleUpdateRAC(updateRACName)}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </>
        ) : (
          <RacMatrixConfig />
        )}
      </div>
    </div>
  );
};

export default NewCreatedRAC;
