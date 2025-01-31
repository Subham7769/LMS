import { toast } from "react-toastify";
export async function createNewRulePolicy(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_RULE_POLICY_CREATE}${Name}`,
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
    const rulePolicyDetails = await response.json();
    //   console.log(rulePolicyDetails);
    navigate(navigateSuccess + rulePolicyDetails.rulePolicyTempId);
    toast.success("Rule Policy created !");
  } catch (error) {
    console.error(error);
  }
}
