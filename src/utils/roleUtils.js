export const hasViewOnlyAccess = (roleName) => {
  const viewOnlyRoles = [
    "ROLE_VIEWER",
    "LOAN_OFFICER",
    "CHIEF_EXECUTIVE_OFFICER",
    "MANAGEMENT_CREDIT_COMMITTEE",
    "BOARD",
  ];
  return viewOnlyRoles.includes(roleName);
};

export const hasViewOnlyAccessGroup2 = (roleName) => {
  const viewOnlyRoles = [
    "ROLE_VIEWER",
    "LOAN_OFFICER",
    "CREDIT_OFFICER",
    "CCO_AND_FINTECH_OFFICER",
    "CHIEF_EXECUTIVE_OFFICER",
    "MANAGEMENT_CREDIT_COMMITTEE",
    "BOARD",
  ];
  return viewOnlyRoles.includes(roleName);
};
