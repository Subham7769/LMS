import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import Accordion from "../Common/Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import {
  setBankData,
  handleChangeBankBranch,
  fetchAllBank,
  deleteBank,
  updateBankBranch,
  deleteBankBranch,
} from "../../redux/Slices/bankSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { hasViewOnlyAccessGroup4 } from "../../utils/roleUtils";
import AddBankModal from "./AddBankModal";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import AddBankBranchModal from "./AddBankBranchModal";
import { AddIcon, CheckIcon, DeleteIcon } from "../../assets/icons";

const Banks = () => {
  const dispatch = useDispatch();
  const {
    allBanksData,
    bankOptions,
    bankBranchOptions,
    sortCodeBranchCodeOptions,
    loading,
    error,
  } = useSelector((state) => state.bank);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showAddBankBranchModal, setShowAddBankBranchModal] = useState(false);
  const [currentBankId, setCurrentBankId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllBank());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  console.log("bankOptions- ", bankOptions);
  // console.log("bankBranchOptions- ",bankBranchOptions)
  // console.log("sortCodeBranchCodeOptions- ",sortCodeBranchCodeOptions)

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    dispatch(setBankData({ name, value, section }));
  };

  const handleChangeBranch = (e, branchId, bankId) => {
    const { name, value } = e.target;
    if (!hasViewOnlyAccessGroup4(roleName)) {
      dispatch(handleChangeBankBranch({ name, value, branchId, bankId }));
    }
  };

  const handleUpdateBranch = async (
    branchId,
    bankId,
    branchIndex,
    bankIndex
  ) => {
    await dispatch(validateForm(allBanksData[bankIndex]));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const updatedBankBranch =
        state.bank.allBanksData[bankIndex].bankBranchDetailsList[branchIndex];
      await dispatch(
        updateBankBranch({ updatedBankBranch, branchId, bankId })
      ).unwrap();
      await dispatch(fetchAllBank()).unwrap();
    }
  };

  const handleDelete = async (branchId, bankId) => {
    await dispatch(deleteBankBranch({ branchId, bankId })).unwrap();
    await dispatch(fetchAllBank()).unwrap();
  };

  const handleDeleteBank = async (e, bankId) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bank?"
    );

    if (confirmDelete) {
      await dispatch(deleteBank({ bankId })).unwrap();
    }
  };

  const handleAddBank = () => {
    setShowAddBankModal(true);
  };

  const closeAddBankModal = () => {
    setShowAddBankModal(false);
  };

  const handleAddBankBranch = (e, bankId) => {
    e.stopPropagation();
    setCurrentBankId(bankId);
    setShowAddBankBranchModal(true);
  };

  const closeAddBankBranchModal = () => {
    setShowAddBankBranchModal(false);
  };

  // **Filter banks based on search term**
  const filteredBanks = allBanksData?.filter((bank) =>
    bank?.bankName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ContainerTile className={"p-5"} loading={loading}>
        <div className="block md:flex justify-between items-center">
          <h2 className="mb-6">
            <b className="text-xl font-semibold">Employer</b>
            <div className="text-gray-600 text-sm">
              Manage employers and their affordability criteria
            </div>
          </h2>
          {!hasViewOnlyAccessGroup4(roleName) && (
            <div className="text-right">
              <Button
                buttonIcon={AddIcon}
                buttonName={"Add bank"}
                onClick={handleAddBank}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          {/* Search Bar */}
          <div className="flex flex-col gap-5">
            <InputText
              labelName="Search Bank"
              inputName="searchEmployer"
              inputValue={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeHolder="Search by bank name"
              disabled={false}
            />
          </div>
          <div>
            {/* All Banks */}
            {filteredBanks.map((bankData, bankIndex) => (
              <>
                <Accordion
                  key={bankIndex}
                  heading={`${bankData.bankName}`}
                  headerAction={() => (
                    <div className="flex items-center gap-4">
                      <Button
                        buttonIcon={PlusIcon}
                        buttonName="Add Branch"
                        onClick={(e) => handleAddBankBranch(e, bankData.bankId)}
                        buttonType="tertiary"
                      />
                      {!hasViewOnlyAccessGroup4(roleName) ? (
                        <Button
                          buttonIcon={DeleteIcon}
                          title="Delete Bank"
                          onClick={(e) => handleDeleteBank(e, bankData.bankId)}
                          buttonType="destructive"
                        />
                      ) : null}
                    </div>
                  )}
                  renderExpandedContent={() => (
                    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md border dark:border-gray-700 rounded-xl ">
                      <div className="min-w-[600px] grid grid-cols-4 items-end mb-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
                        <div className="p-4">Branch Name</div>
                        <div className="p-4">Branch Code</div>
                        <div className="p-4">Sort Code</div>
                        <div className="p-4">Actions</div>
                      </div>
                      {bankData?.bankBranchDetailsList?.map(
                        (branch, branchIndex) => (
                          <div className="min-w-[600px] grid grid-cols-4 items-end mb-4 gap-5 px-5">
                            <InputText
                              inputName="branchName"
                              id={`branch_${branch.branchName}`}
                              inputValue={branch.branchName}
                              onChange={(e) =>
                                handleChangeBranch(
                                  e,
                                  branch.branchId,
                                  bankData.bankId
                                )
                              }
                              placeHolder="ABC"
                              isValidation={true}
                              isIndex={branchIndex}
                              disabled={false}
                            />
                            <InputText
                              inputName="branchCode"
                              id={`branch_${branch.branchCode}`}
                              inputValue={branch.branchCode}
                              onChange={(e) =>
                                handleChangeBranch(
                                  e,
                                  branch.branchId,
                                  bankData.bankId
                                )
                              }
                              placeHolder="123456"
                              isValidation={true}
                              isIndex={branchIndex}
                              disabled={false}
                            />
                            <InputText
                              inputName="sortCode"
                              id={`branch_${branch.sortCode}`}
                              inputValue={branch.sortCode}
                              onChange={(e) =>
                                handleChangeBranch(
                                  e,
                                  branch.branchId,
                                  bankData.bankId
                                )
                              }
                              placeHolder="00-00-00"
                              isValidation={true}
                              isIndex={branchIndex}
                              disabled={false}
                            />

                            {!hasViewOnlyAccessGroup4(roleName) ? (
                              <div className="flex items-center gap-4">
                                <Button
                                  buttonIcon={CheckIcon}
                                  onClick={() =>
                                    handleUpdateBranch(
                                      branch.branchId,
                                      bankData.bankId,
                                      branchIndex,
                                      bankIndex
                                    )
                                  }
                                  buttonType="success"
                                />
                                <Button
                                  buttonIcon={DeleteIcon}
                                  onClick={() =>
                                    handleDelete(
                                      branch.branchId,
                                      bankData.bankId,
                                      branchIndex,
                                      bankIndex
                                    )
                                  }
                                  buttonType="destructive"
                                />
                              </div>
                            ) : (
                              "-"
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                />
              </>
            ))}
          </div>
          <AddBankModal isOpen={showAddBankModal} onClose={closeAddBankModal} />
          <AddBankBranchModal
            currentBankId={currentBankId}
            isOpen={showAddBankBranchModal}
            onClose={closeAddBankBranchModal}
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default Banks;
