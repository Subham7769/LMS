import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Checkbox } from "./ui/checkbox"; // Assuming you have a checkbox component

export function TabConfigModal({ tab, onClose, onSave, config, setConfig }) {

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Tab: {tab.name}</DialogTitle>
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
                setConfig({ ...config, apiEndpoint: e.target.value })
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
                setConfig({ ...config, submitButtonText: e.target.value })
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
                setConfig({ ...config, successMessage: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="showUpdateButton" className="text-right">
              Show Update Button
            </Label>
            <Checkbox
              checked={config.showUpdateButton === "true"}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  showUpdateButton: checked ? "true" : "false",
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="showDeleteButton" className="text-right">
              Show Delete Button
            </Label>
            <Checkbox
              checked={config.showDeleteButton === "true"}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  showDeleteButton: checked ? "true" : "false",
                })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
