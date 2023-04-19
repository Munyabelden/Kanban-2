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
    reserveRocket: (state, action) => {
      const id = action.payload;
      const newState = state.rockets.map((rocket) => {
        if (rocket.id !== id) return rocket;
        return { ...rocket, reserved: true };
      });
      return { ...state, rockets: newState };
    },
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

export const { reserveRocket } = rocketsSlice.actions;
export const rocketReducer = rocketsSlice.reducer;
