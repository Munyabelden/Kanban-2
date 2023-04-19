import { useDispatch, useSelector } from "react-redux";
import { fetchMissions, joinMission, leaveMission } from "../redux/missions/MissionSlice";
import { useEffect } from "react";
import './styles/Mission.css';

const Mission = () => {
  const { missions } = useSelector((store) => store.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const handleJoinMember = (missionId) => {
    dispatch(joinMission(missionId));
  };

  const handleLeaveMember = (missionId) => {
    dispatch(leaveMission(missionId));
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
          {missions.map((mission) => {
          return (
            <tr key={mission.mission_id}>
              <td>{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td>{mission.joined ? "Active Member" : "Not A Member"}</td>
              <td>
                {mission.joined ? (
                  <button type="button" onClick={() => handleLeaveMember(mission.mission_id)} className="active-button">
                    Leave Mission
                  </button>
                ) : (
                  <button type="button" onClick={() => handleJoinMember(mission.mission_id)} className="join-button">
                    Join Mission
                  </button>
                )}
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Mission;
