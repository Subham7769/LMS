import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CloneModal from "../Common/CloneModal/CloneModal";
import Button from "../Common/Button/Button";
import DynamicName from "../Common/DynamicName/DynamicName";
import HoverButton from "../Common/HoverButton/HoverButton";
import {
  CheckCircleIcon,
  PlusIcon,
  ArrowUpOnSquareIcon,
  PencilSquareIcon,
  ViewfinderCircleIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { fetchDynamicRacDetails, updateRacName, fetchOptionList, saveDynamicRac, downloadConfig, uploadConfig, updateRacConfigName, addSection, setSection, cloneDynamicRac, deleteDynamicRac, updateSection, removeSection ,deleteSection} from '../../redux/Slices/DynamicRacSlice'
import { useDispatch } from "react-redux";
import Toolbox from "./ToolBox";
import RuleComponent from "./RuleComponent";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import { fetchDynamicRacData } from "../../redux/Slices/sidebarSlice";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed, Warning } from "../Toasts";
import store from "../../redux/store";
import {
  clearValidationError,
  validateRAC,
} from "../../redux/Slices/validationSlice";

const DynamicRAC = () => {
  const { racId } = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isEditorMode, setIsEditorMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { racConfig, loading, error } = useSelector(
    (state) => state.dynamicRac
  );
  const { name } = racConfig.racDetails;
  const sections = racConfig.sections;
  const navigate = useNavigate();

  // console.log(fetchOptionList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, fetch the option list
        await dispatch(fetchOptionList(racId));

        // After fetching the option list, fetch the dynamic RAC details
        await dispatch(fetchDynamicRacDetails(racId));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function to execute the dispatches one by one

    return () => {
      dispatch(clearValidationError());
    };
  }, [racId, dispatch]);

  const handleUploadConfig = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          // Dispatch the updated structure with racDetails and sections
          dispatch(
            uploadConfig({
              racDetails: config.racDetails, // Handle racDetails
              sections: config.sections, // Handle sections
            })
          );
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Failed to load configuration. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    console.log("Source: ", source);
    console.log("Destination: ", destination);
    console.log("Sections before update: ", sections);

    const newSections = [...sections]; // Clone sections array

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same section
      const sectionIndex = newSections.findIndex(
        (s) => s.sectionId === source.droppableId
      );

      if (sectionIndex === -1) return; // Validate section index

      const newRules = Array.from(newSections[sectionIndex].rules); // Clone rules
      const [reorderedField] = newRules.splice(source.index, 1); // Remove from old position
      newRules.splice(destination.index, 0, reorderedField); // Insert at new position

      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        rules: newRules,
      };

      console.log("Sections after reorder: ", newSections);
      dispatch(setSection({ newSections }));
    } else {
      // Moving field between different sections
      const sourceSectionIndex = newSections.findIndex(
        (s) => s.sectionId === source.droppableId
      );
      const destSectionIndex = newSections.findIndex(
        (s) => s.sectionId === destination.droppableId
      );

      if (sourceSectionIndex === -1 || destSectionIndex === -1) return; // Validate indices

      // Clone source and destination rules
      const sourceRules = Array.from(
        newSections[sourceSectionIndex]?.rules || []
      );
      const destRules = Array.from(newSections[destSectionIndex]?.rules || []);

      if (sourceRules.length === 0 || source.index >= sourceRules.length)
        return; // Validate source field

      // Remove field from source
      const [movedField] = sourceRules.splice(source.index, 1);

      // Insert field into destination
      destRules.splice(destination.index, 0, movedField);

      newSections[sourceSectionIndex] = {
        ...newSections[sourceSectionIndex],
        rules: sourceRules,
      };
      newSections[destSectionIndex] = {
        ...newSections[destSectionIndex],
        rules: destRules,
      };

      console.log("Sections after move: ", newSections);
      dispatch(setSection({ newSections }));
    }
  };

  const createCloneDynamicRac = (racId, racName) => {
    dispatch(cloneDynamicRac({ racId, racName })).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        navigate(`/dynamic-rac/${action.payload.racId}`);
        dispatch(fetchDynamicRacData());
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Clone Created"}
            message={"Clone has been created successfully"}
          />
        ));
      }
    });
  };

  const handleSaveDynamicRAC = async () => {
    // Extract the section names
    const sectionNames = sections.map((section) => section.sectionName);

    // Create a Set to check for uniqueness
    const uniqueSectionNames = new Set();
    let duplicateSectionName = null;

    // Check for duplicates
    for (let name of sectionNames) {
      if (uniqueSectionNames.has(name)) {
        duplicateSectionName = name;
        break; // Stop the loop if a duplicate is found
      }
      uniqueSectionNames.add(name);
    }

    if (duplicateSectionName) {
      // Show an alert message if a duplicate section name exists
      toast.custom((t) => (
        <Failed
          t={t}
          toast={toast}
          title={"Alert"}
          message={`"${duplicateSectionName}" already exists. Please use unique section names.`}
        />
      ));
      return; // Exit early, preventing further execution
    }

    // Proceed with validation and API call if no duplicates
    const isValid = validateRAC(sections, dispatch);
    if (isValid) {
      console.log("API call made");
      try {
        const saveAction = await dispatch(saveDynamicRac(racConfig));

        if (saveAction.type.endsWith("fulfilled")) {
          await dispatch(fetchOptionList(racId));

          await dispatch(fetchDynamicRacDetails(racId));
        }
      } catch (error) {
        console.error("Error during handleSave:", error);
      }
    }
  };

  // Updated handleDelete function
  const handleDelete = (racId) => {
    dispatch(deleteDynamicRac(racId)).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchDynamicRacData());
        navigate("/dynamic-rac");
      }
    });
  };


  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteSection = ({ racId, sectionId }) => {
    dispatch(removeSection({ sectionId }))
    dispatch(deleteSection({ racId, sectionId })).then((action)=>{
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchDynamicRacDetails(racId));
      }
    })

  };

  const handleUpdateName = (racId, newName) => {
    dispatch(updateRacConfigName({ newName }))
    dispatch(updateRacName({ racId, newName })).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchDynamicRacData());
      }
    })
  };

  const handleAddSection = () => {
    dispatch(addSection())
    toast.custom((t) => (
      <Passed
        t={t}
        toast={toast}
        title={"Section Added"}
        message={"Section Added successfully"}
      />
    ));
  };


  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 flex items-center justify-between mr-5">
            <DynamicName
              initialName={name}
              onSave={(newName) => handleUpdateName(racId, newName)}
            />
            <div className="flex gap-4">
              <Button
                buttonName={"Clone"}
                onClick={handleClone}
                rectangle={true}
              />
              <Button
                buttonIcon={TrashIcon}
                onClick={() => handleDelete(racId)}
                circle={true}
              />
            </div>
          </div>

          <CloneModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onCreateClone={(racName) => createCloneDynamicRac(racId, racName)}
            initialName={name}
          />

          <div className="flex justify-center items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isEditorMode}
                onChange={(e) => setIsEditorMode(e.target.checked)}
                className="hidden" // Hide the checkbox visually
              />
              <div className="flex justify-between items-center gap-1 hover:cursor-pointer hover:text-indigo-600 hover:bg-indigo-100 rounded-lg border-2 px-2 py-1">
                {isEditorMode ? (
                  <ViewfinderCircleIcon className="h-4 w-4" />
                ) : (
                  <PencilSquareIcon className="h-4 w-4" />
                )}
                <span className="text-sm mt-1font-bold">
                  {isEditorMode ? "View Mode" : "Editor Mode"}
                </span>
              </div>
            </label>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {isEditorMode && (
            <div className="flex justify-between gap-5 w-full">
              <div className="flex gap-2">
                <HoverButton
                  icon={PlusIcon}
                  text="Add Section"
                  color="green" // Automatically sets hover and background colors
                  onClick={() => handleAddSection()}
                />
              </div>
              <div className="flex gap-2 items-end">
                <HoverButton
                  icon={ArrowDownOnSquareIcon}
                  text="Download Config"
                  color="yellow" // Automatically sets hover and background colors
                  onClick={() => dispatch(downloadConfig())}
                />
                <HoverButton
                  icon={ArrowUpOnSquareIcon}
                  text="Upload Config"
                  color="green" // Automatically sets hover and background colors
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  style={{ display: "none" }}
                  onChange={handleUploadConfig}
                />
              </div>
            </div>
          )}
        </div>
        <div
          className={`flex items-start ${isEditorMode ? " max-h-[550px]" : "max-h-screen"
            }`}
        >
          {isEditorMode && <Toolbox />}
          <div
            className={`basis-4/5 px-2 flex-grow overflow-y-scroll ${isEditorMode ? " max-h-[550px]" : "max-h-screen"
              } overflow-hidden pb-20`}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex flex-col justify-center gap-5">
                {sections?.map((section) => (
                  <Droppable
                    key={section.sectionId}
                    droppableId={section.sectionId}
                  >
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`shadow-md border-gray-300 border rounded-xl p-5 ${section.size === "full"
                          ? "col-span-3"
                          : section.size === "half"
                            ? "col-span-2"
                            : "col-span-1"
                          }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <DynamicName
                            initialName={section.sectionName}
                            onSave={(name) =>
                              dispatch(
                                updateSection({
                                  sectionId: section.sectionId,
                                  name,
                                })
                              )
                            }
                          />
                          {isEditorMode && (
                            <div className="flex justify-between items-center gap-2">
                              <TrashIcon
                                onClick={() => handleDeleteSection({ racId, sectionId: section.sectionId })}
                                className="h-5 w-5 hover:text-red-500"
                              />
                            </div>
                          )}
                        </div>

                        {section?.rules?.map((rule, index) => (
                          <Draggable
                            key={rule.dynamicRacRuleId}
                            draggableId={rule.dynamicRacRuleId}
                            index={index}
                            isDragDisabled={!isEditorMode}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-4"
                              >
                                <RuleComponent
                                  rule={rule}
                                  racId={racId}
                                  dynamicRacRuleId={rule.dynamicRacRuleId}
                                  isEditorMode={isEditorMode}
                                  sectionId={section.sectionId}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
            {sections.length > 0 ? (
              <div className="flex justify-end items-center gap-5">
                <Button
                  className="mt-4"
                  buttonIcon={CheckCircleIcon}
                  buttonName="Save"
                  onClick={handleSaveDynamicRAC}
                  rectangle={true}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicRAC;
