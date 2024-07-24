export async function createNewRecovery(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-temp/" +
        Name,
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
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
