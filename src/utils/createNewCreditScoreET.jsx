import { toast } from "react-toastify";

export async function createNewCreditScoreET(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_CREATE}${Name}`,
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
      toast.error("Token Expirid !");
      return;
    }
    const creditScoreETDetails = await response.json();
    console.log(creditScoreETDetails);
    navigate(navigateSuccess + creditScoreETDetails.creditScoreEtTempId);
    toast.success("Eligible Tenure created !");
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
