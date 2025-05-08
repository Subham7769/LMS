import React, { useState, useRef, useEffect } from "react";
import CloneModal from "../Common/CloneModal/CloneModal";
import Button from "../Common/Button/Button";
import DynamicName from "../Common/DynamicName/DynamicName";
import HoverButton from "../Common/HoverButton/HoverButton";
import {
  CheckCircleIcon,
  PlusIcon,
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import {
  fetchDynamicRacDetails,
  updateRacName,
  fetchOptionList,
  saveDynamicRac,
  downloadConfig,
  uploadConfig,
  updateRacConfigName,
  addSection,
  setSection,
  cloneDynamicRac,
  deleteDynamicRac,
  updateSection,
  removeSection,
  setSectionSettings,
  deleteSection,
} from "../../redux/Slices/dynamicRacSlice";
import { useDispatch } from "react-redux";
import ViewRuleModal from "./ViewRuleModal";
import RuleComponent from "./RuleComponent";
import ViewTemplateModal from "./ViewTemplateModal";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDynamicRacData } from "../../redux/Slices/sidebarSlice";
import {
  clearValidationError,
  validateRAC,
} from "../../redux/Slices/validationSlice";
import { toast } from "react-toastify";
import store from "../../redux/store";
import { ViewerRolesDynamicRac, EditorRolesDynamicRac } from '../../data/RoleBasedAccessAndView'
import ErrorFailure from "../Common/ErrorFailure/ErrorFailure";

