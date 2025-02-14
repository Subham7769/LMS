import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Settings, Copy, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TabSidebar = ({
  tabs,
  activeTabId,
  onCreateTab,
  onSelectTab,
  onDuplicateTab,
  onDeleteTab,
  onConfigureTab,
}) => {
  const [newTabName, setNewTabName] = useState("");

  const handleCreateTab = () => {
    if (newTabName.trim()) {
      onCreateTab(newTabName.trim());
      setNewTabName("");
    }
  };

  return (
    <div className="w-64 bg-white shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Tabs</h2>
      <div className="flex mb-4">
        <Input
          value={newTabName}
          onChange={(e) => setNewTabName(e.target.value)}
          placeholder="New tab name"
          className="mr-2"
        />
        <Button onClick={handleCreateTab}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <AnimatePresence>
        {tabs.map((tab) => (
          <motion.li
            key={tab.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center justify-between p-2 rounded mb-2 ${
              tab.id === activeTabId
                ? "bg-blue-100"
                : "hover:bg-background-light-secondary"
            }`}
          >
            <span
              className="flex-grow cursor-pointer"
              onClick={() => onSelectTab(tab.id)}
            >
              {tab.name}
            </span>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onConfigureTab(tab.id)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDuplicateTab(tab.id)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteTab(tab.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </div>
  );
};
