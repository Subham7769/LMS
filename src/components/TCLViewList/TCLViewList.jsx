import React, { useEffect, useState } from "react";
import { TclViewListHeaderList } from "../../data/TclData";
import ListTable from "../Common/ListTable/ListTable";
import SelectAndAdd from "../Common/SelectAndAdd/SelectAndAdd";
import { useNavigate, useParams } from "react-router-dom";
import DynamicName from "../Common/DynamicName/DynamicName";
import { TrashIcon } from "@heroicons/react/20/solid";
import { convertDate } from "../../utils/convertDate";
import Button from "../Common/Button/Button";
import { fetchName, fetchData } from "../../redux/Slices/tclSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";

const TCLViewList = () => {
  const [fileSelectedOption, setFileSelectedOption] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState("");
  const { tclId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemName, data, loading, error } = useSelector((state) => state.tcl);

  const handleChange = (selectedOption) => {
    setFileSelectedOption(selectedOption);
    setMessage(""); // Reset message on selection change
  };

  const addData = async () => {
    if (!fileSelectedOption) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/tcl/files/by-id/" +
          fileSelectedOption.value,
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
      const TCLDetails = await data.json();

      // Transform the Product data to the desired format
      const formattedTCLInfoData = {
        name: TCLDetails.fileName,
        minTCL: TCLDetails.minTcl,
        avgTCL: TCLDetails.avgTcl,
        maxTCL: TCLDetails.maxTcl,
        totalUser: TCLDetails.totalUser,
        uploadedDate: convertDate(TCLDetails.createTime),
        totalRows: TCLDetails.totalRows,
      };

      // Directly check if the formatted data is already in the table
      const alreadyExists = tableData.some(
        (item) => item.name === formattedTCLInfoData.name
      );

      if (alreadyExists) {
        setMessage("The selected file is already added to the table.");
      } else {
        setTableData((prevData) => [formattedTCLInfoData, ...prevData]);
        setMessage(""); // Clear message if data is successfully added
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    dispatch(fetchName(tclId));
    dispatch(fetchData(tclId));
    setTableData([]);
    setFileSelectedOption(null);
  }, [dispatch, tclId]);

  const handleUpdateTCL = async (updateTCLName) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_TCL_NAME_UPDATE}${tclId}/name/${updateTCLName}`,
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
      const TCLDetails = await data.json();
      navigate("/tcl/" + TCLDetails.tclId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTCL = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_TCL_DELETE}${deleteURL}`,
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
      navigate("/tcl");
      // Refresh the page after navigation
      window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  return (
    <>
      {/* Select & Add to List */}
      <div className="flex justify-between items-center mb-3">
        <DynamicName initialName={itemName} onSave={handleUpdateTCL} />
        <Button
          buttonIcon={TrashIcon}
          onClick={() => handleDeleteTCL(tclId)}
          circle={true}
          className={
            "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
          }
        />
      </div>
      <SelectAndAdd
        ListName={"Select TCL List"}
        SelectOptions={data}
        SelectedOption={fileSelectedOption}
        HandleChange={handleChange}
        ButtonName={"Add to List"}
        onClick={addData}
      />

      {/* Message */}
      {message && <div className="mb-4 text-red-500">{message}</div>}

      {/* List */}
      <ListTable
        ListName={"TCL List"}
        ListHeader={TclViewListHeaderList}
        ListItem={tableData}
        HandleAction={handleDelete}
        Searchable={false}
      />
    </>
  );
};

export default TCLViewList;
