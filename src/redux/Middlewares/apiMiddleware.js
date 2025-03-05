import { toast } from "react-toastify";

const apiMiddleware = ({ dispatch }) => (next) => async (action) => {
  if (!action.meta || !action.meta.api) {
    return next(action);
  }

  const { api } = action.meta;
  const { url, method, data, headers, onSuccess, onError } = api;

  dispatch({ type: `${action.type}/pending` });

  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(url, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const result = await response.json();
    dispatch({ type: `${action.type}/fulfilled`, payload: result });

    if (onSuccess) onSuccess(result);
    toast.success("API Request Successful");
  } catch (error) {
    dispatch({
      type: `${action.type}/rejected`,
      payload: error.message,
    });
    if (onError) onError(error.message);
    toast.error(`API Error: ${error.message}`);
  }
};

export default apiMiddleware;
