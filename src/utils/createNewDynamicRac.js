import {  toast } from "react-toastify"
export async function createNewRac(Name, navigate, navigateSuccess, navigateFail) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_DYNAMIC_RAC_CREATE_NEW_RAC}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "description": "string",
          "name": Name,
        }),
      }
    );
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("authToken");
      navigate(navigateFail);
      return;
    }
    const racDetails = await response.json();
    // console.log(racDetails);
    toast("Dynamic Rac Created.")
    navigate(navigateSuccess + racDetails.racId);
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

