import { configureStore } from "@reduxjs/toolkit";
import {rocketReducer} from "./rockets/RocketSlice";
import { missionReducer } from "./missions/MissionSlice";

const store = configureStore({
  reducer: {
    rockets: rocketReducer,
    missions: missionReducer,
  },
});

export default store;
