import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Mission from '../components/Mission';
import { fetchMissions, joinMission, leaveMission } from '../redux/missions/MissionSlice';

const mockStore = configureMockStore([thunk]);

describe('Mission component', () => {
  let store;

  beforeEach(async () => {
    store = mockStore({
      missions: {
        missions: [
          {
            mission_id: 'mission1',
            mission_name: 'Mission 1',
            description: 'Description 1',
            joined: true,
          },
          {
            mission_id: 'mission2',
            mission_name: 'Mission 2',
            description: 'Description 2',
            joined: false,
          },
        ],
        status: 'success',
        error: null,
      },
    });

    store.dispatch = jest.fn();

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({
        missions: [
          {
            mission_id: 'mission1',
            mission_name: 'Mission 1',
            description: 'Description 1',
            joined: true,
          },
          {
            mission_id: 'mission2',
            mission_name: 'Mission 2',
            description: 'Description 2',
            joined: false,
          },
        ],
      }),
    });

    await store.dispatch(fetchMissions());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a table with missions', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3); // Header row + 2 mission rows
  });

  it('renders mission data correctly', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>
    );

    expect(screen.getAllByText('Description 1')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Description 2')[0]).toBeInTheDocument();

    expect(screen.getByText('Active Member')).toBeInTheDocument();
    expect(screen.getByText('Leave Mission')).toBeInTheDocument();

    expect(screen.getByText('Join Mission')).toBeInTheDocument();
    expect(screen.getByText('Active Member')).toBeInTheDocument();
  });
});
