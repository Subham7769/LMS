import React, { useEffect, useRef, useState } from "react";
import ListTable from "../Common/ListTable/ListTable";
import SelectAndAdd from "../Common/SelectAndAdd/SelectAndAdd";
import { useNavigate, useParams } from "react-router-dom";
import { TrashIcon, FolderPlusIcon } from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import {
  fetchName,
  fetchData,
  addTCLData,
  updateTCL,
  deleteTCL,
  clearTableData,
  restoreTableData,
  removeTableDataByIndex,
  deleteTCLFile,
  uploadTCLFile,
} from "../../redux/Slices/tclSlice";
import { useDispatch, useSelector } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import InputFile from "../Common/InputFile/InputFile";
import InputSelect from "../Common/InputSelect/InputSelect";
import { PlusIcon } from "@heroicons/react/24/outline";

const TCLViewList = () => {
  const [fileSelectedOption, setFileSelectedOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState("");
  const { tclId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { itemName, data, tableData, loading, error, tableDataHistory } =
    useSelector((state) => state.tcl);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const [TCLFile, setTCLFile] = useState("");

  const handleChange = (e) => {
    setFileSelectedOption(e.target);
    setMessage(""); // Reset message on selection change
  };

  console.log(fileSelectedOption);

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
      setMessage(err); // Display the error message from the server
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
        navigate(`/loan/tcl/${tclId}`);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  // Handle file input change
  const handleFileChange1 = (e) => {
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

  const handleFileChange = async (e, tclId) => {
    const fileUploadParams = {
      tclId: tclId,
    };
    setTCLFile(e.target.value);
    const { files } = e.target;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);
      await dispatch(uploadTCLFile({ formData, fileUploadParams })).unwrap();
    }
  };

  // console.log(tableDataHistory);

  useEffect(() => {
    if (tclId) {
      dispatch(fetchName(tclId));
      dispatch(fetchData(tclId));
      dispatch(restoreTableData({ tclId })); // Restore table data if available
      setFileSelectedOption(null);
      setMessage("");
    }

    // Clear table data when unmounting or tclId changes
    return () => {
      dispatch(clearTableData({ tclId }));
    };
  }, [dispatch, tclId]);

  const handleDeleteTCL = () => {
    dispatch(deleteTCL(tclId))
      .unwrap()
      .then(() => {
        navigate("/loan/tcl");
      })
      .catch((err) => console.error(err));
  };

  // actions to be executed in list
  const ActionList = !hasViewOnlyAccess(roleName)
    ? [
        {
          icon: TrashIcon,
          circle: true,
          action: handleDelete,
          type: "destructive",
        },
      ]
    : [];

  // Remove tclFileId from each item in tableData
  const tableDataWithoutId = tableData.map(({ tclFileId, ...rest }) => rest);
  // console.log(tableDataWithoutId);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const TclViewListHeaderList = !hasViewOnlyAccess(roleName)
    ? [
        "File Name",
        "Min TCL",
        "Avg TCL",
        "Max TCL",
        "Total User",
        "Uploaded Date",
        "Total Rows",
        "Actions",
      ] // Show "Actions" for non-viewers
    : [
        "File Name",
        "Min TCL",
        "Avg TCL",
        "Max TCL",
        "Total User",
        "Uploaded Date",
        "Total Rows",
      ];

  return (
    <div className="flex flex-col ">
      {/* Select & Add to List */}
      <DynamicHeader
        itemName={itemName}
        handleNameUpdate={handleUpdateTCL}
        handleDelete={() => handleDeleteTCL(tclId)}
        loading={loading}
      />
      <ContainerTile
        className={"flex items-center justify-between p-5"}
        loading={loading}
      >
        <div className="grid grid-cols-2 gap-x-5 w-1/2 items-end">
          <InputSelect
            labelName="Select TCL File"
            inputName="SelectedOption"
            inputOptions={data}
            inputValue={fileSelectedOption}
            onChange={(e) => {
              setFileSelectedOption(e.target.value);
              setMessage(""); // Reset message on selection change
            }}
          />
          <div>
            <Button
              buttonIcon={PlusIcon}
              onClick={addData}
              circle={true}
              buttonType="secondary"
            />
          </div>
        </div>
        {!hasViewOnlyAccess(roleName) ? (
          <div className="w-1/4">
            <InputFile
              labelName="Upload TCL File"
              placeholder="We accept only excel files here."
              inputName={"TCLFile"}
              inputValue={TCLFile}
              onChange={(e) => handleFileChange(e, tclId)}
            />
          </div>
        ) : (
          ""
        )}
      </ContainerTile>
      {/* Message */}
      {message && <div className="text-red-500">{message}</div>}

      {/* List */}
      <ListTable
        ListName={"TCL List"}
        ListHeader={TclViewListHeaderList}
        ListItem={tableDataWithoutId}
        ListAction={ActionList}
        loading={loading}
      />
    </div>
  );
};

export default TCLViewList;
