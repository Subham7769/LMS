import { toast } from "react-toastify";
export async function createNewLoanApproval(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_LOAN_APPROVAL_CREATE}${Name}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("authToken");
      navigate(navigateFail);
      return;
    }
    const loanApprovalDetails = await response.json();
    console.log(loanApprovalDetails);
    navigate(
      navigateSuccess + loanApprovalDetails.approvalsConfigurationsTempId
    );
    toast.success("Loan Approval created !");
  } catch (error) {
    console.error(error);
  }
}
