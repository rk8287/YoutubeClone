import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default videoSlice.reducer;
