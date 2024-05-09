import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  mailId: localStorage.getItem("mail"),
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = !!action.payload;
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    logout(state, action) {
      state.isAuthenticated = !!action.payload;
      localStorage.removeItem("token");
      state.token = action.payload;
      localStorage.removeItem("mail");
      state.mailId = null;
    },
    userMailId(state, action) {
      state.mailId = action.payload;
      localStorage.setItem("mail", action.payload);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
