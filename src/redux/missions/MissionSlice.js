import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mission_API = 'https://api.spacexdata.com/v3/missions';

const initialState = {
  missions: [],
  status: 'idle',
  joined: false,
  isActive: false,
  isMember: false,
  error: null,
};

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  const response = await fetch(mission_API);
  if(!response.ok){
    throw new Error("failed to fetch mission");
  }
  const data = await response.json();
  return data;
});

const missionSlice = createSlice({
  name: 'missions',
  initialState: initialState,
  reducers: {
    joinMission: (state, action) => {
      const id = action.payload;
      const newState = state.missions.map((mission) => {
        if(mission.mission_id !== id) return mission;
        return {
          ...mission,
          joined: !mission.joined,
        }
      });
      return { ...state, missions: newState, };
    },
    leaveMission: (state, action) => {
      const id = action.payload;
      const updateState = state.missions.map((mission) => {
        if(mission.mission_id !== id) {
          return mission;
        }
        return {
          ...mission,
          joined: false,
        }
      });
      return { ...state, missions: updateState, };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = 'success';
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const { joinMission, leaveMission } = missionSlice.actions;

export const missionReducer = missionSlice.reducer;
