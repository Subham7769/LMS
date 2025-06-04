import React, { useState, useRef, useEffect } from "react";
import CloneModal from "../Common/CloneModal/CloneModal";
import Button from "../Common/Button/Button";
import DynamicName from "../Common/DynamicName/DynamicName";
import {
  PlusIcon,
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
  EllipsisVerticalIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
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
  restoreRule,
} from "../../redux/Slices/dynamicRacSlice";
import { useDispatch } from "react-redux";
import RuleComponent from "./RuleComponent";
import ViewTemplateModal from "./ViewTemplateModal";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { fetchDynamicRacData } from "../../redux/Slices/sidebarSlice";
import {
  clearValidationError,
  validateRAC,
} from "../../redux/Slices/validationSlice";
import { toast } from "react-toastify";
import store from "../../redux/store";
import {
  ViewerRolesDynamicRac,
  EditorRolesDynamicRac,
} from "../../data/RoleBasedAccessAndView";
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "../../assets/icons";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import Toolbox from "./ToolBox";
import EquationModal from "./EquationModal";

const RuleManager = () => {
  const { racId } = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [activeRule, setActiveRule] = useState(null);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showEquationModal, setShowEquationModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedSectionName, setSelectedSectionName] = useState(null);
  const { racConfig, loading, error } = useSelector(
    (state) => state.dynamicRac
  );
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
  const { dRulesData, handleChange } = useOutletContext();
  const ruleManagerData = dRulesData.ruleManagerData;

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
      const ruleIdx = section.rules.findIndex(
        (rule) => rule.dynamicRacRuleId === activeId
      );
      if (ruleIdx !== -1) {
        sourceSectionIndex = sectionIdx;
        sourceIndex = ruleIdx;
      }
    });

    newSections.forEach((section, sectionIdx) => {
      const ruleIdx = section.rules.findIndex(
        (rule) => rule.dynamicRacRuleId === overId
      );
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

  const handleDeleteSection = ({ racId, sectionId }) => {
    dispatch(removeSection({ sectionId }));
    dispatch(deleteSection({ racId, sectionId })).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchDynamicRacDetails(racId));
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

  const cancelEdit = () => {
    dispatch(restoreRule());
    setShowRuleModal(false);
    setIsEditMode(false);
  };

  const handleEditEquation = () => {
    setShowEquationModal(true);
  };

  const closeEquationModal = () => {
    setShowEquationModal(false);
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
      <div ref={setNodeRef} className="">
        {children}
      </div>
    );
  };

  // Draggable
  const DraggableRule = ({
    rule,
    sectionId,
    sectionName,
    racId,
    roleName,
    handleSaveDynamicRAC,
  }) => {
    const isDragDisabled =
      roleName === "ROLE_CHECKER_ADMIN" ||
      ViewerRolesDynamicRac.includes(roleName);

    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        disabled: isDragDisabled,
        id: rule.dynamicRacRuleId,
        data: {
          rule,
          sourceSectionId: sectionId, // renamed for clarity
        },
      });

    const style = {
      transform:
        !isDragDisabled && transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      padding: "8px",
      opacity: isDragging ? 0.7 : 1,
      cursor: isDragDisabled ? "not-allowed" : "grab",
    };

    return (
      <div
        ref={setNodeRef}
        {...(!isDragDisabled ? { ...listeners, ...attributes } : {})}
        style={style}
        className="px-3 bg-white dark:bg-gray-800"
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

  // Section Box
  const SectionBox = ({
    roleName,
    EditorRolesDynamicRac,
    ViewerRolesDynamicRac,
    handleAddSection,
  }) => {
    return roleName === "ROLE_MAKER_ADMIN" ||
      EditorRolesDynamicRac.includes(roleName) ? (
      <div className="bg-white dark:bg-gray-800 flex justify-center flex-col items-center p-5 gap-3 border-2 dark:border-gray-800 rounded-lg">
        <PlusIcon className="text-sky-700 h-16 w-16 bg-sky-500/20 rounded-full p-4 font-extrabold" />
        <h2 className="font-semibold dark:text-gray-200">Create New Rac</h2>
        <p className="flex flex-col items-center text-gray-500 dark:text-gray-300">
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
      (roleName === "ROLE_CHECKER_ADMIN" ||
        ViewerRolesDynamicRac.includes(roleName)) && (
        <div className="bg-white dark:bg-gray-800 flex justify-center flex-col items-center p-5 gap-3 border-2 rounded-lg">
          <PlusIcon className="text-sky-500 h-16 w-16 bg-sky-50 rounded-full p-4 font-extrabold rotate-45" />
          <h2 className="font-semibold dark:text-gray-200">
            No Data to Review
          </h2>
          <p className="flex flex-col items-center text-gray-500 dark:text-gray-300">
            No Risk Assessment Criteria submitted for review yet.
          </p>
        </div>
      )
    );
  };

  // Criteria Box
  const CriteriaBox = ({
    roleName,
    EditorRolesDynamicRac,
    ViewerRolesDynamicRac,
    handleUseTemplate,
    handleAddRule,
    section,
  }) => {
    return roleName === "ROLE_MAKER_ADMIN" ||
      EditorRolesDynamicRac.includes(roleName) ? (
      <div className="bg-white dark:bg-gray-800 flex justify-center flex-col items-center p-5 gap-3">
        <PlusIcon className="text-sky-700 h-16 w-16 bg-sky-500/20 rounded-full p-4 font-extrabold" />
        <p className="text-center text-gray-500 dark:text-gray-400">
          Click to add criteria to this section. <br /> You can also use an
          existing template as a starting point
        </p>
        <div className="flex gap-5">
          <Button
            buttonIcon={PlusIcon}
            buttonName="Add Criteria"
            buttonType="secondary"
            onClick={() =>
              handleAddRule(section.sectionId, section.sectionName)
            }
          />
          <Button
            buttonIcon={ArrowUpOnSquareIcon}
            buttonName="Use Template"
            buttonType="secondary"
            onClick={() =>
              handleUseTemplate(section.sectionId, section.sectionName)
            }
          />
        </div>
      </div>
    ) : (
      (roleName === "ROLE_CHECKER_ADMIN" ||
        ViewerRolesDynamicRac.includes(roleName)) && (
        <div className="bg-white dark:bg-gray-800 flex justify-center flex-col items-center p-5 gap-3">
          <PlusIcon className="text-sky-500 h-16 w-16 bg-sky-50 rounded-full p-4 font-extrabold rotate-45" />
          <p className="flex flex-col items-center text-gray-500 dark:text-gray-300">
            <span>No Risk Assessment Criteria available for review.</span>
          </p>
        </div>
      )
    );
  };

  // Header
  const HeaderBox = ({
    roleName,
    section,
    dispatch,
    updateSection,
    EditorRolesDynamicRac,
    handleUseTemplate,
    handleAddRule,
    handleDeleteSection,
  }) => {
    return (
      <div className="md:flex justify-between items-center p-5 bg-white dark:bg-gray-800 border-b dark:border-gray-600">
        <div className="flex items-center mb-4 md:mb-0">
          <EllipsisVerticalIcon className="h-7 text-gray-500" />
          <EllipsisVerticalIcon className="h-7 text-gray-500 -ml-5" />
          <DynamicName
            initialName={section.sectionName}
            onSave={(name) =>
              dispatch(updateSection({ sectionId: section.sectionId, name }))
            }
            editable={
              roleName === "ROLE_MAKER_ADMIN" ||
              EditorRolesDynamicRac.includes(roleName)
            }
          />
        </div>
        {(roleName === "ROLE_MAKER_ADMIN" ||
          EditorRolesDynamicRac.includes(roleName)) && (
          <div className="flex justify-end items-center gap-2 hover:cursor-pointer">
            <Button
              buttonName="Use Template"
              buttonType="tertiary"
              onClick={() =>
                handleUseTemplate(section.sectionId, section.sectionName)
              }
              buttonIcon={DocumentArrowUpIcon}
            />
            <Button
              buttonName="Add Rule"
              buttonType="tertiary"
              onClick={() =>
                handleAddRule(section.sectionId, section.sectionName)
              }
              buttonIcon={PlusIcon}
            />
            <Button
              buttonType="destructive"
              onClick={() =>
                handleDeleteSection({ racId, sectionId: section.sectionId })
              }
              buttonIcon={DeleteIcon}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <ViewTemplateModal
        isOpen={templateModal}
        onClose={() => setTemplateModal(false)}
        sectionId={selectedSectionId}
        sectionName={selectedSectionName}
        racId={racId}
      />
      <Toolbox
        isOpen={showRuleModal}
        isEditMode={isEditMode}
        onClose={cancelEdit}
        sectionId={selectedSectionId}
        sectionName={selectedSectionName}
      />

      {/* Utility Functions */}
      <div className="flex justify-end gap-5 w-full mb-5">
        {(roleName == "ROLE_MAKER_ADMIN" ||
          EditorRolesDynamicRac.includes(roleName)) && (
          <div className="flex gap-2 items-end">
            <Button
              buttonIcon={ArrowDownOnSquareIcon}
              buttonName="Download"
              buttonType="secondary"
              onClick={() => dispatch(downloadConfig())}
            />
            <Button
              buttonIcon={ArrowUpOnSquareIcon}
              buttonName="Upload"
              buttonType="secondary"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleUploadConfig}
            />
            {(roleName == "ROLE_MAKER_ADMIN" ||
              EditorRolesDynamicRac.includes(roleName)) && (
              <div>
                {!sections.length < 1 && (
                  <Button
                    buttonIcon={AddIcon}
                    buttonName="Add Section"
                    buttonType="secondary"
                    onClick={() => handleAddSection()}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Drag and Drop Context */}
      <ContainerTile defaultClass={false} loading={loading}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={(event) => {
            console.log(event.active.data.current.rule);
            setActiveRule(event.active.data.current.rule);
          }}
          onDragEnd={(event) => {
            setActiveRule(null); // Clear overlay after drop
            onDragEnd(event); // Your existing handler
          }}
          onDragCancel={() => setActiveRule(null)}
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
                    className={`shadow-md dark:border-gray-800 border rounded-xl overflow-hidden ${
                      section.size === "full"
                        ? "col-span-3"
                        : section.size === "half"
                        ? "col-span-2"
                        : "col-span-1"
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

          {/* DragOverlay here, outside the section render loop */}
          <DragOverlay>
            {activeRule ? (
              <div className="px-3 bg-white dark:bg-gray-800 border rounded-md shadow-md p-2">
                <RuleComponent
                  rule={activeRule}
                  racId={racId}
                  dynamicRacRuleId={activeRule.dynamicRacRuleId}
                  sectionId={activeRule.sectionId}
                  sectionName={activeRule.sectionName}
                  handleSaveDynamicRAC={handleSaveDynamicRAC}
                  isEditMode={false}
                  setIsEditMode={() => {}}
                  showRuleModal={false}
                  setShowRuleModal={() => {}}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
        <div className="shadow-md p-5 rounded-xl border dark:border-gray-700 mt-5">
          <div className="flex justify-between gap-5">
            <h2>{ruleManagerData?.ruleManagerEquation}</h2>
            <div>
              <Button
                buttonIcon={EditIcon}
                onClick={handleEditEquation}
                buttonType="secondary"
              />
            </div>
          </div>
        </div>
      </ContainerTile>
      {roleName !== "ROLE_VIEWER" && (
        <div className="mt-6 text-right">
          {sections.length > 0 && (
            <Button
              buttonIcon={CheckIcon}
              buttonName="Save"
              onClick={handleSaveDynamicRAC}
            />
          )}
        </div>
      )}
      <EquationModal
        isOpen={showEquationModal}
        onClose={closeEquationModal}
        ruleManagerData={ruleManagerData}
        handleChange={handleChange}
      />
    </>
  );
};

export default RuleManager;
