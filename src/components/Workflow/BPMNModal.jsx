import React, { useEffect, useState } from "react";
import BpmnDiagram from "./BPMNViewer";

const BPMNModal = ({ isOpen, onClose, processDefinitionId, processInstanceId }) => {
  const [xml, setXml] = useState("");
  const [activeIds, setActiveIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !processDefinitionId) return;

    const fetchBpmnAndActiveIds = async () => {
      setLoading(true);
      try {
        // Step 1: Fetch BPMN XML
        const res = await fetch(
          `${import.meta.env.VITE_CAMUNDA_API_BASE}/api/process/${processDefinitionId}/process-definition-bpmn`
        );
        if (!res.ok) throw new Error("Failed to fetch BPMN XML");
        const xml = await res.text();
        setXml(xml);

        // Step 2: If instanceId is present, fetch active tasks
        if (processInstanceId) {
          const activeRes = await fetch(
            `${import.meta.env.VITE_CAMUNDA_API_BASE}/api/process/instance/${processInstanceId}/active-task-ids`
          );
          if (!activeRes.ok) throw new Error("Failed to fetch active task IDs");
          const activeData = await activeRes.json(); // expecting: { activeIds: ["Activity_1", "Activity_2"] }
          console.log(activeData)
          setActiveIds(activeData.activeIds || []);
        } else {
          setActiveIds([]);
        }
      } catch (error) {
        console.error("Error loading diagram or active IDs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBpmnAndActiveIds();
  }, [isOpen, processDefinitionId, processInstanceId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[90%] max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Process Diagram</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-xl"
          >
            &times;
          </button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading diagram...</p>
          ) : (
            <BpmnDiagram xml={xml} activeIds={activeIds} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BPMNModal;
