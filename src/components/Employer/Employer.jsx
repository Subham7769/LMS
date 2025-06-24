import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import InputSelect from "../Common/InputSelect/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployerData,
  handleChangeEmployerData,
  fetchEmployerData,
  addEmployerData,
  updateEmployerData,
  deleteEmployerData,
} from "../../redux/Slices/employerSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { fetchAffordibilityData } from "../../redux/Slices/sidebarSlice";
import { convertDate } from "../../utils/convertDate";
import AddEmployerModal from "./AddEmployerModal";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { daysOfMonth, upcomingMonths } from "../../data/OptionsData";
import EditEmployerModal from "./EditEmployerModal";
import { PencilIcon } from "@heroicons/react/24/outline";

const Employer = () => {
  const dispatch = useDispatch();
  const { employerData, allEmployerData, loading, error } = useSelector(
    (state) => state.employer
  );
  const { userData } = useSelector((state) => state.auth);
  const { menus } = useSelector((state) => state.sidebar);
  const roleName = userData?.roles[0]?.name;
  const [affordabilityOptions, setAffordabilityOptions] = useState([]);
  const [employerOptions, setEmployerOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [showEditEmployerModal, setShowEditEmployerModal] = useState(false);
  const [editEmployerIndex, setEditEmployerIndex] = useState("");

  useEffect(() => {
    dispatch(fetchEmployerData());
    dispatch(fetchAffordibilityData());

    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  useEffect(() => {
    const options =
      menus
        .find((menu) => menu.title === "Affordability")
        ?.submenuItems?.map((submenuItem) => ({
          label: submenuItem.name,
          value: submenuItem.href.split("/").pop(), // Extracting last part of href
        })) || [];
    setAffordabilityOptions(options);
  }, [menus]);

  useEffect(() => {
    if (allEmployerData?.length) {
      const options = allEmployerData.map(({ employerId, employerName }) => ({
        value: employerName,
        label: employerName,
      }));
      setEmployerOptions(options);
    }
  }, [allEmployerData]);

  const handleInputChange = (e) => {
    if (Array.isArray(e)) {
      dispatch(setEmployerData({ name: "ministries", value: e }));
    } else {
      const { name, value } = e.target;
      dispatch(setEmployerData({ name, value }));
    }
  };

  const handleAddFields = async () => {
    await dispatch(validateForm(employerData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(addEmployerData(employerData)).unwrap();
    }
    setShowEmployerModal(false);
  };

  const handleChange = (e, id) => {
    if (!hasViewOnlyAccess(roleName)) {
      if (Array.isArray(e)) {
        dispatch(
          handleChangeEmployerData({ id, name: "ministries", value: e })
        );
      } else {
        const { name, value } = e.target;
        dispatch(handleChangeEmployerData({ id, name, value }));
      }
    }
  };

  const handleSave = async (id, index) => {
    console.log(allEmployerData[index]);
    await dispatch(validateForm(allEmployerData[index]));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const updatePayload = allEmployerData[index];
      dispatch(updateEmployerData({ updatePayload, id }));
    }
    setShowEditEmployerModal(false);
  };

  const handleDelete = async (id) => {
    dispatch(deleteEmployerData(id));
  };

  const handleAddEmployer = () => {
    setShowEmployerModal(true);
  };

  const closeEmployerModal = () => {
    setShowEmployerModal(false);
  };

  const handleEditEmployer = (index) => {
    setShowEditEmployerModal(true);
    setEditEmployerIndex(index);
  };

  const closeEditEmployerModal = () => {
    setShowEditEmployerModal(false);
  };

  // **Filter employers based on search term**
  const filteredEmployers = allEmployerData?.filter((emp) =>
    emp?.employerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ContainerTile loading={loading}>
        <h2 className="mb-6">
          <b className="text-xl font-semibold">Employer</b>
          <div className="text-gray-600 text-sm">
            Manage employers and their affordability criteria
          </div>
        </h2>
        <div className="flex flex-col gap-5">
          {/* Search Bar */}
          <div className="flex items-end justify-between">
            <div className="w-1/3">
              <InputText
                labelName="Search Employer"
                inputName="searchEmployer"
                inputValue={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeHolder="Search by employer name"
              />
            </div>
            {!hasViewOnlyAccess(roleName) ? (
              <div>
                <Button
                  buttonIcon={PlusIcon}
                  buttonName={"Add Employer"}
                  onClick={handleAddEmployer}
                  rectangle={true}
                />
              </div>
            ) : null}
          </div>

          {/* Employer Data Table */}
          <div className="shadow-md border border-border-gray-primary rounded-md text-center bg-white">
            <div className="grid grid-cols-6 items-end mb-4 bg-background-light-secondary px-5">
              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employer Name
              </div>
              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Affordability Criteria
              </div>

              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Day of Month
              </div>
              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Which Month ?
              </div>
              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Creation Date
              </div>
              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </div>
            </div>
            {filteredEmployers?.map((empData, index) => (
              <div
                key={empData.employerId}
                className={`grid grid-cols-6 gap-4 items-center pb-3 px-5 mb-3 
                ${
                  index !== filteredEmployers.length - 1
                    ? "border-b border-border-gray-primary"
                    : ""
                }`}
              >
                <InputText
                  inputName="employerName"
                  id={`employer_${empData?.employerId}`}
                  inputValue={empData?.employerName}
                  onChange={(e) => handleChange(e, empData?.employerId)}
                  placeHolder="Infosys"
                  isValidation={true}
                  isIndex={empData.dataIndex}
                />
                <InputSelect
                  inputOptions={affordabilityOptions}
                  id={`affordability_${empData?.employerId}`}
                  inputName="affordabilityCriteriaTempId"
                  inputValue={empData?.affordabilityCriteriaTempId}
                  onChange={(e) => handleChange(e, empData?.employerId)}
                />

                <InputSelect
                  inputOptions={daysOfMonth}
                  id={`firstEmiDay_${empData?.employerId}`}
                  inputName="firstEmiDay"
                  inputValue={empData?.firstEmiDay}
                  onChange={(e) => handleChange(e, empData?.employerId)}
                />
                <InputSelect
                  inputOptions={upcomingMonths}
                  id={`moratoriumMonths_${empData?.employerId}`}
                  inputName="moratoriumMonths"
                  inputValue={empData?.moratoriumMonths}
                  onChange={(e) => handleChange(e, empData?.employerId)}
                />
                <div className="text-gray-600">
                  {convertDate(empData?.creationDate)}
                </div>
                {!hasViewOnlyAccess(roleName) ? (
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      buttonIcon={PencilIcon}
                      onClick={() => handleEditEmployer(index)}
                      circle={true}
                      buttonType="secondary"
                    />
                    <Button
                      buttonIcon={CheckCircleIcon}
                      onClick={() => handleSave(empData?.employerId, index)}
                      circle={true}
                      buttonType="secondary"
                    />
                    <Button
                      buttonIcon={TrashIcon}
                      onClick={() => handleDelete(empData?.employerId)}
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

          <AddEmployerModal
            isOpen={showEmployerModal}
            onClose={closeEmployerModal}
            employerData={employerData}
            handleInputChange={handleInputChange}
            handleAddFields={handleAddFields}
            affordabilityOptions={affordabilityOptions}
            employerOptions={employerOptions}
            setEmployerOptions={setEmployerOptions}
          />
          <EditEmployerModal
            isOpen={showEditEmployerModal}
            onClose={closeEditEmployerModal}
            index={editEmployerIndex}
            affordabilityOptions={affordabilityOptions}
            handleChange={handleChange}
            handleSave={handleSave}
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default Employer;
