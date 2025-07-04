import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import ListTableClassic from "../Common/ListTable/ListTableClassic";
import BPMNModal from "./BPMNModal";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false); // Wait modal toggle

  const [showBPMNModal, setShowBPMNModal] = useState(false);
  const [selectedProcessDefId, setSelectedProcessDefId] = useState(null);
  const [selectedProcessInstanceId, setSelectedProcessInstanceId] = useState(null);

  const handleShowBPMNModal = (processDefId, processInstanceId) => {
    //console.log(rowIndex);
    //const rowData = workflowList[rowIndex];
    setSelectedProcessDefId(processDefId); // rowData contains the workflow info
    setSelectedProcessInstanceId(processInstanceId);
    setShowBPMNModal(true);
  };
  const closeBPMNModal = () => {
    setShowBPMNModal(false);
    setSelectedProcessDefId(null);
  };
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_CAMUNDA_API_BASE}/api/process/running`
      );
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Mark Individual task as complete
  const completeTask = async (taskId) => {
    setWait(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_CAMUNDA_API_BASE
        }/api/process/${taskId}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to complete task");
      toast.success("Task completed successfully");
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to complete task");
    } finally {
      setWait(false);
    }
  };

  // Mark Whole process instance as complete
  const completeAllTasks = async (processInstanceId) => {
    setWait(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_CAMUNDA_API_BASE
        }/api/process/complete-all-tasks/${processInstanceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to complete task");
      toast.success("Task completed successfully");
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to complete task");
    } finally {
      setWait(false);
    }
  };

  const showBPMNDiagram = () => {};
  const ListHeader = [
    { name: "Task ID", sortKey: null },
    { name: "Task Name", sortKey: null },
    { name: "Loan ID", sortKey: null },
    { name: "Assigned User", sortKey: null },
    { name: "Process Instance ID", sortKey: null },
    { name: "Created At", sortKey: null },
    { name: "Action", sortKey: null },
  ];

  return (
    <ContainerTile loading={loading} className="px-5 pt-5 pb-1">
      {/* Wait Overlay */}
      {wait && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <div className="text-lg font-semibold mb-2">Please wait...</div>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600 mx-auto" />
          </div>
        </div>
      )}

      <div className="block md:flex justify-between items-center mb-4 md:mb-0">
        <h2 className="mb-6">
          <b className="text-xl font-semibold">Active Tasks</b>
          <div className="text-gray-600 text-sm">
            View active tasks from the workflow engine
          </div>
        </h2>
      </div>

      <ListTableClassic
        ListName="List of All Active Tasks"
        ListNameLength={tasks?.length}
        ListHeader={ListHeader}
      >
        {tasks?.map((taskGroup, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {(taskGroup.tasksInfo.length > 0 ? taskGroup.tasksInfo : [{}]).map((task, i) => {
  const loanId = task?.variables?.loanId || "-";
  const assignedUser = task?.variables?.assignedUser || "-";
  const taskId = task?.id || "-";
  const taskName = task?.name || taskGroup.activeActivityNames?.join(", ") || "(no active user task)";
  const createdAt = task?.createTime || "-";

  return (
    <tr key={`${taskGroup.processInstanceId}-${i}`}>
      <td className="p-4">{taskId}</td>
      <td className="p-4">{taskName}</td>
      <td className="p-4">{loanId}</td>
      <td className="p-4">{assignedUser}</td>
      <td className="p-4">{taskGroup.processInstanceId}</td>
      <td className="p-4">{createdAt}</td>
      <td className="p-4">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={() =>
            completeAllTasks(taskGroup.processInstanceId)
          }
          disabled={!task?.id} // Disable if no task
        >
          Complete Process
        </button>
      </td>
      <td className="p-4">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={() =>
            handleShowBPMNModal(taskGroup.processDefinitionId, taskGroup.processInstanceId)
          }
        >
          View Diagram
        </button>
      </td>
    </tr>
  );
})}
          </React.Fragment>
        ))}
      </ListTableClassic>
      <BPMNModal
        isOpen={showBPMNModal}
        onClose={closeBPMNModal}
        processDefinitionId={selectedProcessDefId}
        processInstanceId={selectedProcessInstanceId}
      />
    </ContainerTile>
  );
};

export default MyTasks;
