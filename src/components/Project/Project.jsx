import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { fetchProjectData } from "../../redux/Slices/sidebarSlice";
import {
  fetchData,
  setProjectData,
  handleChangeInProjectData,
  updateProject,
  deleteProject,
} from "../../redux/Slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import { toast } from "react-toastify";
import ProjectInputFields from "./ProjectInputFields";
import { hasViewOnlyAccess } from "../../utils/roleUtils";

const Project = () => {
  const [clientIdsString, setClientIdsString] = useState("");
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectData, loading, error } = useSelector((state) => state.project);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchData(projectId));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, projectId]);

  useEffect(() => {
    if (projectData.clientIds.length > 0) {
      setClientIdsString(projectData.clientIds[0]);
    }
  }, [projectData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target; // Extracting only the name and value properties
    dispatch(handleChangeInProjectData({ name, value, checked, type })); // Passing only the serializable data
  };

  const updateName = (name) => {
    dispatch(setProjectData({ name: "name", value: name }));
    // dispatch(fetchProjectData());
  };

  const handleUpdate = async () => {
    await dispatch(validateForm(projectData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      await dispatch(updateProject({ projectData, projectId, clientIdsString })).unwrap();
      dispatch(fetchProjectData());
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("projectToken");
    await dispatch(deleteProject({ projectId, token })).unwrap();
    dispatch(fetchProjectData());
    navigate("/loan/project");
  };

  const addNoEditToast = () => {
    toast.error("Cannot edit start date");
  };

  return (
    <>
      <DynamicHeader
        itemName={projectData?.name}
        isEditable={true}
        handleNameUpdate={updateName}
        handleDelete={handleDelete}
        loading={loading}
      />
      <form className="flex flex-col gap-5">
        <ProjectInputFields
          projectData={projectData}
          handleChange={handleChange}
          addNoEditToast={addNoEditToast}
          clientIdsString={clientIdsString}
          setClientIdsString={setClientIdsString}
          loading={loading}
        />

        {!hasViewOnlyAccess(roleName) && (
          <div className="flex items-center justify-end gap-4 mt-2">
            {!loading && (
              <Button
                buttonName={"Update"}
                buttonIcon={CheckCircleIcon}
                onClick={handleUpdate}
                rectangle={true}
              />
            )}
          </div>
        )}
      </form>
    </>
  );
};

export default Project;
