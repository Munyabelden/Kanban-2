import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchMissions, joinMission, leaveMission } from '../redux/mission/MissionSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  missions: [],
  status: 'idle',
  joined: false,
  isActive: false,
  isMember: false,
  error: null,
};
const store = mockStore(initialState);

describe('missionSlice', () => {
    it('fetchMissions should dispatch the correct actions', async () => {
      await store.dispatch(fetchMissions());
      const actions = store.getActions();
      expect(actions[0].type).toEqual('missions/fetchMissions/pending');
      expect(actions[1].type).toEqual('missions/fetchMissions/fulfilled');
      expect(actions[1].payload).toHaveLength(6);
    });
  
    it('joinMission should dispatch the correct actions', () => {
      store.dispatch(joinMission('mission1'));
      const actions = store.getActions();
      expect(actions[0].type).toEqual('missions/joinMission');
      expect(actions[0].payload).toEqual('mission1');
    });
  
    it('leaveMission should dispatch the correct actions', () => {
      store.dispatch(leaveMission('mission2'));
      const actions = store.getActions();
      expect(actions[0].type).toEqual('missions/leaveMission');
      expect(actions[0].payload).toEqual('mission2');
    });
  });  
