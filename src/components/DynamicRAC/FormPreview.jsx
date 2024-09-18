import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { CalendarIcon, Trash } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

export function FormPreview({ fields, config }) {
  const [formData, setFormData] = useState({});

  const updateField = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const missingFields = fields
      .flatMap((field) => (field.type === "card" ? field.fields : [field]))
      .filter((field) => field.validation.required && !formData[field.id])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    // Submit the form
    if (config.apiEndpoint) {
      try {
        const response = await fetch(config.apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success(config.successMessage);
          setFormData({});
        } else {
          toast.error("An error occurred while submitting the form");
        }
      } catch (error) {
        toast.error("An error occurred while submitting the form");
      }
    } else {
      toast.success(config.successMessage);
      console.log("Form data:", formData);
      setFormData({});
    }
  };

  const handleUpdate = async () => {
    if (config.apiEndpoint) {
      try {
        const response = await fetch(`${config.apiEndpoint}/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Record updated successfully");
        } else {
          toast.error("An error occurred while updating the record");
        }
      } catch (error) {
        toast.error("An error occurred while updating the record");
      }
    } else {
      console.log("Update data:", formData);
      toast.success("Record updated successfully");
    }
  };

  const handleDelete = async () => {
    if (config.apiEndpoint) {
      try {
        const response = await fetch(`${config.apiEndpoint}/${formData.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Record deleted successfully");
          setFormData({});
        } else {
          toast.error("An error occurred while deleting the record");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the record");
      }
    } else {
      console.log("Delete record:", formData.id);
      toast.success("Record deleted successfully");
      setFormData({});
    }
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
            value={formData[field.id] || ""}
            onChange={(e) => updateField(field.id, e.target.value)}
          />
        );
      case "select":
        return (
          <Select
            value={formData[field.id] || ""}
            onValueChange={(value) => updateField(field.id, value)}
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
            value={formData[field.id] ? formData[field.id].split(",") : []}
            onValueChange={(value) => updateField(field.id, value.join(","))}
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
            checked={formData[field.id] === "true"}
            onCheckedChange={(checked) =>
              updateField(field.id, checked ? "true" : "false")
            }
          />
        );
      case "radio":
        return (
          <RadioGroup
            value={formData[field.id] || ""}
            onValueChange={(value) => updateField(field.id, value)}
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
                  !formData[field.id] && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData[field.id] ? (
                  format(new Date(formData[field.id]), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  formData[field.id] ? new Date(formData[field.id]) : undefined
                }
                onSelect={(date) =>
                  updateField(field.id, date ? date.toISOString() : "")
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
                updateField(field.id, file.name);
              }
            }}
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
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {field.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      case "card":
        return (
          <Card className={`w-full ${getSizeClass(field.size)}`}>
            <CardHeader>
              <CardTitle>{field.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {field.fields.map((subField) => (
                  <div key={subField.id} className="space-y-2">
                    <Label htmlFor={subField.id}>
                      {subField.label}
                      {subField.validation.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>
                    {renderField(subField)}
                  </div>
                ))}
              </div>
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {fields.map((field) => (
          <div
            key={field.id}
            className={`space-y-2 ${
              field.type === "table" || field.type === "card"
                ? "col-span-full"
                : field.width === "half"
                ? "col-span-1"
                : "col-span-full md:col-span-2 lg:col-span-3 xl:col-span-4"
            }`}
          >
            {field.type !== "card" && (
              <Label htmlFor={field.id}>
                {field.label}
                {field.validation.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </Label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Button type="submit" variant="secondary">
          {config.submitButtonText}
        </Button>
        {config.showUpdateButton && (
          <Button type="button" onClick={handleUpdate} variant="outline">
            Update
          </Button>
        )}
        {config.showDeleteButton && (
          <Button type="button" onClick={handleDelete} variant="destructive">
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
