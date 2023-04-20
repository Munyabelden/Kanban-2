import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Mission from '../components/Mission';

const mockStore = configureStore([]);

describe('Mission component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: [
          {
            mission_id: 1,
            mission_name: 'Mission 1',
            description: 'Mission 1 description',
            joined: false,
          },
          {
            mission_id: 2,
            mission_name: 'Mission 2',
            description: 'Mission 2 description',
            joined: true,
          },
        ],
      },
    });
  });

  it('should render the Mission component', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>
    );

    const mission1Name = screen.getByText('Mission 1');
    const mission1Description = screen.getByText('Mission 1 description');
    const mission1JoinButton = screen.getByText('Join Mission');
    const mission2Name = screen.getByText('Mission 2');
    const mission2Description = screen.getByText('Mission 2 description');
    const mission2LeaveButton = screen.getByText('Leave Mission');

    expect(mission1Name).toBeInTheDocument();
    expect(mission1Description).toBeInTheDocument();
    expect(mission1JoinButton).toBeInTheDocument();
    expect(mission2Name).toBeInTheDocument();
    expect(mission2Description).toBeInTheDocument();
    expect(mission2LeaveButton).toBeInTheDocument();
  });

  it('should dispatch joinMission action when join button is clicked', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>
    );

    const mission1JoinButton = screen.getByText('Join Mission');
    fireEvent.click(mission1JoinButton);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'missions/joinMission', payload: 1 }]);
  });

  it('should dispatch leaveMission action when leave button is clicked', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>
    );

    const mission2LeaveButton = screen.getByText('Leave Mission');
    fireEvent.click(mission2LeaveButton);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'missions/leaveMission', payload: 2 }]);
  });
});
