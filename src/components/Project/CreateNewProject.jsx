import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { fetchProjectData } from "../../redux/Slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjectData,
  resetProjectData,
  handleChangeInProjectData,
  createProject,
} from "../../redux/Slices/projectSlice";
import {
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { toast } from "react-toastify";
import ProjectInputFields from "./ProjectInputFields";
import Button from "../Common/Button/Button";

const CreateNewProject = () => {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const [clientIdsString, setClientIdsString] = useState("");
  const dispatch = useDispatch();
  const { projectData } = useSelector((state) => state.project);

  useEffect(() => {
    if (projectName) {
      dispatch(resetProjectData());
      dispatch(setProjectData({ name: "name", value: projectName }));
    }
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, projectName]);

  // console.log(projectData);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target; // Extracting only the name and value properties
    dispatch(handleChangeInProjectData({ name, value, checked, type })); // Passing only the serializable data
  };

  const createNewProjectFunction = async (event) => {
    event.preventDefault();
    await dispatch(validateForm(projectData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      try {
        const Details = await dispatch(
          createProject({ projectData, clientIdsString })
        ).unwrap();
        dispatch(fetchProjectData());
        navigate("/loan/project/" + Details.projectId);
      } catch (err) {
        if (err === "Unauthorized") {
          navigate("/login");
        }
      }
    }
  };

  const addNoEditToast = () => {
    toast.error("Cannot edit start date");
  };

  return (
    <>
      <form className="flex flex-col gap-8">
        <ProjectInputFields
          projectData={projectData}
          handleChange={handleChange}
          addNoEditToast={addNoEditToast}
          clientIdsString={clientIdsString}
          setClientIdsString={setClientIdsString}
          loading={false}
          error={false}
        />
        <div className="flex mt-4  justify-end ">
          {/* Submit Button */}
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName="Create"
            onClick={createNewProjectFunction}
            rectangle={true}
            buttonType={"primary"}
          />
        </div>
      </form>
    </>
  );
};

export default CreateNewProject;
