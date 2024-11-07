export async function handleApiErrors(response,navigate) {
  try {
    if (!response.ok) {
      switch (response.status) {
        case 400:
          const badRequestData = await response.json();
          return Promise.reject(badRequestData);
        case 404:
          return Promise.reject("User not found");
        case 401:
        case 403:
          localStorage.removeItem("authToken");
          navigate("/login");
          return Promise.reject("Unauthorized access");
        case 500:
          const serverErrorData = await response.json();
          return Promise.reject(serverErrorData);
        default:
          return Promise.reject("An unknown error occurred");
      }
    }

    // Check if there's any response body to parse
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } 

  } catch (error) {
    return Promise.reject("Failed to parse response");
  }
}
