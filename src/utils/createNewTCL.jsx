export async function createNewTCL(
    Name,
    navigate,
    navigateSuccess,
    navigateFail
  ) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_TCL_CREATE}${Name}`,
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
      const TCLDetails = await response.json();
      console.log(TCLDetails);
      navigate(navigateSuccess + TCLDetails.tclId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  