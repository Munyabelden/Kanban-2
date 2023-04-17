import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRockets = createAsyncThunk(
  "rockets/fetchRockets",
  async () => {
    const response = await fetch("https://api.spacexdata.com/v4/rockets");
    if (!response.ok) {
      throw new Error("Failed to fetch rockets");
    }
    const data = await response.json();
    return data;
  }
);

const rocketsSlice = createSlice({
  name: "rockets",
  initialState: {
    rockets: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // other actions can be defined here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const rocketReducer = rocketsSlice.reducer;