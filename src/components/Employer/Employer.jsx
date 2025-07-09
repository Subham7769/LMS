import React, { useEffect, useState } from "react";
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
import ListTableClassic from "../Common/ListTable/ListTableClassic";
import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "../../assets/icons";
import EditEmployerModal from "./EditEmployerModal";

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
        dispatch(handleChangeEmployerData({ id, name: "ministries", value: e }));
      } else {
        const { name, value } = e.target;
        dispatch(handleChangeEmployerData({ id, name, value }));
      }
    }
  };

  const handleSave = async (id, index) => {
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

  let ListHeader = [
    { name: "Employer Name", sortKey: null },
    { name: "Affordability Criteria", sortKey: null },
    { name: "Day of Month", sortKey: null },
    { name: "Which Month ?", sortKey: null },
    { name: "Creation Date", sortKey: null },
  ];

  // Conditionally add the "Actions" column if roleName has view only access
  if (!hasViewOnlyAccess(roleName)) {
    ListHeader.push({ name: "Actions", sortKey: null });
  }

  return (
    <>
      <ContainerTile loading={loading} className={"px-5 pt-5 pb-1"}>
        <div className="block md:flex justify-between items-center">
          <h2 className="mb-6">
            <b className="text-xl font-semibold">Employer</b>
            <div className="text-gray-600 text-sm">
              Manage employers and their affordability criteria
            </div>
          </h2>
          {!hasViewOnlyAccess(roleName) && (
            <div className="text-right">
              <Button
                buttonIcon={AddIcon}
                buttonName={"Add Employer"}
                onClick={handleAddEmployer}
                buttonType="primary"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          {/* Search Bar */}
          <div className="flex flex-col gap-5">
            <div className="">
              <InputText
                labelName="Search Employer"
                inputName="searchEmployer"
                inputValue={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeHolder="Search by employer name"
              />
            </div>
          </div>
          <ListTableClassic
            ListName="List of Employers"
            ListNameLength={filteredEmployers?.length}
            ListHeader={ListHeader}
          >
            {filteredEmployers?.map((empData, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap min-w-40">
                  <InputText
                    inputName="employerName"
                    id={`employer_${empData?.employerId}`}
                    inputValue={empData?.employerName}
                    onChange={(e) => handleChange(e, empData?.employerId)}
                    placeHolder="Infosys"
                    isValidation={true}
                    isIndex={empData.dataIndex}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap min-w-72">
                  <InputSelect
                    inputOptions={affordabilityOptions}
                    id={`affordability_${empData?.employerId}`}
                    inputName="affordabilityCriteriaTempId"
                    inputValue={empData?.affordabilityCriteriaTempId}
                    onChange={(e) => handleChange(e, empData?.employerId)}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap min-w-36">
                  <InputSelect
                    inputOptions={daysOfMonth}
                    id={`firstEmiDay_${empData?.employerId}`}
                    inputName="firstEmiDay"
                    inputValue={empData?.firstEmiDay}
                    onChange={(e) => handleChange(e, empData?.employerId)}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap min-w-48">
                  <InputSelect
                    inputOptions={upcomingMonths}
                    id={`moratoriumMonths_${empData?.employerId}`}
                    inputName="moratoriumMonths"
                    inputValue={empData?.moratoriumMonths}
                    onChange={(e) => handleChange(e, empData?.employerId)}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-gray-600">
                    {convertDate(empData?.creationDate)}
                  </div>
                </td>
                {!hasViewOnlyAccess(roleName) && (
                  <td className="px-4 py-4 whitespace-nowrap flex gap-2">
                    <Button
                      buttonIcon={EditIcon}
                      onClick={() => handleEditEmployer(index)}
                      buttonType="secondary"
                    />
                    <Button
                      buttonIcon={CheckIcon}
                      onClick={() => handleSave(empData?.employerId, index)}
                      buttonType="success"
                    />
                    <Button
                      buttonIcon={DeleteIcon}
                      onClick={() => handleDelete(empData?.employerId)}
                      buttonType="destructive"
                    />
                  </td>
                )}
              </tr>
            ))}
          </ListTableClassic>

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
