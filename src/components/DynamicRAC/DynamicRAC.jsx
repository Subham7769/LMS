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
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/20/solid";
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
import Toolbox from "./ToolBox";
import RuleComponent from "./RuleComponent";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDynamicRacData } from "../../redux/Slices/sidebarSlice";
import {
  clearValidationError,
  validateRAC,
} from "../../redux/Slices/validationSlice";
import { toast } from "react-toastify";
import store from "../../redux/store";

const DynamicRAC = () => {
  const { racId } = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenSectionSettings, setIsOpenSectionSettings] = useState(false);
  const [showRuleModal, setRuleModal] = useState(false);
  const [newSize, setNewSize] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const { racConfig, loading, error } = useSelector(
    (state) => state.dynamicRac
  );
  const { name } = racConfig.racDetails;
  const sections = racConfig.sections;
  const { roleName } = useSelector((state) => state.auth);
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
          toast("Failed to load configuration. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // console.log("Source: ", source);
    // console.log("Destination: ", destination);
    // console.log("Sections before update: ", sections);

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

      // save Changes
      setTimeout(() => {
        handleSaveDynamicRAC();
      }, 1000);
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
      console.log(movedField);

      // Insert field into destination
      destRules.splice(destination.index, 0, {
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
      }, 1000);
    }
  };

  const createCloneDynamicRac = (racId, racName) => {
    dispatch(cloneDynamicRac({ racId, racName })).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        navigate(`/loan/dynamic-rac/${action.payload.racId}`);
        dispatch(fetchDynamicRacData());
      }
    });
  };

  // Updated handleDelete function
  const handleDelete = (racId) => {
    dispatch(deleteDynamicRac(racId)).then((action) => {
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
  const handleAddRule = (sectionId) => {
    setSelectedSectionId(sectionId); // Update sectionId first
    setTimeout(() => setRuleModal(true), 0); // Open modal after state updates
  };

  const ViewRuleModal = ({ isOpen, onClose, sectionId }) => {
    if (!isOpen) return null;

    return (
      <>
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-500/10 backdrop-blur-sm">
          <div className="relative w-[50%] max-h-[80vh] bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-500 ease-in-out  overflow-y-scroll">
            <div
              className={
                "sticky bg-white z-50 left-0 top-0 flex justify-between align-middle p-5 py-5 border-b-2"
              }
            >
              <p className={"font-semibold text-2xl"}>Add New Rule</p>
              <XMarkIcon
                onClick={onClose}
                className=" h-8 w-8 text-gray-500 rounded-full cursor-pointer"
              />
            </div>
            <Toolbox
              sectionId={sectionId}
              onClose={() => setRuleModal(false)}
              handleSaveDynamicRAC={handleSaveDynamicRAC}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="relative">
      {loading ? (
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
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          <p>Oops! Something went wrong. Please try again later.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2  items-center w-full">
            <div className="flex-1 flex items-center justify-between mr-5">
              <DynamicName
                initialName={name}
                onSave={(newName) => handleUpdateName(racId, newName)}
                editable={roleName !== "ROLE_VIEWER"}
              />
            </div>

            {/* Modals */}
            <CloneModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onCreateClone={(racName) => createCloneDynamicRac(racId, racName)}
              initialName={name}
            />
            <ViewRuleModal
              isOpen={showRuleModal}
              onClose={() => setRuleModal(false)}
              sectionId={selectedSectionId}
            />

            {(roleName == "ROLE_MAKER_ADMIN" ||
              roleName == "ROLE_ADMIN" ||
              roleName === "ROLE_SUPERADMIN") && (
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
          <div className="flex justify-between items-center">
            {roleName !== "ROLE_VIEWER" && (
              <div className="flex justify-between gap-5 w-full  border-b-2 pb-2">
                <div className="flex gap-2"></div>
                {(roleName == "ROLE_MAKER_ADMIN" ||
                  roleName == "ROLE_ADMIN" ||
                  roleName === "ROLE_SUPERADMIN") && (
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
            )}
          </div>
          <div className={`flex items-start "max-h-screen"`}>
            <div
              className={`basis-4/5 px-2 flex-grow overflow-y-scroll max-h-screen overflow-hidden pb-20`}
            >
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-col justify-center gap-3">
                  {/* Add first Section Box */}
                  {sections.length < 1 && (
                    <div className="bg-white flex justify-center flex-col items-center p-5 gap-3 border-2 rounded-lg">
                      <div className="bg-blue-50 rounded-full px-3 py-2 h-14 w-14 flex justify-center align-middle">
                        <span className="font-bold text-3xl text-blue-500">
                          +
                        </span>
                      </div>
                      <h2 className="font-semibold">Create New Rac</h2>
                      <p className="flex flex-col items-center text-gray-500">
                        <span>
                          Start by adding sections to your Risk Assessment
                          Criteria. You{" "}
                        </span>
                        <span>
                          can also use an existing template as a starting point
                        </span>
                      </p>
                      <div className="flex gap-5">
                        <Button
                          buttonIcon={PlusIcon}
                          buttonName="Add First Section"
                          rectangle={true}
                          onClick={() => handleAddSection()}
                        />
                        <HoverButton
                          icon={ArrowUpOnSquareIcon}
                          text="Use Template"
                          onClick={() => {}}
                          // onClick={() => fileInputRef.current.click()}
                        />
                      </div>
                    </div>
                  )}

                  {sections?.map((section) => (
                    <Droppable
                      key={section.sectionId}
                      droppableId={section.sectionId}
                    >
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`shadow-md border-gray-300 border rounded-xl overflow-hidden ${
                            section.size === "full"
                              ? "col-span-3"
                              : section.size === "half"
                              ? "col-span-2"
                              : "col-span-1"
                          }`}
                        >
                          <div className="flex justify-between items-center p-5 bg-white">
                            <div className="flex justify-center align-middle">
                              <EllipsisVerticalIcon className="h-7 text-gray-500 " />
                              <EllipsisVerticalIcon className="h-7 text-gray-500 -ml-5" />
                              <DynamicName
                                initialName={section.sectionName}
                                editable={roleName !== "ROLE_VIEWER"}
                                onSave={(name) =>
                                  dispatch(
                                    updateSection({
                                      sectionId: section.sectionId,
                                      name,
                                    })
                                  )
                                }
                              />
                            </div>
                            {roleName !== "ROLE_VIEWER" && (
                              <div className="flex justify-between items-center gap-5">
                                <div
                                  className={"flex text-blue-500"}
                                  onClick={() =>
                                    handleAddRule(section.sectionId)
                                  }
                                >
                                  <PlusIcon className="h-5 w-5" />
                                  <p>Add Rule</p>
                                </div>

                                {/* <Cog6ToothIcon
                                  onClick={() =>handleSectionSettings({sectionId: section.sectionId})}
                                  className="h-5 w-5 hover:text-indigo-500"
                                /> */}

                                <TrashIcon
                                  onClick={() =>
                                    handleDeleteSection({
                                      racId,
                                      sectionId: section.sectionId,
                                    })
                                  }
                                  className="h-5 w-5 hover:text-red-500"
                                />
                              </div>
                            )}
                          </div>

                          {/* Add Criteria Box */}
                          {section?.rules.length < 1 && (
                            <div className="bg-gray-100 flex justify-center flex-col items-center p-5 gap-3">
                              <div className="rounded-full px-3 py-2 h-14 w-14 flex justify-center align-middle">
                                <span className="font-bold text-3xl text-gray-500">
                                  +
                                </span>
                              </div>
                              <p className="flex flex-col items-center text-gray-500">
                                <span>
                                  Click to add criteria to this section
                                </span>
                              </p>
                              <div className="flex gap-5">
                                <HoverButton
                                  icon={PlusIcon}
                                  text="Add Criteria"
                                  onClick={() =>
                                    handleAddRule(section.sectionId)
                                  }
                                  // onClick={() => fileInputRef.current.click()}
                                />
                              </div>
                            </div>
                          )}

                          {section?.rules?.map((rule, index) => (
                            <Draggable
                              key={rule.dynamicRacRuleId}
                              draggableId={rule.dynamicRacRuleId}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mb-2 px-3"
                                >
                                  <RuleComponent
                                    rule={rule}
                                    racId={racId}
                                    dynamicRacRuleId={rule.dynamicRacRuleId}
                                    sectionId={section.sectionId}
                                    handleSaveDynamicRAC={handleSaveDynamicRAC}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicRAC;
