import { toast } from "react-toastify";
export async function createNewAffordability(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_AFFORDABILITY_CREATE}${Name}`,
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
    const AffordabilityDetails = await response.json();
    console.log(AffordabilityDetails);
    navigate(
      navigateSuccess + AffordabilityDetails.affordabilityCriteriaTempId
    );
    toast.success("Affordability Criteria created !");
  } catch (error) {
    console.error(error);
  }
}
