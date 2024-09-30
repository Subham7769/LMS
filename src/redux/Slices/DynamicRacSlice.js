import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HeaderList, RACList } from "../../data/RacData";

export const fetchList = createAsyncThunk(
  "rac/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find((menu) => menu.title === "RAC");
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

const initialState = {
  formConfig: {
    title: "",
    description: "",
    submitEndpoint: "",
    getEndpoint: "",
    updateEndpoint: "",
    deleteEndpoint: "",
    showAddButton: false,
    showSaveButton: false,
    showDeleteButton: false,
    showUpdateButton: false,
  },
  sections: [],
  currentSection: null,
  showSectionSettings: false,
  showFormConfig: false,
  isEditorMode: false,
  racStatsData: {
    HeaderList,
    RACList,
  },
  loading: false,
  error: null,
};

const DynamicRacSlice = createSlice({
  name: "DynamicRac",
  initialState,
  reducers: {
    setFormConfig(state, action) {
      state.formConfig = action.payload;
    },
    updateFormConfig: (state, action) => {
      const { name, value } = action.payload;
      state.formConfig[name] = value;
    },
    downloadConfig: (state) => {
      const config = {
        formConfig: state.formConfig,
        sections: state.sections,
      };
      const blob = new Blob([JSON.stringify(config, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        state.formConfig.title !== ""
          ? state.formConfig.title
          : "New Dynamic Form"
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    uploadConfig(state, action) {
      const { formConfig, sections } = action.payload;
      state.formConfig = formConfig;
      state.sections = sections;
    },
    setSection(state, action) {
      const { newSections } = action.payload;
      state.sections = newSections;
    },
    addSection(state, action) {
      const newSection = {
        id: `section-${Date.now()}`,
        name: `New Section ${state.sections.length + 1}`,
        size: "full",
        fields: [],
      };
      state.sections.push(newSection);
    },
    updateSection(state, action) {
      const { sectionId, updates } = action.payload;
      state.sections = state.sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      );
    },
    removeSection(state, action) {
      const { sectionId } = action.payload;
      state.sections = state.sections.filter(
        (section) => section.id !== sectionId
      );
    },
    addField(state, action) {
      const { sectionId, fieldConfig } = action.payload;

      if (sectionId) {
        // Create new field with a unique id
        let newField = {};
        if (fieldConfig.fieldType === "STRING") {
          const {numberCriteriaRangeList,firstOperator,secondOperator, ...restfieldConfig } = fieldConfig;
          newField = {
            id: `field-${Date.now()}`,
            ...restfieldConfig,
          };
        } else {
          newField = {
            id: `field-${Date.now()}`,
            ...fieldConfig,
          };
        }

        // Find the section and add the new field
        state.sections = state.sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              fields: [...section.fields, newField],
            };
          }
          return section;
        });
      }
    },
    removeField(state, action) {
      const { sectionId, fieldId } = action.payload;
      state.sections = state.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.filter((field) => field.id !== fieldId),
          };
        }
        return section;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        const updatedList = action.payload.map((newListItem, index) => ({
          name: newListItem.name,
          href: newListItem.href,
          createdOn: RACList[index]?.createdOn || "14/09/2022",
          approved: RACList[index]?.approved || "40%",
          totalProcessed: RACList[index]?.totalProcessed || "2367",
          status: RACList[index]?.status || "Active",
        }));
        state.racStatsData.RACList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setFormConfig,
  updateFormConfig,
  downloadConfig,
  uploadConfig,
  setSection,
  addSection,
  removeSection,
  updateSection,
  addField,
  removeField,
} = DynamicRacSlice.actions;
export default DynamicRacSlice.reducer;
