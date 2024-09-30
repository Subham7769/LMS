import { useState } from "react";
import { Button } from "./ui/button";
import { FormBuilder } from "./FormBuilder";
import { FormPreview } from "./FormPreview";
import { Eye, Edit } from "lucide-react";

export function TabContent({ tab, onUpdateFields, onUpdateConfig, config }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  if (!tab) {
    return (
      <div className="flex-grow p-8 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">
          Select a tab or create a new one to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex-grow p-8 bg-gray-50">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{tab.name}</h2>
        <div className="space-x-2">
          <Button
            variant={isEditMode ? "secondary" : "default"}
            onClick={() => {
              setIsEditMode(!isEditMode);
              setIsPreviewMode(false);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditMode ? "View Mode" : "Edit Mode"}
          </Button>
          <Button
            variant={isPreviewMode ? "secondary" : "default"}
            onClick={() => {
              setIsPreviewMode(!isPreviewMode);
              setIsEditMode(false);
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreviewMode ? "Exit Preview" : "Preview"}
          </Button>
        </div>
      </div>
      {isPreviewMode ? (
        <FormPreview fields={tab.fields} config={tab.config} />
      ) : (
        <FormBuilder
          fields={tab.fields}
          isEditMode={isEditMode}
          onUpdateFields={onUpdateFields}
          onUpdateConfig={onUpdateConfig}
          config={config}
        />
      )}
    </div>
  );
}
