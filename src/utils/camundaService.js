import { useDispatch, useSelector } from "react-redux";

export const initiateDebtCollectionWorkflow = async (payload) => {

  try {
    console.log("in initiateDebtCollectionWorkflow hdfdfdfdf")


    const response = await fetch(
      `${import.meta.env.VITE_CAMUNDA_API_BASE}/api/debtors/initiate-debt-workflow`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to initiate workflow");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error initiating workflow:", error);
    throw error;
  }
};

  export const completeTask = async (taskId, variables = {}) => {
  const url = `${import.meta.env.VITE_CAMUNDA_API_BASE}/task/${taskId}/complete`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variables }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to complete task: ${errorText}`);
  }

  return { success: true };
};
