export const hasViewOnlyAccess = (roleName) => {
  const viewOnlyRoles = [
    "ROLE_VIEWER",
    "ROLE_LOAN_OFFICER",
    "ROLE_CHIEF_EXECUTIVE_OFFICER",
    "ROLE_MANAGEMENT_CREDIT_COMMITTEE",
    "ROLE_BOARD",
  ];
  return viewOnlyRoles.includes(roleName);
};

export const hasViewOnlyAccessGroup2 = (roleName) => {
  const viewOnlyRoles = [
    "ROLE_VIEWER",
    "ROLE_LOAN_OFFICER",
    "ROLE_CREDIT_OFFICER",
    "ROLE_CCO_AND_FINTECH_OFFICER",
    "ROLE_CHIEF_EXECUTIVE_OFFICER",
    "ROLE_MANAGEMENT_CREDIT_COMMITTEE",
    "ROLE_BOARD",
  ];
  return viewOnlyRoles.includes(roleName);
};

export const hasViewOnlyAccessGroup3 = (roleName) => {
  const viewOnlyRoles = [
    "ROLE_CREDIT_OFFICER",
    "ROLE_CCO_AND_FINTECH_OFFICER",
    "ROLE_CHIEF_EXECUTIVE_OFFICER",
    "ROLE_MANAGEMENT_CREDIT_COMMITTEE",
    "ROLE_BOARD",
  ];
  return viewOnlyRoles.includes(roleName);
};

export const hasViewOnlyAccessGroup4 = (roleName) => {
  const viewOnlyRoles = [
    "ROLE_VIEWER",
  ];
  return viewOnlyRoles.includes(roleName);
};
