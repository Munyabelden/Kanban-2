import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchMissions } from '../redux/missions/MissionSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  missions: [],
  status: 'idle',
  joined: false,

  error: null,
};
const store = mockStore(initialState);

describe('missionSlice', () => {
  it('fetchMissions should dispatch the correct actions', async () => {
    await store.dispatch(fetchMissions());
    const actions = store.getActions();
    expect(actions[0].type).toEqual('missions/fetchMissions/pending');
    expect(actions[1].type).toEqual('missions/fetchMissions/fulfilled');
    expect(actions[1].payload).toHaveLength(10);
  });
});  
