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

export const deleteDynamicRac = createAsyncThunk("rac/deleteDynamicRac");
export const cloneDynamicRac = createAsyncThunk("rac/cloneDynamicRac");

const initialState = {
  racConfig: { id: "", name: "abc", racId: "", sections: [] },
  isEditorMode: true,
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
    downloadConfig: (state) => {
      const config = {
        sections: state.racConfig.sections,
      };
      const blob = new Blob([JSON.stringify(config, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        state.racConfig.name !== "" ? state.racConfig.name : "New Dynamic Form"
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    uploadConfig(state, action) {
      const { sections } = action.payload;
      state.racConfig.sections = sections;
    },
    updateRacConfigName(state, action) {
      const { name } = action.payload;
      state.racConfig = {
        ...state.racConfig,
        name: name,
      };
    },
    setSection(state, action) {
      const { newSections } = action.payload;
      state.racConfig.sections = newSections;
    },
    addSection(state, action) {
      const newSection = {
        id: `section-${Date.now()}`,
        name: `New Section ${state.racConfig.sections.length + 1}`,
        size: "full",
        fields: [],
      };
      state.racConfig.sections.push(newSection);
    },
    updateSection(state, action) {
      const { sectionId, name } = action.payload;
      state.racConfig.sections = state.racConfig.sections.map((section) =>
        section.id === sectionId ? { ...section, name: name } : section
      );
    },
    removeSection(state, action) {
      const { sectionId } = action.payload;
      state.racConfig.sections = state.racConfig.sections.filter(
        (section) => section.id !== sectionId
      );
    },
    addField(state, action) {
      const { sectionId, fieldConfig } = action.payload;

      if (sectionId) {
        // Create new field with a unique id
        let newField = {};
        if (fieldConfig.fieldType === "STRING") {
          const {
            numberCriteriaRangeList,
            firstOperator,
            secondOperator,
            ...restfieldConfig
          } = fieldConfig;
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
        state.racConfig.sections = state.racConfig.sections.map((section) => {
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
      state.racConfig.sections = state.racConfig.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.filter((field) => field.id !== fieldId),
          };
        }
        return section;
      });
    },
    handleChangeNumberField(state, action) {
      const { sectionId, fieldId, name, value } = action.payload;
      const stringValue = value.toString();
      console.log(stringValue)
      state.racConfig.sections = state.racConfig.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.map((field) => {
              if (field.id === fieldId) {
                return {
                  ...field,
                  criteriaValues: [stringValue],
                };
              }
              return field;
            }),
          };
        }
        return section;
      });
    },
    handleChangeStringField(state, action) {
      const { sectionId, fieldId, values } = action.payload;
      // Ensure we're updating the correct section and field
      state.racConfig.sections = state.racConfig.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.map((field) => {
              if (field.id === fieldId) {
                return {
                  ...field,
                  // Update criteriaValues with the new values
                  criteriaValues: [...values],
                };
              }
              return field;
            }),
          };
        }
        return section;
      });
      console.log(values)
    },
    removeTag: (state, action) => {
      const { sectionId, fieldId, tagToRemove } = action.payload;

      // Find the section and field
      const section = state.racConfig.sections.find(section => section.id === sectionId);
      const field = section.fields.find(field => field.id === fieldId);

      // Remove the tag from criteriaValues
      if (field && field.criteriaValues) {
        field.criteriaValues = field.criteriaValues.filter(tag => tag !== tagToRemove);
      }
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
      })
      .addCase(deleteDynamicRac.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDynamicRac.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDynamicRac.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cloneDynamicRac.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cloneDynamicRac.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(cloneDynamicRac.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  downloadConfig,
  uploadConfig,
  updateRacConfigName,
  setSection,
  addSection,
  removeSection,
  updateSection,
  addField,
  removeField,
  handleChangeNumberField,
  handleChangeStringField,
  removeTag,
} = DynamicRacSlice.actions;
export default DynamicRacSlice.reducer;
