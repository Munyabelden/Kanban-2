import React from "react";
import { useSelector } from "react-redux";
import "./styles/Profile.css";
const Profile = () => {
  const { missions } = useSelector((state) => state.missions);
  const joinedMembers = missions.filter((mission) => mission.joined);
  const { rockets } = useSelector((state) => state.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);

  return (
    <div className="profile-container">
      <div className="missions-display">
        <h2>My Missions</h2>
        {joinedMembers.length === 0 ? (
          <h3 className="mission-name">There are no active members</h3>
        ) : (
          joinedMembers.map((mission) => {
            return <li className="mission-name">{mission.mission_name}</li>;
          })
        )}
      </div>
      <div className="rockets-display">
        <h2>My Reserved Rockets</h2>
        {reservedRockets.length === 0 ? (
          <h3 className="rocket-name">You haven't reserved any rockets yet</h3>
        ) : (
          reservedRockets.map((rocket) => {
            return <li className="rocket-name">{rocket.name}</li>;
          })
        )}
      </div>
    </div>
  );
};

export default Profile;
