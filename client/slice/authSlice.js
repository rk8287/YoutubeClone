import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    return res.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, avatar }) => {
    const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password, avatar });
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
