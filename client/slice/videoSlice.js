import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all videos
export const fetchVideos = createAsyncThunk("video/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("http://localhost:5000/api/videos");

    if (!res.ok) {
      const error = await res.json();
      return rejectWithValue(error);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Fetch videos by channel ID
export const fetchVideosByChannelId = createAsyncThunk(
  "video/fetchByChannelId",
  async (channelId, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/videos/channel/${channelId}`);
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    status: "idle",
    error: null,
    channelVideos: [],
    channelStatus: "idle",
    channelError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all videos
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load videos";
      })

      // Fetch videos by channel
      .addCase(fetchVideosByChannelId.pending, (state) => {
        state.channelStatus = "loading";
        state.channelError = null;
      })
      .addCase(fetchVideosByChannelId.fulfilled, (state, action) => {
        state.channelStatus = "succeeded";
        state.channelVideos = action.payload;
      })
      .addCase(fetchVideosByChannelId.rejected, (state, action) => {
        state.channelStatus = "failed";
        state.channelError = action.payload || "Failed to load channel videos";
      });
  },
});

export default videoSlice.reducer;
