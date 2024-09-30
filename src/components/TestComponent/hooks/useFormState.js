

import { useState, useEffect } from "react";

export function useFormState() {
  const [fields, setFields] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [formVersion, setFormVersion] = useState(1);
  const [templates, setTemplates] = useState([]);
  const [apiConfig, setApiConfig] = useState({
    getUrl: "",
    postUrl: "",
    putUrl: "",
    deleteUrl: "",
  });

  useEffect(() => {
    // Load saved data from localStorage
    const savedFields = localStorage.getItem("formFields");
    const savedVersion = localStorage.getItem("formVersion");
    const savedTemplates = localStorage.getItem("formTemplates");
    const savedApiConfig = localStorage.getItem("apiConfig");

    if (savedFields) setFields(JSON.parse(savedFields));
    if (savedVersion) setFormVersion(parseInt(savedVersion));
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));
    if (savedApiConfig) setApiConfig(JSON.parse(savedApiConfig));
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem("formFields", JSON.stringify(fields));
    localStorage.setItem("formVersion", formVersion.toString());
    localStorage.setItem("formTemplates", JSON.stringify(templates));
    localStorage.setItem("apiConfig", JSON.stringify(apiConfig));
  }, [fields, formVersion, templates, apiConfig]);

  const updateField = (id, updates) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
    setFormVersion((prevVersion) => prevVersion + 1);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
    setFormVersion((prevVersion) => prevVersion + 1);
  };

  const addField = (type) => {
    const newField = {
      id: `field_${fields.length + 1}`,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      value: type === "multiselect" ? [] : "",
      validation: {
        required: false,
        pattern: "",
        minLength: "",
        maxLength: "",
        min: "",
        max: "",
      },
      error: "",
    };
    setFields([...fields, newField]);
    setFormVersion((prevVersion) => prevVersion + 1);
  };

  return {
    fields,
    setFields,
    isEditMode,
    setIsEditMode,
    activeTab,
    setActiveTab,
    showPreview,
    setShowPreview,
    showSettings,
    setShowSettings,
    selectedField,
    setSelectedField,
    updateField,
    removeField,
    addField,
    formVersion,
    setFormVersion,
    templates,
    setTemplates,
    apiConfig,
    setApiConfig,
  };
}
