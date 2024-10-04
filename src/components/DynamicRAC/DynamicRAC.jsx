import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CloneModal from "../Common/CloneModal/CloneModal";
import Button from "../Common/Button/Button";
import DynamicName from "../Common/DynamicName/DynamicName";
import HoverButton from "../Common/HoverButton/HoverButton";
import { CheckCircleIcon, PlusIcon, ArrowUpOnSquareIcon, PencilSquareIcon, ViewfinderCircleIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useSelector } from "react-redux";
import { downloadConfig, uploadConfig, updateRacConfigName, addSection, setSection, cloneDynamicRac, deleteDynamicRac, updateSection, removeSection } from '../../redux/Slices/DynamicRacSlice'
import { useDispatch } from "react-redux";
import Toolbox from './ToolBox'
import FieldComponent from './FieldComponent'
import { useParams } from "react-router-dom";

const TestComponent = () => {
  const { racId } = useParams();
  const dispatch = useDispatch()
  const fileInputRef = useRef(null);
  const [isEditorMode, setIsEditorMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { racConfig } = useSelector((state) => state.dynamicRac)
  const { sections, name } = racConfig;

  const handleUploadConfig = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          dispatch(uploadConfig({ sections: config.sections }));
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
        (s) => s.id === source.droppableId
      );
  
      if (sectionIndex === -1) return; // Validate section index
  
      const newFields = Array.from(newSections[sectionIndex].fields); // Clone fields
      const [reorderedField] = newFields.splice(source.index, 1); // Remove from old position
      newFields.splice(destination.index, 0, reorderedField); // Insert at new position
  
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        fields: newFields,
      };
  
      console.log("Sections after reorder: ", newSections);
      dispatch(setSection({ newSections }));
  
    } else {
      // Moving field between different sections
      const sourceSectionIndex = newSections.findIndex(
        (s) => s.id === source.droppableId
      );
      const destSectionIndex = newSections.findIndex(
        (s) => s.id === destination.droppableId
      );
  
      if (sourceSectionIndex === -1 || destSectionIndex === -1) return; // Validate indices
  
      // Clone source and destination fields
      const sourceFields = Array.from(newSections[sourceSectionIndex]?.fields || []);
      const destFields = Array.from(newSections[destSectionIndex]?.fields || []);
  
      if (sourceFields.length === 0 || source.index >= sourceFields.length) return; // Validate source field
  
      // Remove field from source
      const [movedField] = sourceFields.splice(source.index, 1);
  
      // Insert field into destination
      destFields.splice(destination.index, 0, movedField);
  
      newSections[sourceSectionIndex] = {
        ...newSections[sourceSectionIndex],
        fields: sourceFields,
      };
      newSections[destSectionIndex] = {
        ...newSections[destSectionIndex],
        fields: destFields,
      };
  
      console.log("Sections after move: ", newSections);
      dispatch(setSection({ newSections }));
    }
  };
  
  
  const createCloneDynamicRac = (racName) => {
    dispatch(cloneDynamicRac({ racId, racName })).then(
      (action) => {
        if (action.type.endsWith("fulfilled")) {
          toast.custom((t) => (
            <Passed
              t={t}
              toast={toast}
              title={"Clone Created"}
              message={"Clone has been created successfully"}
            />
          ));
        }
      }
    );
  };

  const handleDelete = () => {
    dispatch(deleteDynamicRac(racId)).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchBEData());
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex-1 flex items-center justify-between mr-5">
          <DynamicName initialName={name} onSave={(name) => dispatch(updateRacConfigName({ name }))} />
          <div className="flex gap-4">
            <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
            <Button buttonIcon={TrashIcon} onClick={handleDelete} circle={true} />
          </div>
        </div>

        <CloneModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreateClone={createCloneDynamicRac}
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
              {isEditorMode ? <ViewfinderCircleIcon className="h-4 w-4" /> : <PencilSquareIcon className="h-4 w-4" />}
              <span className="text-sm mt-1font-bold">{isEditorMode ? "View Mode" : "Editor Mode"}</span>
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
                onClick={() => dispatch(addSection())}
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
      <div className="flex items-start max-h-[550px]">
        {isEditorMode && <Toolbox />}
        <div className={`basis-4/5 px-2 flex-grow overflow-y-scroll max-h-[550px] overflow-hidden`}>
          <DragDropContext onDragEnd={onDragEnd} >
            <div className="flex flex-col justify-center gap-5" >
              {sections?.map((section) => (
                <Droppable key={section.id} droppableId={section.id}>
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
                        <DynamicName initialName={section.name} onSave={(name) => dispatch(updateSection({ sectionId: section.id, name }))} />
                        {isEditorMode && (
                          <div className="flex justify-between items-center gap-2">
                            <TrashIcon
                              onClick={() => dispatch(removeSection({ sectionId: section.id }))}
                              className="h-5 w-5 hover:text-red-500"
                            />
                          </div>
                        )}
                      </div>

                      {section?.fields?.map((field, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
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
                              <FieldComponent
                                field={field}
                                fieldId={field.id}
                                isEditorMode={isEditorMode}
                                sectionId={section.id}
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
          {
            sections.length > 0 ? (
              <div className="flex justify-end items-center gap-5">
                <Button
                  className="mt-4"
                  buttonIcon={CheckCircleIcon}
                  buttonName="Save"
                  rectangle={true}
                />
              </div>
            )
              : ""
          }

        </div>
      </div>
    </div>
  );
};

export default TestComponent;
