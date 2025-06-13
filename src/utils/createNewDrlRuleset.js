import { toast } from "react-toastify";
export async function createNewDrlRuleset(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_DRULES_CREATE}${Name}`,
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
    const DrulesDetails = await response.json();
    console.log(DrulesDetails);
    navigate(
      navigateSuccess + DrulesDetails.dRulesTempId
    );
    toast.success("DRL Ruleset created !");
  } catch (error) {
    console.error(error);
  }
}
