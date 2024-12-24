import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenusInitial } from "../../data/DepositsMenuData";
import axios from "axios";

const initialState = {
  open: JSON.parse(localStorage.getItem("sidebarOpen")) ?? true,
  submenuStates: MenusInitial.map((menu) =>
    menu.submenu ? { isOpen: false } : ""
  ),
  menus: MenusInitial,
  loading: false, // New loading state
  error: null, // New error state
};

const depositSidebarSlice = createSlice({
  name: "depositSidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.open = !state.open;
      localStorage.setItem("sidebarOpen", JSON.stringify(state.open));
    },
    setSubmenuStates(state, action) {
      state.submenuStates = action.payload;
      localStorage.setItem(
        "submenuStates",
        JSON.stringify(state.submenuStates)
      );
    },
    setMenus(state, action) {
      const { roleName } = action.payload;
      switch (roleName) {
        case "ROLE_SUPERADMIN":
          state.menus = MenusInitial;
          break;

        default:
          state.menus = [];
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { toggleSidebar, setSubmenuStates, setMenus } =
  depositSidebarSlice.actions;
export default depositSidebarSlice.reducer;
