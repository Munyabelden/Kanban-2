import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { missions } = useSelector(state => state.missions);
  const joinedMembers = missions.filter(mission => mission.joined);

  if(! joinedMembers){
    return (<h3>There are no active members</h3>)
  }
  
  return (
    <div>
      <div>
        <h2>My Missions</h2>
        {joinedMembers.map(mission => {
          return (
            <li>{mission.mission_name}</li>
          )
        })}
      </div>
    </div>
  );
}

export default Profile;
