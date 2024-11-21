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
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { toast } from "react-toastify";
import ProjectInputFields from "./ProjectInputFields";

const CreateNewProject = () => {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const [clientIdsString, setClientIdsString] = useState("lmsClient");
  const dispatch = useDispatch();
  const { projectData, loading, error } = useSelector((state) => state.project);


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

  const createNewProject = async (event) => {
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
        navigate("/project/" + Details.projectId);
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
          <button
            type="submit"
            onClick={createNewProject}
            className="flex items-center justify-center mt-3 w-44 bg-indigo-600  hover:bg-white hover:text-black hover:border hover:drop-shadow-lg text-white p-2 rounded-md"
          >
            <FaCheckCircle className="mr-2" />
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateNewProject;
