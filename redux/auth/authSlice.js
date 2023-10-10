import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { email: "", password: "", login: "" },
    isLogged: false,
  },
  reducers: {
    createUser(state, { payload }) {
      state.user.email = payload.email;
      state.user.password = payload.password;
      state.user.login = payload.login;
    },
    logIn(state, { payload }) {
      state.user = payload;
      state.isLogged = true;
    },
    logOut(state) {
      state.user = { email: "", password: "" };
      state.isLogged = false;
    },
  },
});

export const { createUser, logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
