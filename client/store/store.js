import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import videoReducer from "../slice/videoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
  },
});

export default store;
