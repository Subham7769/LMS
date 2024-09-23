import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import Button from "../Common/Button/Button";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";
import { TrashIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const TestComponent = () => {
  const [sections, setSections] = useState([]);
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
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);

  const StringArray = [
    { label: "nationality", value: "nationality" },
    { label: "gender", value: "gender" },
    { label: "maritalStatus", value: "maritalStatus" },
    { label: "occupation", value: "occupation" },
    { label: "region", value: "region" },
    { label: "sector", value: "sector" },
    { label: "panVerified", value: "panVerified" },
    { label: "panStatus", value: "panStatus" },
  ];

  const NumberArray = [
    { label: "grossSalary", value: "grossSalary" },
    { label: "age", value: "age" },
    { label: "creditScore", value: "creditScore" },
    { label: "dependents", value: "dependents" },
    { label: "disposableIncome", value: "disposableIncome" },
    { label: "basicToGross", value: "basicToGross" },
    { label: "lengthOfService", value: "lengthOfService" },
    { label: "simahScore", value: "simahScore" },
    { label: "writeOff", value: "writeOff" },
    { label: "activeRule", value: "activeRule" },
  ];

  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      name: `New Section ${sections.length + 1}`,
      size: "full",
      fields: [],
    };
    setSections([...sections, newSection]);
  };

  const addField = (sectionId, fieldConfig) => {
    const newField = {
      id: `field-${Date.now()}`,
      ...fieldConfig,
    };
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, fields: [...section.fields, newField] };
        }
        return section;
      })
    );
  };

  const updateSection = (sectionId, updates) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  };

  const downloadConfig = () => {
    const config = {
      formConfig,
      sections,
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${
      formConfig.title !== "" ? formConfig.title : "New Dynamic Form"
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadConfig = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          setFormConfig(config.formConfig);
          setSections(config.sections);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Failed to load configuration. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  // const updateField = (sectionId, fieldId, updates) => {
  //   setSections(
  //     sections.map((section) => {
  //       if (section.id === sectionId) {
  //         return {
  //           ...section,
  //           fields: section.fields.map((field) =>
  //             field.id === fieldId ? { ...field, ...updates } : field
  //           ),
  //         };
  //       }
  //       return section;
  //     })
  //   );
  // };

  const removeSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const removeField = (sectionId, fieldId) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.filter((field) => field.id !== fieldId),
          };
        }
        return section;
      })
    );
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
      setSections(newSections);
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
      setSections(newSections);
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

  const FieldComponent = ({ field, isEditorMode }) => {
    switch (field.fieldType) {
      case "NUMBER":
        return (
          <InputNumber
            labelName={field.name}
            inputName={field.name}
            inputValue={formData[field.name] || ""}
            onChange={(e) => handleInputChange(e, field)}
            disabled={isEditorMode}
          />
        );
      case "STRING":
        return (
          <InputText
            labelName={field.name}
            inputName={field.name}
            inputValue={formData[field.name] || ""}
            onChange={(e) => handleInputChange(e, field)}
            disabled={isEditorMode}
          />
        );
      default:
        return null;
    }
  };

  const Toolbox = ({ sectionId }) => {
    const [fieldConfig, setFieldConfig] = useState({
      fieldType: "",
      criteriaType: "",
      name: "",
      ruleUsageMap: {
        REGISTRATION: true,
        ELIGIBILITY: true,
        BORROWER_OFFERS: true,
      },
      numberCriteriaRangeList: [],
    });

    const handleChange = (e) => {
      const { name, checked, type, value } = e.target;

      if (type === "checkbox") {
        setFieldConfig((prevConfig) => ({
          ...prevConfig,
          ruleUsageMap: {
            ...prevConfig.ruleUsageMap,
            [name]: checked,
          },
        }));
      } else {
        setFieldConfig((prevConfig) => ({
          ...prevConfig,
          [name]: value,
        }));
      }
    };

    const handleRangeChange = (e, index) => {
      const { name, checked, type, value } = e.target;

      setFieldConfig((prevConfig) => ({
        ...prevConfig,
        numberCriteriaRangeList: prevConfig.numberCriteriaRangeList.map(
          (item, idx) => {
            if (index === idx) {
              return {
                ...item,
                [name]: type === "checkbox" ? checked : value,
              };
            }
            return item;
          }
        ),
      }));
    };

    const addRangeEntry = () => {
      setFieldConfig((prevConfig) => ({
        ...prevConfig,
        numberCriteriaRangeList: [
          ...prevConfig.numberCriteriaRangeList,
          {
            minimum: 0,
            maximum: 0,
            resident: false,
          },
        ],
      }));
    };

    const deleteRangeEntry = (index) => {
      setFieldConfig((prevConfig) => ({
        ...prevConfig,
        numberCriteriaRangeList: prevConfig.numberCriteriaRangeList.filter(
          (_, idx) => idx !== index
        ),
      }));
    };

    return (
      <div className="border-2 rounded-lg py-5 mt-4">
        <div className="grid grid-cols-1 gap-4 flex-1">
          <div className={`grid gap-5 px-5 grid-cols-3`}>
            <InputSelect
              labelName="Field Type"
              inputOptions={[
                { label: "STRING", value: "STRING" },
                { label: "NUMBER", value: "NUMBER" },
              ]}
              inputName="fieldType"
              inputValue={fieldConfig.fieldType}
              onChange={handleChange}
            />
            <InputSelect
              labelName="Criteria Type"
              inputOptions={[
                { label: "BORROWER_PROFILE", value: "BORROWER_PROFILE" },
                { label: "CALCULATED", value: "CALCULATED" },
              ]}
              inputName="criteriaType"
              inputValue={fieldConfig.criteriaType}
              onChange={handleChange}
            />
            <InputSelect
              labelName="Name"
              inputOptions={
                fieldConfig.fieldType === "STRING" ? StringArray : NumberArray
              }
              inputName="name"
              inputValue={fieldConfig.name}
              onChange={handleChange}
            />
          </div>
          <div className={`grid gap-5 px-5 grid-cols-3`}>
            <InputCheckbox
              labelName="REGISTRATION"
              inputChecked={fieldConfig.ruleUsageMap.REGISTRATION}
              onChange={handleChange}
              inputName="REGISTRATION"
            />
            <InputCheckbox
              labelName="ELIGIBILITY"
              inputChecked={fieldConfig.ruleUsageMap.ELIGIBILITY}
              onChange={handleChange}
              inputName="ELIGIBILITY"
            />
            <InputCheckbox
              labelName="BORROWER_OFFERS"
              inputChecked={fieldConfig.ruleUsageMap.BORROWER_OFFERS}
              onChange={handleChange}
              inputName="BORROWER_OFFERS"
            />
          </div>
          <div className={`grid gap-5 px-5 grid-cols-3 border-b-2 pb-5`}>
            {fieldConfig.fieldType === "NUMBER" && (
              <Button
                buttonName="+ Add Range"
                onClick={addRangeEntry}
                rectangle={true}
              />
            )}
            <Button
              buttonName="+ Add Section"
              onClick={addSection}
              rectangle={true}
              className="bg-yellow-500 hover:bg-yellow-400"
            />
            <Button
              buttonName="+ Add Field"
              onClick={() => addField(sectionId, fieldConfig)}
              rectangle={true}
              className="bg-green-500 hover:bg-green-400"
            />
          </div>
        </div>
        {fieldConfig.fieldType === "NUMBER" && (
          <div className="flex justify-start flex-wrap gap-5 p-5">
            {fieldConfig.numberCriteriaRangeList.map((range, index) => (
              <div
                key={index}
                className="grid gap-3 p-2 grid-cols-3 border-2 rounded-xl min-w-[250px] w-fit max-w-[400px] relative"
              >
                <InputNumber
                  labelName="Minimum"
                  inputName="minimum"
                  inputValue={range.minimum}
                  onChange={(e) => handleRangeChange(e, index)}
                  placeHolder="0"
                />
                <InputNumber
                  labelName="Maximum"
                  inputName="maximum"
                  inputValue={range.maximum}
                  onChange={(e) => handleRangeChange(e, index)}
                  placeHolder="0"
                />
                <InputCheckbox
                  labelName="Resident"
                  inputChecked={range.resident}
                  onChange={(e) => handleRangeChange(e, index)}
                  inputName="resident"
                />
                <div
                  className="flex justify-center items-center absolute -top-3 -right-2 px-2 bg-red-500 rounded-xl font-bold hover:bg-red-400 hover:cursor-pointer"
                  onClick={() => deleteRangeEntry(index)}
                >
                  x
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const SectionSettings = () => {
    if (!currentSection) return null;

    const [sectionConfig, setSectionConfig] = useState(currentSection);

    const updateSectionConfig = (updates) => {
      setSectionConfig((prev) => ({ ...prev, ...updates }));
    };

    const saveSectionConfig = () => {
      updateSection(currentSection.id, sectionConfig);
      setShowSectionSettings(false);
    };

    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
          showSectionSettings ? "" : "hidden"
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
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
          showFormConfig ? "" : "hidden"
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
    <div className="container mx-auto p-4 bg-zinc-50">
      <h1 className="text-3xl font-bold mb-4">
        {formConfig.title || "New Dynamic Form"}
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <InputCheckbox
            labelName={isEditorMode ? "Editor Mode" : "Usage Mode"}
            inputChecked={isEditorMode}
            onChange={(e) => setIsEditorMode(e.target.checked)}
            inputName={isEditorMode ? "Editor Mode" : "Usage Mode"}
          />
        </div>
        {isEditorMode && (
          <div className="flex gap-2">
            <Button
              onClick={() => setShowFormConfig(true)}
              buttonName="Form Config"
              rectangle={true}
            />
            <Button
              onClick={downloadConfig}
              buttonName="Download Config"
              rectangle={true}
            />
            <Button
              buttonName="Load Config"
              rectangle={true}
              onClick={() => fileInputRef.current.click()}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={loadConfig}
            />
          </div>
        )}
      </div>
      {isEditorMode && (
        <Button
          onClick={addSection}
          className="mb-4"
          buttonName="Add Section"
          rectangle={true}
        />
      )}
      <form onSubmit={handleSubmit}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid gap-4">
            {sections.map((section) => (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`shadow-md bg-gray-100 border-gray-300 border rounded-xl pb-8 pt-6 px-5 ${
                      section.size === "full"
                        ? "col-span-3"
                        : section.size === "half"
                        ? "col-span-2"
                        : "col-span-1"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-semibold">{section.name}</h2>
                      {isEditorMode && (
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              setCurrentSection(section);
                              setShowSectionSettings(true);
                            }}
                            buttonName="Settings"
                            rectangle={true}
                          />
                          <Button
                            onClick={() => removeSection(section.id)}
                            buttonName="Remove"
                            rectangle={true}
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
                              isEditorMode={isEditorMode}
                            />
                            {isEditorMode && (
                              <div className="pt-2">
                                <Button
                                  onClick={() =>
                                    removeField(section.id, field.id)
                                  }
                                  buttonName="Remove Field"
                                  rectangle={true}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {isEditorMode && <Toolbox sectionId={section.id} />}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
        <div className="flex space-x-2">
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
      <SectionSettings />
      <FormConfigModal />
    </div>
  );
};

export default TestComponent;
