import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { HeaderList, WorkflowsList } from "../../data/WorkflowsData";

// Initial state
const workflowManagementInitialState = {
  createInstanceData: {
    name: "",
    email: "",
    amount: "",
    dueDate: "",
  },
  dRulesStatsData: {
    HeaderList,
    WorkflowsList,
  },
  loading: false,
  error: null,
};

const workflowManagementSlice = createSlice({
  name: "workflowManagement",
  initialState: workflowManagementInitialState,
  reducers: {
    handleChangeCreateInstanceData: (state, action) => {
      const { name, value } = action.payload;
      state.createInstanceData[name] = value;
    },
  },
});

export const { handleChangeCreateInstanceData } =
  workflowManagementSlice.actions;
export default workflowManagementSlice.reducer;
