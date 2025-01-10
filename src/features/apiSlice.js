import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    apiKey: "",
    apiKeys: [],
    bases: [], // Array to store base information
    selectedBase: null,
    schemas: {},
  },
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
      if (!state.apiKeys.includes(action.payload)) {
        state.apiKeys.push(action.payload);
      }
    },
    removeApiKey: (state, action) => {
      state.apiKeys = state.apiKeys.filter((key) => key !== action.payload);
      if (state.apiKey === action.payload) {
        state.apiKey = state.apiKeys[0] || "";
      }
    },
    addBase: (state, action) => {
      state.bases.push(action.payload); // Add base object { id, name }
    },
    removeBase: (state, action) => {
      state.bases = state.bases.filter((base) => base.id !== action.payload);
    },
  },
});

export const { setApiKey, removeApiKey, addBase, removeBase } =
  apiSlice.actions;
export default apiSlice.reducer;
