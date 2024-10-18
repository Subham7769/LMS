export async function createNewCreditScoreEq(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_CREDIT_SCORE_CREATE}${Name}`,
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
    const creditScoreDetails = await response.json();
    console.log(creditScoreDetails);
    navigate(navigateSuccess + creditScoreDetails.creditScoreEqTempId);
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
