import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from "./ui/use-toast";

export const validateForm = (fields) => {
  let isValid = true;
  const updatedFields = fields.map((field) => {
    const error = validateField(field);
    if (error) {
      isValid = false;
    }
    return { ...field, error };
  });
  return { isValid, updatedFields };
};

const validateField = (field) => {
  const { validation, value } = field;
  let error = "";

  if (validation.required && !value) {
    error = "This field is required";
  } else if (
    validation.pattern &&
    !new RegExp(validation.pattern).test(value)
  ) {
    error = "Invalid format";
  } else if (
    validation.minLength &&
    value.length < parseInt(validation.minLength)
  ) {
    error = `Minimum length is ${validation.minLength}`;
  } else if (
    validation.maxLength &&
    value.length > parseInt(validation.maxLength)
  ) {
    error = `Maximum length is ${validation.maxLength}`;
  } else if (validation.min && parseFloat(value) < parseFloat(validation.min)) {
    error = `Minimum value is ${validation.min}`;
  } else if (validation.max && parseFloat(value) > parseFloat(validation.max)) {
    error = `Maximum value is ${validation.max}`;
  }

  return error;
};

export const exportFormSubmissions = (fields) => {
  const submissions = fields.map((field) => ({
    id: field.id,
    label: field.label,
    value: field.value,
  }));
  const submissionsJson = JSON.stringify(submissions, null, 2);
  const blob = new Blob([submissionsJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "form-submissions.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast({
    title: "Submissions Exported",
    description: "Form submissions have been exported as JSON.",
  });
};

export const generatePDFReport = (fields) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Form Submissions Report", 14, 22);
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  const tableData = fields.map((field) => [field.label, field.value]);
  doc.autoTable({
    startY: 40,
    head: [["Field", "Value"]],
    body: tableData,
  });

  doc.save("form-submissions-report.pdf");
  toast({
    title: "PDF Report Generated",
    description: "Form submissions report has been generated as PDF.",
  });
};

export const saveAsTemplate = (fields, formVersion, apiConfig, templates) => {
  const templateName = prompt("Enter a name for this template:");
  if (templateName) {
    const newTemplate = {
      name: templateName,
      fields,
      version: formVersion,
      apiConfig,
    };
    const updatedTemplates = [...templates, newTemplate];
    toast({
      title: "Template Saved",
      description: `Template "${templateName}" has been saved.`,
    });
    return updatedTemplates;
  }
  return templates;
};

export const loadTemplate = (
  template,
  setFields,
  setFormVersion,
  setApiConfig
) => {
  setFields(template.fields);
  setFormVersion(template.version);
  setApiConfig(template.apiConfig);
  toast({
    title: "Template Loaded",
    description: `Template "${template.name}" has been loaded.`,
  });
};
