import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  // const joinedMembers = useSelector((state) => state.filter(mission => mission.joined));

  return (
    <div>
      <div>
        {/* <h2>My Missions</h2>
        {joinedMembers.map(mission => {
          return (
            <li>{mission.mission_name}</li>
          )
        })} */}
      </div>
    </div>
  );
}

export default Profile;
