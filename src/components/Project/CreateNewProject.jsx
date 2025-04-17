import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProjectData } from "../../redux/Slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjectData,
  resetProjectData,
  handleChangeInProjectData,
  createProject,
} from "../../redux/Slices/projectSlice";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import SectionSidebar from "../Common/Sidebar/SectionSidebar";
import {
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  CalculatorIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const CreateNewProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        navigate(`/loan/project/${Details.projectId}/basic-details`);
      } catch (err) {
        if (err === "Unauthorized") {
          navigate("/login");
        }
      }
    }
  };

  const basePath = `/loan/project/newProject/${projectName}`;

  const navItems = [
    {
      label: "Basic Details",
      path: "/basic-details",
      ButtonIcon: DocumentTextIcon,
    },
    {
      label: "Interest Capping",
      path: "/interest-capping",
      ButtonIcon: CalculatorIcon,
    },
    { label: "Roll Over", path: "/roll-over", ButtonIcon: BanknotesIcon },
    {
      label: "Late Penalty",
      path: "/late-penalty",
      ButtonIcon: ExclamationTriangleIcon,
    },
    {
      label: "Recurring Fees",
      path: "/recurring-fees",
      ButtonIcon: CurrencyDollarIcon,
    },
    {
      label: "Grace Period",
      path: "/grace-period",
      ButtonIcon: ClockIcon,
    },
    {
      label: "Additional Settings",
      path: "/additional-settings",
      ButtonIcon: AdjustmentsHorizontalIcon,
    },
  ];

  const currentIndex = navItems.findIndex((item) =>
    location.pathname.includes(item.path)
  );
  const isLastPage = currentIndex === navItems.length - 1;

  const handleNext = () => {
    if (currentIndex < navItems.length - 1) {
      const nextPath = `${basePath}${navItems[currentIndex + 1].path}`;
      navigate(nextPath);
    }
  };

  return (
    <>
      <ContainerTile>
        <div className="flex flex-col md:flex-row md:-mr-px">
          <SectionSidebar navItems={navItems} basePath={basePath} />
          <div className="flex-grow flex flex-col justify-between">
            <div className="p-5">
              <Outlet
                context={{
                  projectData,
                  handleChange,
                  clientIdsString,
                  setClientIdsString,
                }}
              />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700/60 px-6 py-5">
              <div className="text-right">
                {isLastPage ? (
                  <Button
                    buttonIcon={CheckCircleIcon}
                    buttonName="Create"
                    onClick={createNewProjectFunction}
                    buttonType={"primary"}
                  />
                ) : (
                  <Button
                    buttonName="Next"
                    onClick={handleNext}
                    buttonType="secondary"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default CreateNewProject;
