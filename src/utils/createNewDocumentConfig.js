import { toast } from "react-toastify";
export async function createNewDocumentConfig(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_DOCUMENT_CONFIG_CREATE}${Name}`,
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
    const documentConfigDetails = await response.json();
    // console.log(documentConfigDetails);
    navigate(navigateSuccess + documentConfigDetails.dynamicDocumentTempId);
    toast.success("Document Config created !");
  } catch (error) {
    console.error(error);
  }
}
