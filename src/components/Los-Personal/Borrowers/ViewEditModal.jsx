import React from "react";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { useDispatch } from "react-redux";
import { accountStatusOptionsPersonal } from "../../../data/LosData";
import {
  fetchAllBorrowersByType,
  changeBorrowerStatus,
  setUpdateBorrower,
} from "../../../redux/Slices/personalBorrowersSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../../Common/Modal/Modal";

const ViewEditModal = ({
  isOpen,
  onClose,
  rowData,
  currentStatus,
  setCurrentStatus,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleEdit = (uid) => {
    dispatch(setUpdateBorrower({ uid }));
    navigate(
      `/loan/loan-origination-system/personal/borrowers/update-borrower/${uid}`
    );
    // console.log(uid);
  };

  const handleChangeStatus = async (uid, newStatus) => {
    console.log(uid);
    setCurrentStatus(newStatus);
    await dispatch(changeBorrowerStatus({ uid, newStatus })).unwrap();
    dispatch(
      fetchAllBorrowersByType({
        page: 0,
        size: 10,
        borrowerType: "PERSONAL_BORROWER",
      })
    );
    navigate(`/loan/loan-origination-system/personal/borrowers/view-borrower`);
    onClose();
  };

  return (
    <>
      <Modal
        title={"Edit Borrower Details"}
        isFooter={false}
        secondaryOnClick={onClose}
      >
        <div className="flex justify-start gap-5 flex-col">
          <InputSelect
            labelName={"Account Status"}
            inputName={"accountStatus"}
            inputOptions={accountStatusOptionsPersonal}
            inputValue={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            disabled={false}
          />
          <Button
            buttonName={"Change Status"}
            onClick={() => handleChangeStatus(rowData.uid, currentStatus)}
            buttonType="tertiary"
          />
          {/* OR Separator with horizontal line */}
          <div className="relative flex items-center my-2">
            <hr className="w-full border-gray-300" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-gray-500 text-sm">
              OR
            </span>
          </div>
          <Button buttonName={"Edit"} onClick={() => handleEdit(rowData.uid)} />
        </div>
      </Modal>
    </>
  );
};

export default ViewEditModal;
