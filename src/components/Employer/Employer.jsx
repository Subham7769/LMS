import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import InputSelect from "../Common/InputSelect/InputSelect";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
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
import { hasViewOnlyAccessGroup2 } from "../../utils/roleUtils";
import { fetchAffordibilityData } from "../../redux/Slices/sidebarSlice";

const Employer = () => {
  const dispatch = useDispatch();
  const { employerData, allEmployerData, loading, error } = useSelector(
    (state) => state.employer
  );
  const { userData } = useSelector((state) => state.auth);
  const { menus } = useSelector((state) => state.sidebar);
  const roleName = userData?.roles[0]?.name;
  const [affordabilityOptions, setAffordabilityOptions] = useState([]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEmployerData({ name, value }));
  };

  const handleAddFields = async () => {
    await dispatch(validateForm(employerData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(addEmployerData(employerData)).unwrap();
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    dispatch(handleChangeEmployerData({ id, name, value }));
  };

  const handleSave = async (id, index) => {
    await dispatch(validateForm(allEmployerData[index]));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const updatePayload = allEmployerData[index];
      dispatch(updateEmployerData({ updatePayload, id }));
    }
  };

  const handleDelete = async (id) => {
    dispatch(deleteEmployerData(id));
  };

  return (
    <>
      <h2 className="mb-6">
        <b
          title="Employer"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Employer
        </b>
      </h2>
      <div className="flex flex-col gap-5">
        {!hasViewOnlyAccessGroup2(roleName) ? (
          <ContainerTile
            loading={loading}
            // error={error}
          >
            <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end ">
              <InputText
                labelName="Employer Name"
                inputName="employerName"
                inputValue={employerData?.employerName}
                onChange={handleInputChange}
                placeHolder="Infosys"
                isValidation={true}
              />
              <InputSelect
                labelName="Affordability Criteria"
                inputOptions={affordabilityOptions}
                inputName="affordabilityCriteriaTempId"
                inputValue={employerData?.affordabilityCriteriaTempId}
                onChange={handleInputChange}
                isValidation={true}
              />
              <Button
                buttonIcon={PlusIcon}
                onClick={handleAddFields}
                circle={true}
              />
            </div>
          </ContainerTile>
        ) : (
          ""
        )}
        {allEmployerData?.map((empData, index) => (
          <ContainerTile
            loading={loading}
            error={error}
            key={"Employer" + index}
          >
            <div
              key={empData.employerId}
              className="grid grid-cols-[repeat(4,_minmax(0,_1fr))_120px] gap-4 items-end "
            >
              <InputText
                labelName="Employer Name"
                inputName="employerName"
                id={`employer_${empData?.employerId}`}
                inputValue={empData?.employerName}
                onChange={(e) => handleChange(e, empData?.employerId)}
                placeHolder="Infosys"
                isValidation={true}
                isIndex={empData.dataIndex}
              />
              <InputSelect
                labelName="Affordability Criteria"
                inputOptions={affordabilityOptions}
                id={`affordability_${empData?.employerId}`}
                inputName="affordabilityCriteriaTempId"
                inputValue={empData?.affordabilityCriteriaTempId}
                onChange={(e) => handleChange(e, empData?.employerId)}
              />
              {!hasViewOnlyAccessGroup2(roleName) ? (
                <div className="flex items-center gap-4">
                  <Button
                    buttonIcon={CheckCircleIcon}
                    onClick={() => handleSave(empData?.employerId, index)}
                    circle={true}
                  />
                  <Button
                    buttonIcon={TrashIcon}
                    onClick={() => handleDelete(empData?.employerId, index)}
                    circle={true}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </ContainerTile>
        ))}
      </div>
    </>
  );
};

export default Employer;
