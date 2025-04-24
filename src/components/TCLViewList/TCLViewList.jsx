import React, { useEffect, useState } from "react";
import ListTable from "../Common/ListTable/ListTable";
import { useNavigate, useParams } from "react-router-dom";
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
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { AddIcon, DeleteIcon } from "../../assets/icons";

const TCLViewList = () => {
  const [fileSelectedOption, setFileSelectedOption] = useState(null);
  const [message, setMessage] = useState("");
  const { tclId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemName, data, tableData, loading } = useSelector(
    (state) => state.tcl
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const [TCLFile, setTCLFile] = useState("");

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
          icon: DeleteIcon,
          circle: true,
          action: handleDelete,
          type: "destructive",
        },
      ]
    : [];

  // Remove tclFileId from each item in tableData
  const tableDataWithoutId = tableData.map(({ tclFileId, ...rest }) => rest);
  // console.log(tableDataWithoutId);

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
        loading={loading}
        className={"grid md:grid-cols-[75%_25%] gap-y-4 items-center pb-5"}
        defaultClass={false}
      >
        <div className="grid grid-cols-[80%_20%] md:grid-cols-2 gap-x-5 w-full items-end">
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
              buttonIcon={AddIcon}
              onClick={addData}
              circle={true}
              buttonType="primary"
            />
          </div>
        </div>
        {!hasViewOnlyAccess(roleName) && (
          <div className="w-full">
            <InputFile
              // labelName="Upload TCL File"
              placeholder="We accept only excel files here."
              inputName={"TCLFile"}
              inputValue={TCLFile}
              onChange={(e) => handleFileChange(e, tclId)}
            />
            <a
              href={"/assets/files/sample_file_tcl_list.csv"}
              download="sample_file_tcl_list.csv"
              className="flex text-xs italic mt-1 gap-x-2 items-end justify-end text-violet-500 hover:text-violet-600 hover:underline"
            >
              <ArrowDownTrayIcon className="h-5 w-5" /> Sample File
            </a>
          </div>
        )}
      </ContainerTile>
      {/* Message */}
      {message && <div className="text-red-500">{message}</div>}

      {/* List */}
      {tableData.length > 0 && (
        <ListTable
          ListName={"TCL List"}
          ListHeader={TclViewListHeaderList}
          ListItem={tableDataWithoutId}
          ListAction={ActionList}
          loading={loading}
        />
      )}
    </div>
  );
};

export default TCLViewList;
