import React, { useEffect, useState } from "react";
import { TclViewListHeaderList } from "../../data/TclData";
import ListTable from "../Common/ListTable/ListTable";
import SelectAndAdd from "../Common/SelectAndAdd/SelectAndAdd";
import { useNavigate, useParams } from "react-router-dom";
import DynamicName from "../Common/DynamicName/DynamicName";
import { TrashIcon } from "@heroicons/react/20/solid";
import { convertDate } from "../../utils/convertDate";
import Button from "../Common/Button/Button";
import {
  fetchName,
  fetchData,
  addTCLData,
  updateTCL,
  deleteTCL,
  clearTableData,
  removeTableDataByIndex,
  deleteTCLFile,
  uploadTCLFile,
} from "../../redux/Slices/tclSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";

const TCLViewList = () => {
  const [fileSelectedOption, setFileSelectedOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState("");
  const { tclId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemName, data, tableData, loading, error } = useSelector(
    (state) => state.tcl
  );

  const handleChange = (selectedOption) => {
    setFileSelectedOption(selectedOption);
    setMessage(""); // Reset message on selection change
  };

  const handleDelete = async (index) => {
    const tclFileId = tableData[index].tclFileId;
    try {
      await dispatch(deleteTCLFile({ tclFileId })).unwrap();
      dispatch(removeTableDataByIndex(index));
      dispatch(fetchData(tclId));
      setFileSelectedOption(null);
      // dispatch(removeTCLById(tclFileId)); // Remove from tableData
    } catch (err) {
      console.error("Failed to delete:", err);
      setMessage("Failed to delete item. Please try again.");
    }
  };

  const addData = () => {
    if (!fileSelectedOption) {
      setMessage("Please select a file first.");
      return;
    }
    dispatch(addTCLData(fileSelectedOption))
      .unwrap()
      .then(() => setMessage(""))
      .catch((err) => setMessage(err));
  };

  const handleUpdateTCL = (updateTCLName) => {
    dispatch(updateTCL({ tclId, updateTCLName }))
      .unwrap()
      .then(() => {
        navigate(`/tcl/${tclId}`);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteTCL = () => {
    dispatch(deleteTCL(tclId))
      .unwrap()
      .then(() => {
        navigate("/tcl");
      })
      .catch((err) => console.error(err));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setMessage("Please choose a file to upload.");
      return;
    }

    dispatch(uploadTCLFile({ tclId, selectedFile }))
      .unwrap()
      .then((successMessage) => {
        setMessage(successMessage);
        setSelectedFile(null); // Clear the file input
      })
      .catch((errorMessage) => {
        setMessage(errorMessage);
      });
  };

  useEffect(() => {
    dispatch(fetchName(tclId));
    dispatch(fetchData(tclId));
    dispatch(clearTableData());
    setFileSelectedOption(null);
  }, [dispatch, tclId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  // Remove tclFileId from each item in tableData
  const tableDataWithoutId = tableData.map(({ tclFileId, ...rest }) => rest);

  return (
    <>
      {/* Select & Add to List */}
      <div className="flex justify-between items-center mb-3">
        <DynamicName initialName={itemName} onSave={handleUpdateTCL} />
        <Button
          buttonIcon={TrashIcon}
          onClick={() => handleDeleteTCL(tclId)}
          circle={true}
        />
      </div>
      <div className="mb-4 bg-gray-100 p-5 py-10 rounded-xl shadow-md border-gray-300 border">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div>
            <Button
              buttonName={"Upload"}
              onClick={handleFileUpload}
              rectangle={true}
            />
          </div>
        </div>
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
        ListItem={tableDataWithoutId}
        HandleAction={handleDelete}
        Searchable={false}
      />
    </>
  );
};

export default TCLViewList;
