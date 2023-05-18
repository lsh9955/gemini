import { createSlice } from "@reduxjs/toolkit";
import { AppStore } from "./store";

const initialState = {
  isStarted: false,
};

export const CreateGeminiSlice = createSlice({
  name: "createGemini",
  initialState,
  reducers: {
    startGenerate(state) {
      state.isStarted = true;
    },
    endGenerate(state) {
      state.isStarted = false;
    },
  },
});
//
export const { startGenerate, endGenerate } = CreateGeminiSlice.actions;
export type RootState = AppStore;
export default CreateGeminiSlice.reducer;
