import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TabSidebar } from "./TabSidebar";
import { TabContent } from "./TabContent";
import { TabConfigModal } from "./TabConfigModal";
import { toast, Toaster } from "react-hot-toast";

export default function DynamicRAC() {
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configTabId, setConfigTabId] = useState(null);
  const [config, setConfig] = useState({
    apiEndpoint: "https://example.com/",
    submitButtonText: "Submit",
    successMessage: "Form submitted successfully",
    showUpdateButton: false,
    showDeleteButton: false,
  });

  const onUpdateConfig = (newConfig) => {
    setConfig(newConfig);
  };

  useEffect(() => {
    const savedTabs = localStorage.getItem("dashboardTabs");
    if (savedTabs) {
      const parsedTabs = JSON.parse(savedTabs);
      setTabs(parsedTabs);
      if (parsedTabs.length > 0) {
        setActiveTabId(parsedTabs[0].id);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardTabs", JSON.stringify(tabs));
  }, [tabs]);

  const createTab = (name) => {
    const newTab = {
      id: uuidv4(),
      name,
      fields: [],
      config: {
        apiEndpoint: "",
        submitButtonText: "Submit",
        successMessage: "Form submitted successfully",
      },
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    toast.success(`Tab "${name}" created`);
  };

  const duplicateTab = (tabId) => {
    const tabToDuplicate = tabs.find((tab) => tab.id === tabId);
    if (tabToDuplicate) {
      const newTab = {
        ...tabToDuplicate,
        id: uuidv4(),
        name: `${tabToDuplicate.name} (Copy)`,
      };
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
      toast.success(`Tab "${tabToDuplicate.name}" duplicated`);
    }
  };

  const deleteTab = (tabId) => {
    const tabToDelete = tabs.find((tab) => tab.id === tabId);
    if (tabToDelete) {
      setTabs(tabs.filter((tab) => tab.id !== tabId));
      if (activeTabId === tabId) {
        setActiveTabId(tabs.length > 1 ? tabs[0].id : null);
      }
      toast.success(`Tab "${tabToDelete.name}" deleted`);
    }
  };

  const updateTabConfig = (tabId, config) => {
    setTabs(tabs.map((tab) => (tab.id === tabId ? { ...tab, config } : tab)));
    setIsConfigModalOpen(false);
    toast.success("Tab configuration updated");
  };

  const updateTabFields = (tabId, fields) => {
    setTabs(tabs.map((tab) => (tab.id === tabId ? { ...tab, fields } : tab)));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <TabSidebar
        tabs={tabs}
        activeTabId={activeTabId}
        onCreateTab={createTab}
        onSelectTab={setActiveTabId}
        onDuplicateTab={duplicateTab}
        onDeleteTab={deleteTab}
        onConfigureTab={(tabId) => {
          setConfigTabId(tabId);
          setIsConfigModalOpen(true);
        }}
      />
      <TabContent
        tab={tabs.find((tab) => tab.id === activeTabId)}
        onUpdateFields={(fields) =>
          activeTabId && updateTabFields(activeTabId, fields)
        }
        onUpdateConfig={onUpdateConfig}
        config={config}
      />
      {isConfigModalOpen && configTabId && (
        <TabConfigModal
          tab={tabs.find((tab) => tab.id === configTabId)}
          onClose={() => setIsConfigModalOpen(false)}
          onSave={(config) => updateTabConfig(configTabId, config)}
          config={config}
          setConfig={setConfig}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
}
