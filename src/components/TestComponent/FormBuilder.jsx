import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  CalendarIcon,
  Plus,
  Trash,
  GripVertical,
  Settings,
  X,
  Download,
  Upload,
  Save,
} from "lucide-react";
import { format } from "date-fns";

export function FormBuilder({
  fields,
  isEditMode,
  onUpdateFields,
  onUpdateConfig,
  config,
}) {
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [droppableKey, setDroppableKey] = useState(0);

  useEffect(() => {
    setDroppableKey((prev) => prev + 1);
  }, [fields]);

  useEffect(() => {
    const savedTemplates = localStorage.getItem("formTemplates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  const addField = () => {
    if (newFieldName.trim()) {
      const newField = {
        id: `field_${Date.now()}`,
        name: newFieldName.trim(),
        type: newFieldType,
        label: newFieldName.trim(),
        value: "",
        options:
          newFieldType === "select" ||
          newFieldType === "multiselect" ||
          newFieldType === "radio"
            ? ["Option 1", "Option 2"]
            : undefined,
        validation: {
          required: false,
          min: "",
          max: "",
        },
        width: "full",
        columns:
          newFieldType === "table"
            ? [
                { name: "Column 1", customName: "" },
                { name: "Column 2", customName: "" },
              ]
            : [],
        rows: newFieldType === "table" ? [["", ""]] : [],
        size: newFieldType === "card" ? "medium" : undefined,
        fields: newFieldType === "card" ? [] : undefined,
      };
      onUpdateFields([...fields, newField]);
      setNewFieldName("");
      setNewFieldType("text");
    }
  };

  const removeField = (id) => {
    onUpdateFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id, updates) => {
    onUpdateFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    // Extract the actual droppable IDs
    const sourceId = sourceDroppableId.split("-")[0];
    const destinationId = destinationDroppableId.split("-")[0];

    const sourceItems =
      sourceId === "main"
        ? fields
        : fields.find((f) => f.id === sourceId)?.fields || [];
    const destinationItems =
      destinationId === "main"
        ? fields
        : fields.find((f) => f.id === destinationId)?.fields || [];

    const [reorderedItem] = sourceItems.splice(result.source.index, 1);
    destinationItems.splice(result.destination.index, 0, reorderedItem);

    if (sourceId === destinationId) {
      // Reordering within the same list
      if (sourceId === "main") {
        onUpdateFields([...destinationItems]);
      } else {
        onUpdateFields(
          fields.map((field) =>
            field.id === sourceId
              ? { ...field, fields: destinationItems }
              : field
          )
        );
      }
    } else {
      // Moving between different lists
      if (sourceId === "main") {
        onUpdateFields(
          fields
            .filter((f) => f.id !== reorderedItem.id)
            .map((field) =>
              field.id === destinationId
                ? { ...field, fields: destinationItems }
                : field
            )
        );
      } else if (destinationId === "main") {
        onUpdateFields([
          ...fields.map((field) =>
            field.id === sourceId ? { ...field, fields: sourceItems } : field
          ),
          reorderedItem,
        ]);
      } else {
        onUpdateFields(
          fields.map((field) => {
            if (field.id === sourceId) return { ...field, fields: sourceItems };
            if (field.id === destinationId)
              return { ...field, fields: destinationItems };
            return field;
          })
        );
      }
    }
  };

  const openSettings = (field) => {
    setCurrentField(field);
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
    setCurrentField(null);
  };

  const saveSettings = () => {
    if (currentField) {
      updateField(currentField.id, currentField);
    }
    closeSettings();
  };

  const downloadConfig = () => {
    const configData = {
      fields,
      config,
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadConfig = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const configData = JSON.parse(e.target.result);
          onUpdateFields(configData.fields);
          onUpdateConfig(configData.config);
        } catch (error) {
          console.error("Error parsing config file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const saveTemplate = () => {
    const templateName = prompt("Enter a name for this template:");
    if (templateName) {
      const newTemplate = {
        name: templateName,
        fields,
        config,
      };
      const updatedTemplates = [...templates, newTemplate];
      setTemplates(updatedTemplates);
      localStorage.setItem("formTemplates", JSON.stringify(updatedTemplates));
    }
  };

  const loadTemplate = (template) => {
    onUpdateFields(template.fields);
    onUpdateConfig(template.config);
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
      case "email":
        return (
          <Input
            type={field.type}
            id={field.id}
            value={field.value}
            onChange={(e) => updateField(field.id, { value: e.target.value })}
            disabled={!isEditMode}
          />
        );
      case "select":
        return (
          <Select
            value={field.value}
            onValueChange={(value) => updateField(field.id, { value })}
            disabled={!isEditMode}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "multiselect":
        return (
          <Select
            value={field.value ? field.value.split(",") : []}
            onValueChange={(value) =>
              updateField(field.id, { value: value.join(",") })
            }
            disabled={!isEditMode}
            multiple
          >
            <SelectTrigger>
              <SelectValue placeholder="Select options" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <Checkbox
            checked={field.value === "true"}
            onCheckedChange={(checked) =>
              updateField(field.id, { value: checked ? "true" : "false" })
            }
            disabled={!isEditMode}
          />
        );
      case "radio":
        return (
          <RadioGroup
            value={field.value}
            onValueChange={(value) => updateField(field.id, { value })}
            disabled={!isEditMode}
          >
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
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
      case "file":
        return (
          <Input
            type="file"
            id={field.id}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                updateField(field.id, { value: file.name });
              }
            }}
            disabled={!isEditMode}
          />
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
                            const newColumns = field.columns.filter(
                              (_, i) => i !== index
                            );
                            const newRows = field.rows.map((row) =>
                              row.filter((_, i) => i !== index)
                            );
                            updateField(field.id, {
                              columns: newColumns,
                              rows: newRows,
                            });
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
                          const newColumns = [
                            ...field.columns,
                            {
                              name: `Column ${field.columns.length + 1}`,
                              customName: "",
                            },
                          ];
                          const newRows = field.rows.map((row) => [...row, ""]);
                          updateField(field.id, {
                            columns: newColumns,
                            rows: newRows,
                          });
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
                            const newRows = field.rows.filter(
                              (_, index) => index !== rowIndex
                            );
                            updateField(field.id, { rows: newRows });
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
                  const newRow = new Array(field.columns.length).fill("");
                  updateField(field.id, { rows: [...field.rows, newRow] });
                }}
                className="mt-2"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Row
              </Button>
            )}
          </div>
        );
      case "card":
        return (
          <Card className={`w-auto ${getSizeClass(field.size)}`}>

            <CardContent>
              <CardTitle>{field.label}</CardTitle>
              <Droppable
                droppableId={field.id}
                key={`${field.id}-${droppableKey}`}
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {field.fields.map((subField, index) => (
                      <Draggable
                        key={subField.id}
                        draggableId={subField.id}
                        index={index}
                        isDragDisabled={!isEditMode}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-md shadow"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Label
                                htmlFor={subField.id}
                                className="text-sm font-medium"
                              >
                                {subField.label}
                                {subField.validation.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </Label>
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
                                    onClick={() => openSettings(subField)}
                                  >
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeField(subField.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            {renderField(subField)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  const getSizeClass = (size) => {
    switch (size) {
      case "small":
        return "max-w-sm";
      case "medium":
        return "max-w-md";
      case "large":
        return "max-w-lg";
      case "full":
        return "w-full";
      default:
        return "max-w-md";
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-4">
        {isEditMode && (
          <div className="flex justify-between mb-4">
            <div>
              <Button onClick={downloadConfig} className="mr-2">
                <Download className="mr-2 h-4 w-4" /> Download Config
              </Button>
              <Button
                onClick={() => document.getElementById("config-upload").click()}
                className="mr-2"
              >
                <Upload className="mr-2 h-4 w-4" /> Load Config
              </Button>
              <input
                id="config-upload"
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={loadConfig}
              />
              <Button onClick={saveTemplate}>
                <Save className="mr-2 h-4 w-4" /> Save Template
              </Button>
            </div>
            <Button onClick={() => setIsConfigureOpen(true)}>Configure</Button>
          </div>
        )}
        <Droppable droppableId="main" key={`main-${droppableKey}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={field.id}
                  index={index}
                  isDragDisabled={!isEditMode}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-white p-4 rounded-md shadow ${
                        field.type === "table" || field.type === "card"
                          ? "col-span-full"
                          : field.width === "half"
                          ? "col-span-1"
                          : "col-span-full md:col-span-2 lg:col-span-3 xl:col-span-4"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Label
                          htmlFor={field.id}
                          className="text-sm font-medium"
                        >
                          {field.label}
                          {field.validation.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </Label>
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
                              onClick={() => openSettings(field)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeField(field.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      {renderField(field)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {isEditMode && (
          <div className="mt-4 flex items-center space-x-2">
            <Input
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              placeholder="New field name"
              className="flex-grow"
            />
            <Select value={newFieldType} onValueChange={setNewFieldType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Field type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="multiselect">Multi-select</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="radio">Radio</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="file">File Upload</SelectItem>
                <SelectItem value="table">Table</SelectItem>
                <SelectItem value="card">Card</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addField}>
              <Plus className="h-4 w-4 mr-2" /> Add Field
            </Button>
          </div>
        )}
      </div>
      {isSettingsOpen && currentField && (
        <Dialog open={isSettingsOpen} onOpenChange={closeSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Field Settings: {currentField.label}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="label" className="text-right">
                  Label
                </Label>
                <Input
                  id="label"
                  value={currentField.label}
                  onChange={(e) =>
                    setCurrentField({ ...currentField, label: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="required" className="text-right">
                  Required
                </Label>
                <Checkbox
                  id="required"
                  checked={currentField.validation.required}
                  onCheckedChange={(checked) =>
                    setCurrentField({
                      ...currentField,
                      validation: {
                        ...currentField.validation,
                        required: checked,
                      },
                    })
                  }
                />
              </div>
              {currentField.type !== "table" &&
                currentField.type !== "card" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="width" className="text-right">
                      Width
                    </Label>
                    <Select
                      value={currentField.width}
                      onValueChange={(value) =>
                        setCurrentField({ ...currentField, width: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select width" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="half">Half</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              {(currentField.type === "select" ||
                currentField.type === "multiselect" ||
                currentField.type === "radio") && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="options" className="text-right">
                    Options
                  </Label>
                  <Input
                    id="options"
                    value={currentField.options.join(", ")}
                    onChange={(e) =>
                      setCurrentField({
                        ...currentField,
                        options: e.target.value
                          .split(",")
                          .map((option) => option.trim()),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              )}
              {currentField.type === "table" && (
                <div className="grid gap-4">
                  <Label>Column Names</Label>
                  {currentField.columns.map((column, index) => (
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
                          const newColumns = [...currentField.columns];
                          newColumns[index].customName = e.target.value;
                          setCurrentField({
                            ...currentField,
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
              {currentField.type === "card" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="size" className="text-right">
                    Size
                  </Label>
                  <Select
                    value={currentField.size}
                    onValueChange={(value) =>
                      setCurrentField({ ...currentField, size: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="full">Full Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={closeSettings} variant="outline">
                Cancel
              </Button>
              <Button onClick={saveSettings}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={isConfigureOpen} onOpenChange={setIsConfigureOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Form</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiEndpoint" className="text-right">
                API Endpoint
              </Label>
              <Input
                id="apiEndpoint"
                value={config.apiEndpoint}
                onChange={(e) =>
                  onUpdateConfig({ ...config, apiEndpoint: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="submitButtonText" className="text-right">
                Submit Button Text
              </Label>
              <Input
                id="submitButtonText"
                value={config.submitButtonText}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    submitButtonText: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="successMessage" className="text-right">
                Success Message
              </Label>
              <Input
                id="successMessage"
                value={config.successMessage}
                onChange={(e) =>
                  onUpdateConfig({ ...config, successMessage: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="showUpdateButton" className="text-right">
                Show Update Button
              </Label>
              <Checkbox
                id="showUpdateButton"
                checked={config.showUpdateButton}
                onCheckedChange={(checked) =>
                  onUpdateConfig({ ...config, showUpdateButton: checked })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="showDeleteButton" className="text-right">
                Show Delete Button
              </Label>
              <Checkbox
                id="showDeleteButton"
                checked={config.showDeleteButton}
                onCheckedChange={(checked) =>
                  onUpdateConfig({ ...config, showDeleteButton: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsConfigureOpen(false)}>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DragDropContext>
  );
}
