export async function handleApiErrors(response, navigate, rejectWithValue) {
  try {
    if (!response.ok) {
      switch (response.status) {
        case 400:
          const badRequestData = await response.json();
          return rejectWithValue(badRequestData);
        case 404:
          return rejectWithValue("User not found");
        case 401:
        case 403:
          localStorage.removeItem("authToken");
          navigate("/login");
          return rejectWithValue("Unauthorized access");
        case 500:
          const serverErrorData = await response.json();
          return rejectWithValue(serverErrorData);
        default:
          return rejectWithValue("An unknown error occurred");
      }
    }

    // Check if there's any response body to parse
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    // Default response for success with no content
    return { message: "Operation successful" };

  } catch (error) {
    return rejectWithValue("Failed to parse response");
  }
}
