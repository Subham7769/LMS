import { useState } from "react";
import { FormBuilder } from "./FormBuilder";
import { FormPreview } from "./FormPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function FormManager() {
  const [fields, setFields] = useState([]);
  const [config, setConfig] = useState({
    apiEndpoint: "",
    submitButtonText: "Submit",
    successMessage: "Form submitted successfully",
    showUpdateButton: false,
    showDeleteButton: false,
  });
  const [isEditMode, setIsEditMode] = useState(true);

  const onUpdateFields = (newFields) => {
    setFields(newFields);
  };

  const onUpdateConfig = (newConfig) => {
    setConfig(newConfig);
  };

  return (
    <Tabs defaultValue="edit" className="w-full">
      <TabsList>
        <TabsTrigger value="edit" onClick={() => setIsEditMode(true)}>
          Edit
        </TabsTrigger>
        <TabsTrigger value="preview" onClick={() => setIsEditMode(false)}>
          Preview
        </TabsTrigger>
      </TabsList>
      <TabsContent value="edit">
        <FormBuilder
          fields={fields}
          config={config}
          isEditMode={isEditMode}
          onUpdateFields={onUpdateFields}
          onUpdateConfig={onUpdateConfig}
        />
      </TabsContent>
      <TabsContent value="preview">
        <FormPreview fields={fields} config={config} />
      </TabsContent>
    </Tabs>
  );
}
