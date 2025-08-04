import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const token = localStorage.getItem("token");

export const createChannel = createAsyncThunk(
  "channel/create",
  async ({ name, avatar, banner, description }, thunkAPI) => {
    const res = await axios.post(
      "http://localhost:5000/api/channel/create",
      { name, avatar, banner, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);


export const getChannelById = createAsyncThunk(
  "channel/getById",
  async (channelId, thunkAPI) => {
    const res = await axios.get(`http://localhost:5000/api/channel/${channelId}`);
    return res.data;
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    loading: false,
    channel: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getChannelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannelById.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload;
      })
      .addCase(getChannelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default channelSlice.reducer;
