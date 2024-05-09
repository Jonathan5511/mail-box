import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  isRead: false,
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    read(state) {
      state.isRead = true;
    },
    unRead(state) {
      state.isRead = false;
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
