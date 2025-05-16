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
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import AddBankModal from "./AddBankModal";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import AddBankBranchModal from "./AddBankBranchModal";

const Banks = () => {
  const dispatch = useDispatch();
  const { allBanksData,bankOptions,bankBranchOptions,sortCodeBranchCodeOptions, loading, error } = useSelector(
    (state) => state.bank
  );
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

  console.log("bankOptions- ",bankOptions)
  // console.log("bankBranchOptions- ",bankBranchOptions)
  // console.log("sortCodeBranchCodeOptions- ",sortCodeBranchCodeOptions)

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    dispatch(setBankData({ name, value, section }));
  };

  const handleChangeBranch = (e, branchId, bankId) => {
    const { name, value } = e.target;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(handleChangeBankBranch({ name, value, branchId, bankId }));
    }
  };

  const handleUpdateBranch = async (branchId, bankId, branchIndex, bankIndex) => {
    await dispatch(validateForm(allBanksData[bankIndex]));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const updatedBankBranch = state.bank.allBanksData[bankIndex].bankBranchDetailsList[branchIndex];
      await dispatch(updateBankBranch({ updatedBankBranch, branchId, bankId })).unwrap();
      await dispatch(fetchAllBank()).unwrap();
    }
  };

  const handleDelete = async (branchId, bankId) => {
    await dispatch(deleteBankBranch({ branchId, bankId })).unwrap();
    await dispatch(fetchAllBank()).unwrap();
  };

  const handleDeleteBank = async (e, bankId) => {
    e.stopPropagation();
  
    const confirmDelete = window.confirm("Are you sure you want to delete this bank?");
    
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

  const handleAddBankBranch = (e,bankId) => {
    e.stopPropagation();
    setCurrentBankId(bankId)
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
      <ContainerTile loading={loading}>
        <h2 className="mb-6">
          <b className="text-xl font-semibold">Banks</b>
          <div className="text-gray-600 text-sm">
            Manage banks and their branches
          </div>
        </h2>
        <div className="flex flex-col gap-5">
          {/* Search Bar */}
          <div className="flex items-end justify-between">
            <div className="w-1/3">
              <InputText
                labelName="Search Bank"
                inputName="searchEmployer"
                inputValue={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeHolder="Search by bank name"
              />
            </div>
            {!hasViewOnlyAccess(roleName) ? (
              <div>
                <Button
                  buttonIcon={PlusIcon}
                  buttonName={"Add bank"}
                  onClick={handleAddBank}
                  rectangle={true}
                />
              </div>
            ) : null}
          </div>
          <div>
            {/* All Banks */}
            {filteredBanks.map((bankData, bankIndex) => (
              <>
                <Accordion
                  key={bankIndex}
                  heading={`${bankData.bankName}`}
                  headerAction={() => (
                    <div className="flex items-center gap-2">
                      <div
                        className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer flex items-center "
                        onClick={(e) => handleAddBankBranch(e,bankData.bankId)}>
                        <PlusIcon className="h-4 w-4" /> Add Branch
                      </div>
                      {!hasViewOnlyAccess(roleName) ? (
                        <div
                          title="Delete Bank"
                          className="text-sm text-red-500 hover:text-red-700 cursor-pointer flex items-center "
                          onClick={(e) => handleDeleteBank(e, bankData.bankId)}>
                          <TrashIcon className="h-4 w-4" />
                        </div>
                      ) : null}
                    </div>
                  )}
                  renderExpandedContent={() => (
                    <div className="shadow-md border border-border-gray-primary rounded-md text-center bg-white">
                      <div className="grid grid-cols-4 items-end mb-4 bg-background-light-secondary px-5">
                        <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Branch Name
                        </div>
                        <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Branch Code
                        </div>
                        <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sort Code
                        </div>
                        <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </div>
                      </div>
                      <div>
                        {bankData?.bankBranchDetailsList?.map((branch, branchIndex) => (
                          <div className="grid grid-cols-4 items-end mb-4 gap-5 px-5">
                            <InputText
                              inputName="branchName"
                              id={`branch_${branch.branchName}`}
                              inputValue={branch.branchName}
                              onChange={(e) => handleChangeBranch(e, branch.branchId, bankData.bankId)}
                              placeHolder="ABC"
                              isValidation={true}
                              isIndex={branchIndex}
                            />
                            <InputText
                              inputName="branchCode"
                              id={`branch_${branch.branchCode}`}
                              inputValue={branch.branchCode}
                              onChange={(e) => handleChangeBranch(e, branch.branchId, bankData.bankId)}
                              placeHolder="123456"
                              isValidation={true}
                              isIndex={branchIndex}
                            />
                            <InputText
                              inputName="sortCode"
                              id={`branch_${branch.sortCode}`}
                              inputValue={branch.sortCode}
                              onChange={(e) => handleChangeBranch(e, branch.branchId, bankData.bankId)}
                              placeHolder="00-00-00"
                              isValidation={true}
                              isIndex={branchIndex}
                            />

                            {!hasViewOnlyAccess(roleName) ? (
                              <div className="flex items-center justify-center gap-4">
                                <Button
                                  buttonIcon={CheckCircleIcon}
                                  onClick={() => handleUpdateBranch(branch.branchId, bankData.bankId, branchIndex, bankIndex)}
                                  circle={true}
                                  buttonType="secondary"
                                />
                                <Button
                                  buttonIcon={TrashIcon}
                                  onClick={() => handleDelete(branch.branchId, bankData.bankId, branchIndex, bankIndex)}
                                  circle={true}
                                  buttonType="destructive"
                                />
                              </div>
                            ) : (
                              "-"
                            )}
                          </div>

                        ))}
                      </div>
                    </div>
                  )}
                />
              </>
            ))}
          </div>
          <AddBankModal
            isOpen={showAddBankModal}
            onClose={closeAddBankModal}
          />
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
