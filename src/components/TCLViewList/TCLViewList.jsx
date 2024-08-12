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
} from "../../redux/Slices/tclSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";

const TCLViewList = () => {
  const [fileSelectedOption, setFileSelectedOption] = useState(null);
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

  const handleDelete = (index) => {
    dispatch(removeTableDataByIndex(index));
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
