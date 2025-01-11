import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    apiKey: "",
    apiKeys: [],
    bases: [], // Array to store base information
    schema: JSON.parse(localStorage.getItem("schema")) || null, // Load from localStorage
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
    setSchema: (state, action) => {
      state.schema = action.payload;
      localStorage.setItem("schema", JSON.stringify(action.payload)); // Save to localStorage
    },
  },
});

export const { setApiKey, removeApiKey, addBase, removeBase, setSchema } =
  apiSlice.actions;
export default apiSlice.reducer;
