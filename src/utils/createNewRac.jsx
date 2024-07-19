
export async function createNewRac(Name, navigate ,navigateSuccess, navigateFail) {
  try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/" +
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
      const racDetails = await response.json();
      console.log(racDetails);
      navigate(navigateSuccess + racDetails.racId);
      window.location.reload();
  } catch (error) {
      console.error(error);
  }
}

