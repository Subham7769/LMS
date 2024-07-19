export async function createNewBE(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/" +
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
    const beDetails = await response.json();
    navigate(navigateSuccess + beDetails.blockEmployerTempId);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
