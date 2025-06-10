import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Toast } from "./ui/toast";
import { Toaster } from "./ui/toaster";
import { useToast } from "./hooks/use-toast";
import { format } from "date-fns";
import {
  CalendarIcon,
  GripVertical,
  Plus,
  Settings,
  X,
  Upload,
  Eye,
  Save,
  Download,
  FileDown,
  FileText,
  Copy,
} from "lucide-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function CRUDForm() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [fields, setFields] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState(["personalInfo"]);
  const [activeTab, setActiveTab] = useState("form");
  const [showSettings, setShowSettings] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formVersion, setFormVersion] = useState(1);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  // New state for API configuration
  const [apiConfig, setApiConfig] = useState({
    getUrl: "",
    postUrl: "",
    putUrl: "",
    deleteUrl: "",
  });

  useEffect(() => {
    const savedFields = localStorage.getItem("formFields");
    const savedVersion = localStorage.getItem("formVersion");
    const savedTemplates = localStorage.getItem("formTemplates");
    const savedApiConfig = localStorage.getItem("apiConfig");
    if (savedFields) {
      setFields(JSON.parse(savedFields));
    }
    if (savedVersion) {
      setFormVersion(parseInt(savedVersion));
    }
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
    if (savedApiConfig && typeof savedApiConfig === "string") {
      try {
        setApiConfig(JSON.parse(savedApiConfig));
      } catch (error) {
        console.error("Failed to parse savedApiConfig:", error);
        // Handle error, e.g., set default config or leave apiConfig unchanged
      }
    }
    // Fetch data when component mounts
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("formFields", JSON.stringify(fields));
    localStorage.setItem("formVersion", formVersion.toString());
    localStorage.setItem("formTemplates", JSON.stringify(templates));
    localStorage.setItem("apiConfig", JSON.stringify(apiConfig));
  }, [fields, formVersion, templates, apiConfig]);

  const fetchData = async () => {
    if (apiConfig.getUrl) {
      try {
        const response = await fetch(apiConfig.getUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Assuming the API returns an array of field objects
        setFields(data);
        toast({
          title: "Data Fetched",
          description: "Form data has been loaded from the API.",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch data from the API.",
          variant: "destructive",
        });
      }
    }
  };

  const createData = async (formData) => {
    if (apiConfig.postUrl) {
      try {
        const response = await fetch(apiConfig.postUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to create data");
        }
        const data = await response.json();
        toast({
          title: "Data Created",
          description: "New form data has been created.",
        });
        return data;
      } catch (error) {
        console.error("Error creating data:", error);
        toast({
          title: "Error",
          description: "Failed to create new data.",
          variant: "destructive",
        });
      }
    }
  };

  const updateData = async (formData) => {
    if (apiConfig.putUrl) {
      try {
        const response = await fetch(apiConfig.putUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to update data");
        }
        const data = await response.json();
        toast({
          title: "Data Updated",
          description: "Form data has been updated.",
        });
        return data;
      } catch (error) {
        console.error("Error updating data:", error);
        toast({
          title: "Error",
          description: "Failed to update data.",
          variant: "destructive",
        });
      }
    }
  };

  const deleteData = async (id) => {
    if (apiConfig.deleteUrl) {
      try {
        const response = await fetch(`${apiConfig.deleteUrl}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete data");
        }
        toast({
          title: "Data Deleted",
          description: "Form data has been deleted.",
        });
      } catch (error) {
        console.error("Error deleting data:", error);
        toast({
          title: "Error",
          description: "Failed to delete data.",
          variant: "destructive",
        });
      }
    }
  };

  const addField = (type) => {
    const newField = {
      id: `field_${fields.length + 1}`,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      value: type === "multiselect" ? [] : "",
      group: "Manage Form",
      validation: {
        required: false,
        pattern: "",
        minLength: "",
        maxLength: "",
        min: "",
        max: "",
      },
      error: "",
      apiConfig: {
        endpoint: "",
        method: "GET",
      },
      conditional: {
        dependsOn: "",
        logic: "AND",
        conditions: [],
      },
    };
    if (type === "table") {
      newField.columns = [
        { name: "Column 1", customName: "" },
        { name: "Column 2", customName: "" },
      ];
      newField.rows = [["", ""]];
    }
    if (type === "multiselect" || type === "select") {
      newField.options = ["Option 1", "Option 2"];
    }
    setFields([...fields, newField]);
    setFormVersion((prevVersion) => prevVersion + 1);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
    setFormVersion((prevVersion) => prevVersion + 1);
  };

  const updateField = (id, updates) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
    setFormVersion((prevVersion) => prevVersion + 1);
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
    } else if (
      validation.min &&
      parseFloat(value) < parseFloat(validation.min)
    ) {
      error = `Minimum value is ${validation.min}`;
    } else if (
      validation.max &&
      parseFloat(value) > parseFloat(validation.max)
    ) {
      error = `Maximum value is ${validation.max}`;
    }

    return error;
  };

  const validateForm = () => {
    let isValid = true;
    const updatedFields = fields.map((field) => {
      const error = validateField(field);
      if (error) {
        isValid = false;
      }
      return { ...field, error };
    });
    setFields(updatedFields);
    return isValid;
  };

  const generateFormula = () => {
    return fields
      .map((field, index) => {
        let formula = `${index}:${field.id}:${field.type}`;
        if (field.validation.required) formula += ":required";
        if (field.apiConfig.endpoint) formula += ":api";
        if (field.conditional.dependsOn) formula += ":conditional";
        return formula;
      })
      .join("|");
  };

  const groupedFields = fields.reduce((acc, field) => {
    const group = field.group || "Manage Form";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(field);
    return acc;
  }, {});

  const isFieldVisible = (field) => {
    if (!field.conditional.dependsOn) return true;
    const dependentField = fields.find(
      (f) => f.id === field.conditional.dependsOn
    );
    if (!dependentField) return true;

    const evaluateCondition = (condition, fieldValue, conditionValue) => {
      switch (condition) {
        case "equals":
          return fieldValue === conditionValue;
        case "notEquals":
          return fieldValue !== conditionValue;
        case "greaterThan":
          return parseFloat(fieldValue) > parseFloat(conditionValue);
        case "lessThan":
          return parseFloat(fieldValue) < parseFloat(conditionValue);
        case "contains":
          return fieldValue.includes(conditionValue);
        default:
          return true;
      }
    };

    if (field.conditional.logic === "AND") {
      return field.conditional.conditions.every((cond) =>
        evaluateCondition(cond.condition, dependentField.value, cond.value)
      );
    } else {
      // OR logic
      return field.conditional.conditions.some((cond) =>
        evaluateCondition(cond.condition, dependentField.value, cond.value)
      );
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceGroup = result.source.droppableId;
    const destGroup = result.destination.droppableId;

    const newFields = Array.from(fields);
    const [reorderedField] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, reorderedField);

    if (sourceGroup !== destGroup) {
      reorderedField.group = destGroup;
    }

    setFields(newFields);
    setFormVersion((prevVersion) => prevVersion + 1);
  };

  const handleFileUpload = (fieldId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateField(fieldId, { value: e.target.result, fileName: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const addTableRow = (fieldId) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.type === "table") {
      const newRows = [...field.rows, Array(field.columns.length).fill("")];
      updateField(fieldId, { rows: newRows });
    }
  };

  const removeTableRow = (fieldId, rowIndex) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.type === "table" && field.rows.length > 1) {
      const newRows = field.rows.filter((_, index) => index !== rowIndex);
      updateField(fieldId, { rows: newRows });
    }
  };

  const addTableColumn = (fieldId) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.type === "table") {
      const newColumns = [
        ...field.columns,
        { name: `Column ${field.columns.length + 1}`, customName: "" },
      ];
      const newRows = field.rows.map((row) => [...row, ""]);
      updateField(fieldId, { columns: newColumns, rows: newRows });
    }
  };

  const removeTableColumn = (fieldId, columnIndex) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.type === "table" && field.columns.length > 1) {
      const newColumns = field.columns.filter(
        (_, index) => index !== columnIndex
      );
      const newRows = field.rows.map((row) =>
        row.filter((_, index) => index !== columnIndex)
      );
      updateField(fieldId, { columns: newColumns, rows: newRows });
    }
  };

  const saveFormConfiguration = () => {
    const configuration = JSON.stringify({
      fields,
      version: formVersion,
      apiConfig,
    });
    const blob = new Blob([configuration], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `form-configuration-v${formVersion}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Configuration Saved",
      description: `Form configuration v${formVersion} has been saved.`,
    });
  };

  const loadFormConfiguration = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const {
            fields: loadedFields,
            version,
            apiConfig: loadedApiConfig,
          } = JSON.parse(e.target.result);
          setFields(loadedFields);
          setFormVersion(version);
          setApiConfig(loadedApiConfig);
          toast({
            title: "Configuration Loaded",
            description: `Form configuration v${version} has been loaded.`,
          });
        } catch (error) {
          console.error("Error parsing form configuration:", error);
          toast({
            title: "Error",
            description: "Failed to load form configuration.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const exportFormSubmissions = () => {
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

  const generatePDFReport = () => {
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

  const saveAsTemplate = () => {
    const templateName = prompt("Enter a name for this template:");
    if (templateName) {
      const newTemplate = {
        name: templateName,
        fields,
        version: formVersion,
        apiConfig,
      };
      setTemplates([...templates, newTemplate]);
      toast({
        title: "Template Saved",
        description: `Template "${templateName}" has been saved.`,
      });
    }
  };

  const loadTemplate = (template) => {
    setFields(template.fields);
    setFormVersion(template.version);
    setApiConfig(template.apiConfig);
    setSelectedTemplate(null);
    toast({
      title: "Template Loaded",
      description: `Template "${template.name}" has been loaded.`,
    });
  };

  const renderField = (field) => {
    if (!isFieldVisible(field)) return null;

    const commonProps = {
      id: field.id,
      disabled: !isEditMode,
      className: `w-full ${field.error ? "border-red-500" : ""}`,
    };

    switch (field.type) {
      case "select":
        return (
          <Select
            {...commonProps}
            value={field.value}
            onValueChange={(value) => updateField(field.id, { value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "multiselect":
        return (
          <Select
            {...commonProps}
            value={field.value}
            onValueChange={(value) => {
              const newValue = field.value.includes(value)
                ? field.value.filter((v) => v !== value)
                : [...field.value, value];
              updateField(field.id, { value: newValue });
            }}
            multiple
          >
            <SelectTrigger>
              <SelectValue placeholder="Select options" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <Checkbox
            {...commonProps}
            checked={field.value === "true"}
            onCheckedChange={(checked) =>
              updateField(field.id, { value: checked ? "true" : "false" })
            }
          />
        );
      case "textarea":
        return (
          <Textarea
            {...commonProps}
            value={field.value}
            onChange={(e) => updateField(field.id, { value: e.target.value })}
          />
        );
      case "slider":
        return (
          <Slider
            {...commonProps}
            min={field.validation.min ? parseInt(field.validation.min) : 0}
            max={field.validation.max ? parseInt(field.validation.max) : 100}
            step={1}
            value={[parseInt(field.value) || 0]}
            onValueChange={([value]) =>
              updateField(field.id, { value: value.toString() })
            }
          />
        );
      case "radio":
        return (
          <RadioGroup
            {...commonProps}
            value={field.value}
            onValueChange={(value) => updateField(field.id, { value })}
          >
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "file":
        return (
          <div>
            <Input
              {...commonProps}
              type="file"
              onChange={(e) => handleFileUpload(field.id, e)}
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              onClick={() => fileInputRef.current.click()}
              disabled={!isEditMode}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload File
            </Button>
            {field.fileName && <p className="mt-2 text-sm">{field.fileName}</p>}
          </div>
        );
      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${
                  !field.value && "text-muted-foreground"
                }`}
                disabled={!isEditMode}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(new Date(field.value), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) =>
                  updateField(field.id, {
                    value: date ? date.toISOString() : "",
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      case "table":
        return (
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  {field.columns.map((column, index) => (
                    <TableHead key={index}>
                      {column.customName || column.name}
                      {isEditMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            removeTableColumn(field.id, index);
                          }}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </TableHead>
                  ))}
                  {isEditMode && (
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          addTableColumn(field.id);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {field.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Input
                          value={cell}
                          onChange={(e) => {
                            const newRows = [...field.rows];
                            newRows[rowIndex][cellIndex] = e.target.value;
                            updateField(field.id, { rows: newRows });
                          }}
                          disabled={!isEditMode}
                        />
                      </TableCell>
                    ))}
                    {isEditMode && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            removeTableRow(field.id, rowIndex);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {isEditMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  addTableRow(field.id);
                }}
                className="mt-2"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Row
              </Button>
            )}
          </div>
        );
      default:
        return (
          <Input
            {...commonProps}
            type={field.type}
            value={field.value}
            onChange={(e) => updateField(field.id, { value: e.target.value })}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      <header className="bg-white shadow-md rounded-b-lg">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">
            Advanced Form Builder with CRUD
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-mode"
                checked={isEditMode}
                onCheckedChange={setIsEditMode}
              />
              <Label
                htmlFor="edit-mode"
                className="text-sm font-medium text-gray-700"
              >
                Edit Mode
              </Label>
            </div>
            {isEditMode && (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="form">Form</TabsTrigger>
                  <TabsTrigger value="toolbox">Toolbox</TabsTrigger>
                  <TabsTrigger value="api">API Config</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
            <Button
              onClick={() => setShowPreview(true)}
              variant="outline"
              size="sm"
            >
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Button>
            <Button onClick={saveFormConfiguration} variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" /> Save Config
            </Button>
            <div>
              <Input
                type="file"
                onChange={loadFormConfiguration}
                className="hidden"
                id="load-config"
              />
              <Button
                onClick={() => document.getElementById("load-config").click()}
                variant="outline"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" /> Load Config
              </Button>
            </div>
            <Button onClick={exportFormSubmissions} variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" /> Export JSON
            </Button>
            <Button onClick={generatePDFReport} variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" /> Generate PDF
            </Button>
            <Button onClick={saveAsTemplate} variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" /> Save as Template
            </Button>
            <Select onValueChange={(value) => loadTemplate(JSON.parse(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Load Template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template, index) => (
                  <SelectItem key={index} value={JSON.stringify(template)}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-6">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle>Form Builder</CardTitle>
            <CardDescription>Version: {formVersion}</CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === "form" ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <form className="space-y-6">
                  <Accordion
                    type="multiple"
                    value={expandedGroups}
                    onValueChange={setExpandedGroups}
                  >
                    {Object.entries(groupedFields).map(
                      ([group, groupFields]) => (
                        <AccordionItem key={group} value={group}>
                          <AccordionTrigger>
                            {group.charAt(0).toUpperCase() + group.slice(1)}
                          </AccordionTrigger>
                          <AccordionContent>
                            <Droppable droppableId={group}>
                              {(provided) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                                >
                                  {groupFields.map((field, index) => (
                                    <Draggable
                                      key={field.id}
                                      draggableId={field.id}
                                      index={index}
                                      isDragDisabled={!isEditMode}
                                    >
                                      {(provided) => (
                                        <Card
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          className={`bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ${
                                            field.type === "table"
                                              ? "col-span-full"
                                              : ""
                                          }`}
                                        >
                                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                              {field.label}
                                              {field.validation.required && "*"}
                                            </CardTitle>
                                            {isEditMode && (
                                              <div className="flex items-center space-x-2">
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  {...provided.dragHandleProps}
                                                >
                                                  <GripVertical className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedField(field);
                                                    setShowSettings(true);
                                                  }}
                                                >
                                                  <Settings className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    removeField(field.id);
                                                  }}
                                                >
                                                  <X className="h-4 w-4" />
                                                </Button>
                                              </div>
                                            )}
                                          </CardHeader>
                                          <CardContent>
                                            {renderField(field)}
                                            {field.error && (
                                              <p className="text-red-500 text-xs mt-1">
                                                {field.error}
                                              </p>
                                            )}
                                          </CardContent>
                                        </Card>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </form>
              </DragDropContext>
            ) : activeTab === "toolbox" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  "text",
                  "number",
                  "date",
                  "select",
                  "multiselect",
                  "checkbox",
                  "textarea",
                  "slider",
                  "radio",
                  "table",
                  "file",
                ].map((type) => (
                  <Button
                    key={type}
                    onClick={() => addField(type)}
                    className="h-24 bg-white hover:bg-gray-50 text-gray-800 font-semibold border border-gray-300 rounded-lg shadow"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add {type}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="getUrl">GET URL</Label>
                  <Input
                    id="getUrl"
                    value={apiConfig.getUrl}
                    onChange={(e) =>
                      setApiConfig({ ...apiConfig, getUrl: e.target.value })
                    }
                    placeholder="https://api.example.com/data"
                  />
                </div>
                <div>
                  <Label htmlFor="postUrl">POST URL</Label>
                  <Input
                    id="postUrl"
                    value={apiConfig.postUrl}
                    onChange={(e) =>
                      setApiConfig({ ...apiConfig, postUrl: e.target.value })
                    }
                    placeholder="https://api.example.com/data"
                  />
                </div>
                <div>
                  <Label htmlFor="putUrl">PUT URL</Label>
                  <Input
                    id="putUrl"
                    value={apiConfig.putUrl}
                    onChange={(e) =>
                      setApiConfig({ ...apiConfig, putUrl: e.target.value })
                    }
                    placeholder="https://api.example.com/data/{id}"
                  />
                </div>
                <div>
                  <Label htmlFor="deleteUrl">DELETE URL</Label>
                  <Input
                    id="deleteUrl"
                    value={apiConfig.deleteUrl}
                    onChange={(e) =>
                      setApiConfig({ ...apiConfig, deleteUrl: e.target.value })
                    }
                    placeholder="https://api.example.com/data/{id}"
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gray-50">
            <Button
              onClick={async () => {
                if (validateForm()) {
                  const formData = fields.reduce((acc, field) => {
                    acc[field.id] = field.value;
                    return acc;
                  }, {});

                  if (isEditMode) {
                    // Update existing data
                    const updatedData = await updateData(formData);
                    if (updatedData) {
                      setFields(
                        fields.map((field) => ({
                          ...field,
                          value: updatedData[field.id] || field.value,
                        }))
                      );
                      toast({
                        title: "Form Updated",
                        description: "Your form has been successfully updated.",
                      });
                    }
                  } else {
                    // Create new data
                    const createdData = await createData(formData);
                    if (createdData) {
                      setFields(
                        fields.map((field) => ({
                          ...field,
                          value: createdData[field.id] || field.value,
                        }))
                      );
                      toast({
                        title: "Form Submitted",
                        description:
                          "Your form has been successfully submitted.",
                      });
                    }
                  }
                } else {
                  toast({
                    title: "Validation Error",
                    description:
                      "Please check the form for errors and try again.",
                    variant: "destructive",
                  });
                }
              }}
              className="w-full"
            >
              {isEditMode ? "Save Changes" : "Submit Form"}
            </Button>
          </CardFooter>
        </Card>
      </main>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Field Settings</DialogTitle>
            <DialogDescription>Customize the selected field</DialogDescription>
          </DialogHeader>
          {selectedField && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="label" className="text-right">
                  Label
                </Label>
                <Input
                  id="label"
                  value={selectedField.label}
                  onChange={(e) =>
                    setSelectedField({
                      ...selectedField,
                      label: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={selectedField.type}
                  onValueChange={(value) =>
                    setSelectedField({ ...selectedField, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                    <SelectItem value="multiselect">Multi-select</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                    <SelectItem value="textarea">Textarea</SelectItem>
                    <SelectItem value="slider">Slider</SelectItem>
                    <SelectItem value="radio">Radio</SelectItem>
                    <SelectItem value="table">Table</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="required" className="text-right">
                  Required
                </Label>
                <Switch
                  id="required"
                  checked={selectedField.validation.required}
                  onCheckedChange={(checked) =>
                    setSelectedField({
                      ...selectedField,
                      validation: {
                        ...selectedField.validation,
                        required: checked,
                      },
                    })
                  }
                />
              </div>
              {(selectedField.type === "select" ||
                selectedField.type === "multiselect" ||
                selectedField.type === "radio") && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="options" className="text-right">
                    Options
                  </Label>
                  <Textarea
                    id="options"
                    value={selectedField.options?.join("\n")}
                    onChange={(e) =>
                      setSelectedField({
                        ...selectedField,
                        options: e.target.value
                          .split("\n")
                          .filter((option) => option.trim() !== ""),
                      })
                    }
                    className="col-span-3"
                    placeholder="Enter options (one per line)"
                  />
                </div>
              )}
              {selectedField.type === "number" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="min" className="text-right">
                      Min
                    </Label>
                    <Input
                      id="min"
                      type="number"
                      value={selectedField.validation.min}
                      onChange={(e) =>
                        setSelectedField({
                          ...selectedField,
                          validation: {
                            ...selectedField.validation,
                            min: e.target.value,
                          },
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="max" className="text-right">
                      Max
                    </Label>
                    <Input
                      id="max"
                      type="number"
                      value={selectedField.validation.max}
                      onChange={(e) =>
                        setSelectedField({
                          ...selectedField,
                          validation: {
                            ...selectedField.validation,
                            max: e.target.value,
                          },
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
              {selectedField.type === "text" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="minLength" className="text-right">
                      Min Length
                    </Label>
                    <Input
                      id="minLength"
                      type="number"
                      value={selectedField.validation.minLength}
                      onChange={(e) =>
                        setSelectedField({
                          ...selectedField,
                          validation: {
                            ...selectedField.validation,
                            minLength: e.target.value,
                          },
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maxLength" className="text-right">
                      Max Length
                    </Label>
                    <Input
                      id="maxLength"
                      type="number"
                      value={selectedField.validation.maxLength}
                      onChange={(e) =>
                        setSelectedField({
                          ...selectedField,
                          validation: {
                            ...selectedField.validation,
                            maxLength: e.target.value,
                          },
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pattern" className="text-right">
                      Pattern
                    </Label>
                    <Input
                      id="pattern"
                      value={selectedField.validation.pattern}
                      onChange={(e) =>
                        setSelectedField({
                          ...selectedField,
                          validation: {
                            ...selectedField.validation,
                            pattern: e.target.value,
                          },
                        })
                      }
                      className="col-span-3"
                      placeholder="Regular expression"
                    />
                  </div>
                </>
              )}
              {selectedField && selectedField.type === "table" && (
                <div className="grid gap-4 py-4">
                  <Label className="text-lg font-semibold">Column Names</Label>
                  {selectedField.columns.map((column, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 items-center gap-4"
                    >
                      <Label htmlFor={`column-${index}`} className="text-right">
                        {column.name}
                      </Label>
                      <Input
                        id={`column-${index}`}
                        value={column.customName}
                        onChange={(e) => {
                          const newColumns = [...selectedField.columns];
                          newColumns[index].customName = e.target.value;
                          setSelectedField({
                            ...selectedField,
                            columns: newColumns,
                          });
                        }}
                        className="col-span-3"
                        placeholder={`Custom name for ${column.name}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => {
                if (selectedField) {
                  updateField(selectedField.id, selectedField);
                }
                setShowSettings(false);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="w-4/5">
          <DialogHeader>
            <DialogTitle>Form Preview</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            <form className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>
                    {field.label}
                    {field.validation.required && "*"}
                  </Label>
                  {renderField({ ...field, value: "" })}
                </div>
              ))}
            </form>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
