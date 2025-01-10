import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    apiKey: "",
    bases: [],
    selectedBase: null,
    schemas: {},
  },
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
    setBases: (state, action) => {
      state.bases = action.payload;
    },
    selectBase: (state, action) => {
      state.selectedBase = action.payload;
    },
    setSchema: (state, action) => {
      const { baseId, schema } = action.payload;
      state.schemas[baseId] = schema;
    },
  },
});

export const { setApiKey, setBases, selectBase, setSchema } = apiSlice.actions;
export default apiSlice.reducer;
