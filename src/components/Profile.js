import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { missions } = useSelector((state) => state.missions);
  const joinedMembers = missions.filter((mission) => mission.joined);
  const { rockets } = useSelector((state) => state.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);

  if (!joinedMembers) {
    return <h3>There are no active members</h3>;
  }

  return (
    <div>
      <div>
        <h2>My Missions</h2>
        {joinedMembers.map((mission) => {
          return <li>{mission.mission_name}</li>;
        })}
      </div>
      <div>
        <h2>My Reserved Rockets</h2>
        {reservedRockets.length === 0 ? (
          <h3>You haven't reserved any rockets yet</h3>
        ) : (
          reservedRockets.map((rocket) => {
            return <li>{rocket.name}</li>;
          })
        )}
      </div>
    </div>
  );
};

export default Profile;
