import React, { useEffect, useRef, useState } from "react";
import { TclViewListHeaderList } from "../../data/TclData";
import ListTable from "../Common/ListTable/ListTable";
import SelectAndAdd from "../Common/SelectAndAdd/SelectAndAdd";
import { useNavigate, useParams } from "react-router-dom";
import DynamicName from "../Common/DynamicName/DynamicName";
import { TrashIcon, FolderPlusIcon } from "@heroicons/react/20/solid";
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
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const TCLViewList = () => {
  const [fileSelectedOption, setFileSelectedOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState("");
  const { tclId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
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

  const handleDeleteTCL = () => {
    dispatch(deleteTCL(tclId))
      .unwrap()
      .then(() => {
        navigate("/tcl");
      })
      .catch((err) => console.error(err));
  };

  // actions to be executed in list
  const ActionList = [{
    icon: TrashIcon,
    circle: true,
    action: handleDelete,
  }]


  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  // Remove tclFileId from each item in tableData
  const tableDataWithoutId = tableData.map(({ tclFileId, ...rest }) => rest);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

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
      <ContainerTile className={'flex items-center justify-between'}>
        <SelectAndAdd
          ListName={"Select TCL List"}
          SelectOptions={data}
          SelectedOption={fileSelectedOption}
          HandleChange={handleChange}
          ButtonName={"Add to List"}
          onClick={addData}
        />
        <div className="w-3/4 flex justify-end items-center gap-5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }} // Hide the default input
          />
          <FolderPlusIcon className="h-12 w-12 text-indigo-600" onClick={handleFileClick} />
          <Button
            buttonName={"Upload"}
            onClick={handleFileUpload}
            rectangle={true}
          />
        </div>
      </ContainerTile>
      {/* Message */}
      {message && <div className="mb-4 text-red-500">{message}</div>}

      {/* List */}
      <ListTable
        ListName={"TCL List"}
        ListHeader={TclViewListHeaderList}
        ListItem={tableDataWithoutId}
        ListAction={ActionList}
      />
    </>
  );
};

export default TCLViewList;
