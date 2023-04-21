import { rocketReducer } from "../redux/rockets/RocketSlice";

describe("RocketSlice", () => {
  let initialState = {
    rockets: [],
    status: "idle",
    error: null,
  };

  it("should return the initial state", () => {
    expect(rocketReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle reserveRocket", () => {
    const prevState = {
      rockets: [{ id: 1, name: "rocket1", reserved: false }],
      status: "succeeded",
      error: null,
    };
    const action = { type: "rockets/reserveRocket", payload: 1 };
    const expectedState = {
      rockets: [{ id: 1, name: "rocket1", reserved: true }],
      status: "succeeded",
      error: null,
    };
    expect(rocketReducer(prevState, action)).toEqual(expectedState);
  });

  it("should handle cancelReservation", () => {
    const prevState = {
      rockets: [{ id: 1, name: "rocket1", reserved: true }],
      status: "succeeded",
      error: null,
    };
    const action = { type: "rockets/cancelReservation", payload: 1 };
    const expectedState = {
      rockets: [{ id: 1, name: "rocket1", reserved: false }],
      status: "succeeded",
      error: null,
    };
    expect(rocketReducer(prevState, action)).toEqual(expectedState);
  });

  it("should handle fetchRockets.pending", () => {
    const action = { type: "rockets/fetchRockets/pending" };
    const expectedState = {
      rockets: [],
      status: "loading",
      error: null,
    };
    expect(rocketReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle fetchRockets.fulfilled", () => {
    const payload = [{ id: 1, name: "rocket1", reserved: false }];
    const action = { type: "rockets/fetchRockets/fulfilled", payload };
    const expectedState = {
      rockets: payload,
      status: "succeeded",
      error: null,
    };
    expect(rocketReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle fetchRockets.rejected", () => {
    const error = "Failed to fetch rockets";
    const action = { type: "rockets/fetchRockets/rejected", error: { message: error } };
    const expectedState = {
      rockets: [],
      status: "failed",
      error,
    };
    expect(rocketReducer(initialState, action)).toEqual(expectedState);
  });
});
