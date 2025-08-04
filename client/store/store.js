import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import channelReducer from "../slice/channelSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
  },
});

export default store;
