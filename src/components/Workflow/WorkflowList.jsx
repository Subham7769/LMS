import React, { useEffect, useState } from "react";
import ListTable from "../../components/Common/ListTable/ListTable";
import { HeaderList } from "../../data/WorkflowsData";
import { useDispatch, useSelector } from "react-redux";
import InstanceModal from "../../components/WorkFlowManagement/InstanceModal";
import { useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";

import BPMNModal from "./BPMNModal";

const WorkflowList = () => {
  // const { HeaderList, RACList } = useSelector(
  //   (state) => state.dynamicRac.racStatsData
  // );
  const [searchParams] = useSearchParams();
  const loanId = searchParams.get("loanId");
  const uid = searchParams.get("uid");

  console.log("Loan ID:", loanId, "UID:", uid);

  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const [showInstanceModal, setShowInstanceModal] = useState(false);
  const [workflowList, setWorkflowList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProcessDefId, setSelectedProcessDefId] = useState(null);
  const [showBPMNModal, setShowBPMNModal] = useState(false);

const handleInstance = (rowIndex) => {
  console.log(rowIndex);
  const rowData = workflowList[rowIndex];
  setSelectedProcessDefId(rowData.id); // rowData contains the workflow info
  setShowBPMNModal(true);
};

const closeBPMNModal = () => {
  setShowBPMNModal(false);
  setSelectedProcessDefId(null);
};

  const ActionList = [
  {
    name: "View Workflow",
    action: handleInstance, // Will receive rowIndex from ListTable
    type: "primary",
  },
];
  // useEffect(() => {
  //   dispatch(fetchList());
  // }, [dispatch, menus]);
  // Fetch workflows from Camunda API
  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_CAMUNDA_API_BASE
          }/api/process/process-definitions`
        );
        if (!response.ok) throw new Error("Failed to fetch workflows");
        const data = await response.json();
        const formattedList = data.map((wf, index) => ({
          key: wf.key,
          name: wf.name || wf.key,
          id: wf.id,
          resourceName: wf.resourceName,
        }));
        console.log(formattedList);
        setWorkflowList(formattedList);
      } catch (error) {
        console.error("Error fetching workflows:", error);
        toast.error("Failed to load workflows.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, [menus]);

  return (
    <>
      {loanId && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-900">
            <strong>Loan ID:</strong> {loanId} <br />
            All workflows below apply to this loan.
          </p>
        </div>
      )}

      <ListTable
        ListName="Workflows List"
        ListHeader={HeaderList}
        ListItem={workflowList}
        ListAction={ActionList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false}
      />
      <BPMNModal
        isOpen={showBPMNModal}
        onClose={closeBPMNModal}
        processDefinitionId={selectedProcessDefId}
      />
    </>
  );
};

export default WorkflowList;
