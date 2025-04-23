import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import SectionSidebar from "../Common/Sidebar/SectionSidebar";
import {
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  CalculatorIcon,
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

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
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(handleChangeInProjectData({ name, value, checked, type })); // Passing only the serializable data
    }
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
      await dispatch(
        updateProject({ projectData, projectId, clientIdsString })
      ).unwrap();
      dispatch(fetchProjectData());
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("projectToken");
    await dispatch(deleteProject({ projectId, token })).unwrap();
    dispatch(fetchProjectData());
    navigate("/loan/project");
  };

  const basePath = `/loan/project/${projectId}`;

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

  return (
    <>
      <DynamicHeader
        itemName={projectData?.name}
        isEditable={true}
        handleNameUpdate={updateName}
        handleDelete={handleDelete}
        loading={loading}
      />
      <ContainerTile loading={loading}>
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
              {!hasViewOnlyAccess(roleName) && (
                <div className="text-right">
                  {!loading && (
                    <Button
                      buttonName={"Update"}
                      buttonIcon={CheckIcon}
                      onClick={handleUpdate}
                      buttonType={"primary"}
                      loading={loading}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default Project;
