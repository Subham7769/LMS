import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import Button from "../Common/Button/Button";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";
import HoverButton from "../Common/HoverButton/HoverButton";
import { CheckCircleIcon, PlusCircleIcon, PlusIcon, Cog6ToothIcon, TrashIcon,  ArrowUpOnSquareIcon, PencilSquareIcon, ViewfinderCircleIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { downloadConfig, uploadConfig, addSection,setSection, updateSection, removeSection,  removeField } from '../../redux/Slices/DynamicRacSlice'
import { useDispatch } from "react-redux";
import Toolbox from './ToolBox'

const TestComponent = () => {
  // const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [showSectionSettings, setShowSectionSettings] = useState(false);
  const [showFormConfig, setShowFormConfig] = useState(false);
  const [formConfig, setFormConfig] = useState({
    title: "",
    description: "",
    submitEndpoint: "",
    getEndpoint: "",
    updateEndpoint: "",
    deleteEndpoint: "",
    showAddButton: true,
    showSaveButton: true,
    showDeleteButton: true,
    showUpdateButton: true,
  });
  const [isEditorMode, setIsEditorMode] = useState(true);
  const {sections} = useSelector((state)=>state.dynamicRac)

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);

  const HandleAddSection = () => {
    dispatch(addSection())
  };

  const HandleUpdateSection = (sectionId, updates) => {
    dispatch(updateSection({ sectionId, updates }))
  };

  const handleUploadConfig = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          setFormConfig(config.formConfig);
          dispatch(uploadConfig({ formConfig: config.formConfig, sections: config.sections }));
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Failed to load configuration. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const hanldleRemoveSection = (sectionId) => {
    dispatch(removeSection({ sectionId }))
  };

  const handleRemoveField = (sectionId, fieldId) => {
    dispatch(removeField({ sectionId, fieldId }))
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same section
      const sectionId = source.droppableId;
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);
      const newFields = Array.from(sections[sectionIndex].fields);
      const [reorderedField] = newFields.splice(source.index, 1);
      newFields.splice(destination.index, 0, reorderedField);

      const newSections = [...sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        fields: newFields,
      };
      dispatch(setSection({ newSections }))
    } else {
      // Moving field between sections
      const sourceSectionIndex = sections.findIndex(
        (s) => s.id === source.droppableId
      );
      const destSectionIndex = sections.findIndex(
        (s) => s.id === destination.droppableId
      );
      const newSections = [...sections];
      const [movedField] = newSections[sourceSectionIndex].fields.splice(
        source.index,
        1
      );
      newSections[destSectionIndex].fields.splice(
        destination.index,
        0,
        movedField
      );
      dispatch(setSection({ newSections }))
    }
  };

  const handleInputChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditorMode) {
      console.log("Form data:", formData);
      return;
    }
    try {
      const response = await fetch(formConfig.submitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({});
      } else {
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const FieldComponent = ({ field, fieldId, isEditorMode, sectionId }) => {
    switch (field.fieldType) {
      case "NUMBER":
        return (
          <div className="flex justify-between items-center gap-2 ">
            <InputNumber
              labelName={field.name}
              inputName={field.name}
              inputValue={formData[field.name] || ""}
              onChange={(e) => handleInputChange(e, field)}
              disabled={isEditorMode}
            />
            {isEditorMode && (
              <TrashIcon onClick={() =>
                handleRemoveField(sectionId, fieldId)
              }
                className="h-5 w-5 mt-4 hover:text-red-500 hover:cursor-pointer" />
            )}
          </div>
        );
      case "STRING":
        return (
          <div className="flex justify-between items-center gap-2 ">
            <InputText
              labelName={field.name}
              inputName={field.name}
              inputValue={formData[field.name] || ""}
              onChange={(e) => handleInputChange(e, field)}
              disabled={isEditorMode}
            />
            {isEditorMode && (
              <TrashIcon onClick={() =>
                handleRemoveField(sectionId, fieldId)
              }
                className="h-5 w-5 mt-4 hover:text-red-500 hover:cursor-pointer" />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const SectionSettings = () => {
    if (!currentSection) return null;

    const [sectionConfig, setSectionConfig] = useState(currentSection);

    const updateSectionConfig = (updates) => {
      setSectionConfig((prev) => ({ ...prev, ...updates }));
    };

    const saveSectionConfig = () => {
      HandleUpdateSection(currentSection.id, sectionConfig);
      setShowSectionSettings(false);
    };

    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${showSectionSettings ? "" : "hidden"
          }`}
      >
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Section Settings</h2>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={sectionConfig.name}
              onChange={(e) => updateSectionConfig({ name: e.target.value })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Size</label>
            <select
              value={sectionConfig.size}
              onChange={(e) => updateSectionConfig({ size: e.target.value })}
              className="w-full border rounded px-2 py-1"
            >
              <option value="full">Full</option>
              <option value="half">Half</option>
              <option value="third">Third</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              onClick={saveSectionConfig}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowSectionSettings(false)}
              className="ml-2 bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const FormConfigModal = () => {
    const [localFormConfig, setLocalFormConfig] = useState(formConfig);

    const handleSave = () => {
      setFormConfig(localFormConfig);
      setShowFormConfig(false);
    };

    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${showFormConfig ? "" : "hidden"
          }`}
      >
        <div className="bg-white p-6 rounded-lg w-2/3">
          <h2 className="text-xl font-bold mb-4">Form Configuration</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <InputText
                inputValue={localFormConfig.title}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    title: e.target.value,
                  })
                }
                labelName="Title"
                inputName="title"
              />
            </div>
            <div>
              <InputText
                inputValue={localFormConfig.description}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    description: e.target.value,
                  })
                }
                labelName="Description"
                inputName="description"
              />
            </div>
            <div>
              <InputText
                inputValue={localFormConfig.submitEndpoint}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    submitEndpoint: e.target.value,
                  })
                }
                labelName="Submit Endpoint"
                inputName="submitEndpoint"
              />
            </div>
            <div>
              <InputText
                inputValue={localFormConfig.getEndpoint}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    getEndpoint: e.target.value,
                  })
                }
                labelName="Get Endpoint"
                inputName="getEndpoint"
              />
            </div>
            <div>
              <InputText
                inputValue={localFormConfig.updateEndpoint}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    updateEndpoint: e.target.value,
                  })
                }
                labelName="Update Endpoint"
                inputName="updateEndpoint"
              />
            </div>
            <div>
              <InputText
                inputValue={localFormConfig.deleteEndpoint}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    deleteEndpoint: e.target.value,
                  })
                }
                labelName="Delete Endpoint"
                inputName="deleteEndpoint"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <InputCheckbox
                labelName="Show Add Button"
                inputChecked={localFormConfig.showAddButton}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    showAddButton: e.target.checked,
                  })
                }
                inputName="Show Add Button"
              />
            </div>
            <div>
              <InputCheckbox
                labelName="Show Save Button"
                inputChecked={localFormConfig.showSaveButton}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    showSaveButton: e.target.checked,
                  })
                }
                inputName="Show Save Button"
              />
            </div>
            <div>
              <InputCheckbox
                labelName="Show Delete Button"
                inputChecked={localFormConfig.showDeleteButton}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    showDeleteButton: e.target.checked,
                  })
                }
                inputName="Show Delete Button"
              />
            </div>
            <div>
              <InputCheckbox
                labelName="Show Update Button"
                inputChecked={localFormConfig.showUpdateButton}
                onChange={(e) =>
                  setLocalFormConfig({
                    ...localFormConfig,
                    showUpdateButton: e.target.checked,
                  })
                }
                inputName="Show Update Button"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleSave} buttonName="Save" rectangle={true} />
            <Button
              onClick={() => setShowFormConfig(false)}
              className="ml-2 !bg-gray-300 !text-black"
              rectangle={true}
              buttonName="Cancel"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold  flex-1">
          {formConfig.title || "New Dynamic Form"}
        </h1>
        <div className="flex justify-center items-center -mt-4">
          <label className="flex items-center cursor-pointer mt-3">
            <input
              type="checkbox"
              checked={isEditorMode}
              onChange={(e) => setIsEditorMode(e.target.checked)}
              className="hidden" // Hide the checkbox visually
            />
            <div className="flex justify-between items-center gap-1 hover:cursor-pointer hover:text-indigo-600 hover:bg-indigo-100 rounded-lg border-2 px-2 py-1">
              {isEditorMode ? <ViewfinderCircleIcon className="h-5 w-5" /> : <PencilSquareIcon className="h-5 w-5" />}
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
                icon={Cog6ToothIcon}
                text="Form Config"
                color="indigo" // Automatically sets hover and background colors
                onClick={() => setShowFormConfig(true)}
              />
              <HoverButton
                icon={PlusIcon}
                text="Add Section"
                color="green" // Automatically sets hover and background colors
                onClick={() => HandleAddSection()}
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
      <div className="flex items-start max-h-[550px] gap-3">
        {isEditorMode && <Toolbox />}
        <form
          onSubmit={handleSubmit}
          className={`basis-3/4 px-2 flex-grow overflow-y-scroll max-h-[550px] overflow-hidden`}
        >
          <DragDropContext onDragEnd={onDragEnd} >
            <div className="grid gap-4" >
              {sections.map((section) => (
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
                        <h2 className="text-xl font-semibold">{section.name}</h2>
                        {isEditorMode && (
                          <div className="flex justify-between items-center gap-2">
                            <Cog6ToothIcon
                              onClick={() => {
                                setCurrentSection(section);
                                setShowSectionSettings(true);
                              }}
                              className="h-6 w-6 hover:text-green-500"
                            />
                            <TrashIcon
                              onClick={() => hanldleRemoveSection(section.id)}
                              className="h-6 w-6 hover:text-red-500"
                            />
                          </div>
                        )}
                      </div>

                      {section.fields.map((field, index) => (
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
          <div className="flex justify-center items-center gap-5">
            {!isEditorMode && formConfig.showAddButton && (
              <Button
                className="mt-4"
                buttonIcon={PlusCircleIcon}
                buttonName="Add"
                rectangle={true}
              />
            )}

            {!isEditorMode && formConfig.showSaveButton && (
              <Button
                className="mt-4"
                buttonIcon={CheckCircleIcon}
                buttonName="Save"
                rectangle={true}
              />
            )}

            {!isEditorMode && formConfig.showUpdateButton && (
              <Button
                className="mt-4"
                buttonIcon={CheckCircleIcon}
                buttonName="Update"
                rectangle={true}
              />
            )}

            {!isEditorMode && formConfig.showDeleteButton && (
              <Button
                className="mt-4"
                buttonIcon={TrashIcon}
                rectangle={true}
                buttonName="Delete"
              />
            )}
          </div>
        </form>
      </div>
      <SectionSettings />
      <FormConfigModal />
    </div>
  );
};

export default TestComponent;
