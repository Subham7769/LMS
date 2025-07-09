export const HeaderList = [
  "Instance Name",
  "Description",
  "Instance Id",
  "BPMN File",
  "Actions",
];

export const WorkflowsList = [
  {
    name: "Debt Workflow 1",
    description: "Workflow for IDF",
    instances: "25",
    incidents: "1",
    href: "/loan/workflows/1",
  },
  {
    name: "Debt Hardship program",
    description: "Hardship program for payroll backed loans",
    instances: "30",
    incidents: "0",
    href: "/loan/workflows/2",
  },
];

export const InstancesHeaderList = [
  "ID",
  "Name",
  "Initiated By",
  "Loan ID",
  "Current Owner",
];

export const InstancesList = [
  {
    id: "1",
    name: "Debt Workflow 1",
    initiatedBy: "Octavia",
    loanId: "LHP001",
    currentOwner: "Sarah",
    href: "/loan/instances/1",
  },
  {
    id: "2",
    name: "Debt Hardship program",
    initiatedBy: "System",
    loanId: "LHP002",
    currentOwner: "Patrick",
    href: "/loan/instances/2",
  },
];

export const IncidentsHeaderList = [
  "ID",
  "Name",
  "Reason",
  "Current Owner",
  "Created",
];

export const IncidentsList = [
  {
    id: "1",
    name: "Debt Workflow 1",
    reason:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    currentOwner: "Sarah",
    created: "23 May 2025",
    href: "/loan/incidents/1",
  },
  {
    id: "2",
    name: "Debt Hardship program",
    reason:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    currentOwner: "Patrick",
    created: "02 Jun 2025",
    href: "/loan/incidents/2",
  },
];

export const MyTasksHeaderList = [
  "ID",
  "Name",
  "Initiated By",
  "Loan ID",
  "Actions",
];

export const MyTasksList = [
  {
    id: "1",
    name: "Debt Workflow 1",
    initiatedBy: "Octavia",
    loanId: "LHP001",
    href: "/loan/instances/1",
  },
  {
    id: "2",
    name: "Debt Hardship program",
    initiatedBy: "System",
    loanId: "LHP002",
    href: "/loan/instances/2",
  },
];
