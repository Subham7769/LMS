import { toast } from "react-toastify";
export async function createNewDBC(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${import.meta.env.VITE_DBR_CREATE}${Name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("authToken");
      navigate(navigateFail);
      toast.error("Token Expirid !");
      return;
    }
    const dbcDetails = await response.json();
    console.log(dbcDetails);
    navigate(navigateSuccess + dbcDetails.dbcTempId);
    toast.success("DBR Config created !");
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