import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const DynamicRAC = () => {
  const { racId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenSectionSettings, setIsOpenSectionSettings] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [newSize, setNewSize] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedSectionName, setSelectedSectionName] = useState(null);
  const { racConfig, loading, error } = useSelector((state) => state.dynamicRac);
  const { name } = racConfig?.racDetails;
  const sections = racConfig?.sections;
  const { roleName } = useSelector((state) => state.auth);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Drag starts after moving 5px
      },
    }),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, fetch the option list
        await dispatch(fetchOptionList(racId));

        // After fetching the option list, fetch the Decision Engine details
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
      toast(
        `${duplicateSectionName} already exists. Please use unique section names.`
      );
      return; // Exit early, preventing further execution
    }

    // Proceed with validation and API call if no duplicates
    const isValid = validateRAC(sections, dispatch);
    if (isValid) {
      console.log("API call made");
      const state = store.getState();
      const racConfig = state.dynamicRac.racConfig;
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

          setTimeout(() => handleSaveDynamicRAC(), 10);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          toast("Failed to load configuration. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    console.log("active: ", event.active);
    console.log("over: ", event.over);
    // console.log("Sections before update: ", sections);

    const activeId = active.id; //Rule
    const overId = over.id; //DroppableSection

    const newSections = [...sections]; // Clone sections array

    // Find the section and index where the dragged rule came from
    let sourceSectionIndex = -1;
    let sourceIndex = -1;
    let destSectionIndex = -1;
    let destIndex = -1;

    newSections.forEach((section, sectionIdx) => {
      const ruleIdx = section.rules.findIndex((rule) => rule.dynamicRacRuleId === activeId);
      if (ruleIdx !== -1) {
        sourceSectionIndex = sectionIdx;
        sourceIndex = ruleIdx;
      }
    });

    newSections.forEach((section, sectionIdx) => {
      const ruleIdx = section.rules.findIndex((rule) => rule.dynamicRacRuleId === overId);
      if (ruleIdx !== -1) {
        destSectionIndex = sectionIdx;
        destIndex = ruleIdx;
      }
    });

    // If drop target is a section with no items
    if (destIndex === -1) {
      destSectionIndex = newSections.findIndex(
        (section) => section.sectionId === overId
      );
      destIndex = 0;
    }

    if (sourceSectionIndex === -1 || destSectionIndex === -1) return;

    // Reordering within the same section
    if (sourceSectionIndex === destSectionIndex) {
      const sectionIndex = sourceSectionIndex;
      const newRules = Array.from(newSections[sectionIndex].rules); // Clone rules
      const [reorderedField] = newRules.splice(sourceIndex, 1); // Remove from old position
      newRules.splice(destIndex, 0, reorderedField); // Insert at new position

      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        rules: newRules,
      };

      console.log("Sections after reorder: ", newSections);
      dispatch(setSection({ newSections }));
    } else {
      // Moving field between different sections
      const sourceRules = Array.from(
        newSections[sourceSectionIndex]?.rules || []
      );
      const destRules = Array.from(newSections[destSectionIndex]?.rules || []);

      const [movedField] = sourceRules.splice(sourceIndex, 1);

      destRules.splice(destIndex, 0, {
        ...movedField,
        isModified: false,
      });

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

      // save Changes
      setTimeout(() => {
        handleSaveDynamicRAC();
      }, 500);
    }
  };


  const createCloneDynamicRac = async (racId, racName) => {
    const action = await dispatch(cloneDynamicRac({ racId, racName }));
    if (action.type === "rac/cloneDynamicRac/fulfilled") {
      navigate(`/loan/dynamic-rac/${action.payload.racId}`);
      dispatch(fetchDynamicRacData());
    }
  };


  // Updated handleDelete function
  const handleDelete = async (racId) => {
    await dispatch(deleteDynamicRac(racId)).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchDynamicRacData());
        navigate("/loan/dynamic-rac");
      }
    });
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const handleSectionSettings = ({ sectionId }) => {
    setIsOpenSectionSettings(!isOpenSectionSettings);
    dispatch(setSectionSettings({ sectionId, newSize }));
    setNewSize("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteSection = ({ racId, sectionId }) => {
    dispatch(removeSection({ sectionId }));
    dispatch(deleteSection({ racId, sectionId })).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchDynamicRacDetails(racId));
      }
    });
  };

  const handleUpdateName = (racId, newName) => {
    console.log("handleUpdateName")
    dispatch(updateRacConfigName({ newName }));
    dispatch(updateRacName({ racId, newName })).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchDynamicRacData());
      }
    });
  };

  const handleAddSection = () => {
    dispatch(addSection());
    toast("Section Added successfully");
  };

  const handleAddRule = (sectionId, sectionName) => {
    setSelectedSectionId(sectionId); // Update sectionId first
    setSelectedSectionName(sectionName); // Update sectionId first
    setTimeout(() => setShowRuleModal(true), 0); // Open modal after state updates
  };

  const handleUseTemplate = (sectionId, sectionName) => {
    setSelectedSectionId(sectionId); // Update sectionId first
    setSelectedSectionName(sectionName); // Update sectionId first
    setTimeout(() => setTemplateModal(true), 0); // Open modal after state updates
  };


  // Droppable
  const DroppableSection = ({ section, children }) => {
    const { setNodeRef } = useDroppable({
      id: section.sectionId,
      data: {
        destinationSectionId: section.sectionId, // renamed for clarity
      },
    });

    return (
      <div ref={setNodeRef} className="border rounded-md p-4 bg-white">
        {children}
      </div>
    );
  };

  // Draggable
  const DraggableRule = ({ rule, sectionId, sectionName, racId, roleName, handleSaveDynamicRAC }) => {
    const isDragDisabled = roleName === "ROLE_CHECKER_ADMIN" || ViewerRolesDynamicRac.includes(roleName);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      disabled: isDragDisabled,
      id: rule.dynamicRacRuleId,
      data: {
        rule,
        sourceSectionId: sectionId, // renamed for clarity
      },
    });

    const style = {
      transform: !isDragDisabled && transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      background: "white",
      padding: "8px",
      opacity: isDragging ? 0.5 : 1,
      cursor: isDragDisabled ? "not-allowed" : "grab",
    };

    return (
      <div
        ref={setNodeRef}
        {...(!isDragDisabled ? { ...listeners, ...attributes } : {})}
        className="px-3 bg-white border rounded-md"
        style={style}
      >
        <RuleComponent
          rule={rule}
          racId={racId}
          dynamicRacRuleId={rule.dynamicRacRuleId}
          sectionId={sectionId}
          sectionName={sectionName}
          handleSaveDynamicRAC={handleSaveDynamicRAC}
          showRuleModal={showRuleModal}
          setShowRuleModal={setShowRuleModal}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      </div>
    );
  };

  // Loading
  const LoadingSection = () => {
    return (
      <>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full flex flex-col gap-3 rounded-lg border-2 p-5">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="w-full flex flex-col items-end gap-3 rounded-lg border-2 p-5">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 animate-pulse py-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="w-full flex flex-col gap-3 rounded-lg border-2 p-5"
            >
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </>
    )
  }

  // Section Box
  const SectionBox = ({ roleName, EditorRolesDynamicRac, ViewerRolesDynamicRac, handleAddSection }) => {
    return (
      roleName === "ROLE_MAKER_ADMIN" || EditorRolesDynamicRac.includes(roleName) ? (
        <div className="bg-white flex justify-center flex-col items-center p-5 gap-3 border-2 rounded-lg">
          <PlusIcon className="text-blue-500 h-16 w-16 bg-blue-50 rounded-full p-4 font-extrabold" />
          <h2 className="font-semibold">Create New Rac</h2>
          <p className="flex flex-col items-center text-gray-500">
            Start by adding sections to your Risk Assessment Criteria.
          </p>
          <div className="flex gap-5">
            <Button
              buttonIcon={PlusIcon}
              buttonName="Add First Section"
              rectangle={true}
              onClick={() => handleAddSection()}
            />
          </div>
        </div>
      ) : (
        (roleName === "ROLE_CHECKER_ADMIN" || ViewerRolesDynamicRac.includes(roleName)) && (
          <div className="bg-white flex justify-center flex-col items-center p-5 gap-3 border-2 rounded-lg">
            <PlusIcon className="text-blue-500 h-16 w-16 bg-blue-50 rounded-full p-4 font-extrabold rotate-45" />
            <h2 className="font-semibold">No Data to Review</h2>
            <p className="flex flex-col items-center text-gray-500">
              No Risk Assessment Criteria submitted for review yet.
            </p>
          </div>
        )
      )
    )
  }

  // Criteria Box
  const CriteriaBox = ({ roleName, EditorRolesDynamicRac, ViewerRolesDynamicRac, handleUseTemplate, handleAddRule, section }) => {
    return (
      roleName === "ROLE_MAKER_ADMIN" || EditorRolesDynamicRac.includes(roleName) ? (
        <div className="bg-white flex justify-center flex-col items-center p-5 gap-3">
          <PlusIcon className="text-blue-500 h-16 w-16 bg-blue-50 rounded-full p-4 font-extrabold" />
          <p className="flex flex-col items-center text-gray-500">
            <span>Click to add criteria to this section. You</span>
            <span>can also use an existing template as a starting point</span>
          </p>
          <div className="flex gap-5">
            <HoverButton
              icon={PlusIcon}
              text="Add Criteria"
              onClick={() => handleAddRule(section.sectionId, section.sectionName)}
            />
            <HoverButton
              icon={ArrowUpOnSquareIcon}
              text="Use Template"
              onClick={() => handleUseTemplate(section.sectionId, section.sectionName)}
            />
          </div>
        </div>
      ) : (
        (roleName === "ROLE_CHECKER_ADMIN" || ViewerRolesDynamicRac.includes(roleName)) && (
          <div className="bg-white flex justify-center flex-col items-center p-5 gap-3">
            <PlusIcon className="text-blue-500 h-16 w-16 bg-blue-50 rounded-full p-4 font-extrabold rotate-45" />
            <p className="flex flex-col items-center text-gray-500">
              <span>No Risk Assessment Criteria available for review.</span>
            </p>
          </div>
        )
      )
    )
  }

  // Header
  const HeaderBox = ({ roleName, section,dispatch, updateSection, EditorRolesDynamicRac, handleUseTemplate, handleAddRule, handleDeleteSection }) => {
    return (
      <div className="flex justify-between items-center p-5 bg-white border-b">
        <div className="flex justify-center align-middle">
          <EllipsisVerticalIcon className="h-7 text-gray-500" />
          <EllipsisVerticalIcon className="h-7 text-gray-500 -ml-5" />
          <DynamicName
            initialName={section.sectionName}
            onSave={(name) =>
              dispatch(updateSection({ sectionId: section.sectionId, name }))
            }
            editable={roleName === "ROLE_MAKER_ADMIN" || EditorRolesDynamicRac.includes(roleName)}
          />
        </div>
        {(roleName === "ROLE_MAKER_ADMIN" || EditorRolesDynamicRac.includes(roleName)) && (
          <div className="flex justify-between items-center gap-5 hover:cursor-pointer">
            <div
              className={"flex text-blue-500"}
              onClick={() => handleUseTemplate(section.sectionId, section.sectionName)}
            >
              <ArrowUpOnSquareIcon className="h-5 w-5" />
              <p>Use Template</p>
            </div>
            <div
              className={"flex text-blue-500"}
              onClick={() => handleAddRule(section.sectionId, section.sectionName)}
            >
              <PlusIcon className="h-5 w-5" />
              <p>Add Rule</p>
            </div>

            <TrashIcon
              onClick={() => handleDeleteSection({ racId, sectionId: section.sectionId })}
              className="h-5 w-5 hover:text-red-500"
            />
          </div>
        )}
      </div>
    )
  }


  return (
    <div className="relative">
      {loading ? (
        <LoadingSection />
      ) : error ? (
        <ErrorFailure error={error} />
      ) : (
        <div className="flex flex-col gap-2">
          {/* Modals */}
          <CloneModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onCreateClone={(racName) => createCloneDynamicRac(racId, racName)}
            initialName={name}
          />
          {/* <ViewRuleModal
            isOpen={showRuleModal}
            onClose={() => setShowRuleModal(false)}
            sectionId={selectedSectionId}
            sectionName={selectedSectionName}
          /> */}
          <ViewTemplateModal
            isOpen={templateModal}
            onClose={() => setTemplateModal(false)}
            sectionId={selectedSectionId}
            sectionName={selectedSectionName}
            racId={racId}
          />
          {/* RAC Header */}
          <div className="flex justify-between gap-2  items-center w-full">
            <DynamicName
              initialName={name}
              onSave={(newName) => handleUpdateName(racId, newName)}
              editable={
                roleName == "ROLE_MAKER_ADMIN" || EditorRolesDynamicRac.includes(roleName)}
            />

            {(roleName == "ROLE_MAKER_ADMIN" || EditorRolesDynamicRac.includes(roleName)) && (
              <div>
                {!sections.length < 1 && (
                  <Button
                    buttonIcon={PlusIcon}
                    buttonName="Add Section"
                    rectangle={true}
                    onClick={() => handleAddSection()}
                  />
                )}
              </div>
            )}
          </div>

          {/* Utility Functions */}
          <div className="flex justify-between items-center">
            <div className="flex justify-between gap-5 w-full  border-b-2 pb-2">
              <div className="flex gap-2"></div>
              {(roleName == "ROLE_MAKER_ADMIN" || EditorRolesDynamicRac.includes(roleName)) && (
                <div className="flex gap-2 items-end">
                  <HoverButton
                    icon={ArrowDownOnSquareIcon}
                    text="Download"
                    color="yellow" // Automatically sets hover and background colors
                    onClick={() => dispatch(downloadConfig())}
                  />
                  <HoverButton
                    icon={ArrowUpOnSquareIcon}
                    text="Upload"
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
                  {roleName !== "ROLE_VIEWER" ? (
                    <div className="flex gap-4">
                      <HoverButton
                        text={"Clone"}
                        icon={DocumentDuplicateIcon}
                        onClick={handleClone}
                      />
                      {sections.length > 0 && (
                        <HoverButton
                          className="mt-4"
                          icon={CheckCircleIcon}
                          text="Save"
                          onClick={handleSaveDynamicRAC}
                        />
                      )}
                      <div className="rounded-full border text-red-500 border-red-500 p-2 hover:bg-red-500 hover:text-white hover:cursor-pointer">
                        <TrashIcon
                          className="h-5 w-5"
                          onClick={() => handleDelete(racId)}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Drag and Drop Context */}
          <div className={`flex items-start "max-h-screen"`}>
            <div
              className={`basis-4/5 px-2 flex-grow overflow-y-scroll max-h-screen overflow-hidden pb-20`}
            >
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <div className="flex flex-col justify-center gap-3">
                  {/* Add first Section Box */}
                  {sections?.length < 1 ? (
                    <SectionBox
                      roleName={roleName}
                      EditorRolesDynamicRac={EditorRolesDynamicRac}
                      ViewerRolesDynamicRac={ViewerRolesDynamicRac}
                      handleAddSection={handleAddSection}
                    />
                  ) : (
                    sections?.map((section) => (
                      <DroppableSection key={section.sectionId} section={section}>
                        <div
                          className={`shadow-md border-gray-300 border rounded-xl overflow-hidden ${section.size === "full" ? "col-span-3" :
                            section.size === "half" ? "col-span-2" : "col-span-1"
                            }`}
                        >
                          {/* HeaderBox */}
                          <HeaderBox
                            roleName={roleName}
                            section={section}
                            dispatch={dispatch}
                            updateSection={updateSection}
                            EditorRolesDynamicRac={EditorRolesDynamicRac}
                            handleUseTemplate={handleUseTemplate}
                            handleAddRule={handleAddRule}
                            handleDeleteSection={handleDeleteSection}
                          />
                          {/* Add Criteria Box */}
                          {section?.rules?.length < 1 ? (
                            <CriteriaBox
                              roleName={roleName}
                              EditorRolesDynamicRac={EditorRolesDynamicRac}
                              ViewerRolesDynamicRac={ViewerRolesDynamicRac}
                              handleUseTemplate={handleUseTemplate}
                              handleAddRule={handleAddRule}
                              section={section}
                            />
                          ) : (
                            section?.rules?.map((rule, index) => (
                              // Rule Component
                              <DraggableRule
                                key={rule.dynamicRacRuleId}
                                rule={rule}
                                sectionId={section.sectionId}
                                sectionName={section.sectionName}
                                racId={racId}
                                roleName={roleName}
                                handleSaveDynamicRAC={handleSaveDynamicRAC}
                              />
                            ))
                          )}
                        </div>
                      </DroppableSection>
                    ))
                  )}
                </div>
              </DndContext>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicRAC;
