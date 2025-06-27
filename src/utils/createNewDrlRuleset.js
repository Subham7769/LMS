import { toast } from "react-toastify";
export async function createNewDrlRuleset(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  const payload = {
    name: Name,
  };
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${import.meta.env.VITE_DRULES_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("authToken");
      navigate(navigateFail);
      return;
    }
    const DrulesDetails = await response.json();
    console.log(DrulesDetails);
    navigate(navigateSuccess + DrulesDetails.droolsRuleSetId + "/basic-info");
    toast.success("DRL Ruleset created !");
  } catch (error) {
    console.error(error);
  }
}
