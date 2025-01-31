import { toast } from "react-toastify";
export async function createNewRecovery(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_RECOVERY_CREATE}${Name}`,
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
    const RecoveryDetails = await response.json();
    console.log(RecoveryDetails);
    navigate(navigateSuccess + RecoveryDetails.recoveryEquationTempId);
    toast.success("Recovery Equation created !");
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
