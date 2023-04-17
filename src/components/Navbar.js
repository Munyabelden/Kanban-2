import { NavLink } from 'react-router-dom';
import logo from '../assets/planet.png';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className='display-logo'>
      <img src={logo} alt="logo" />
      <h1>Space Traveler's Hub</h1>
      </div>
        <ul className="navigation">
          <li className='rockets'><NavLink to="/">Rockets</NavLink></li>
          <li className='mission'><NavLink to="/mission">Mission</NavLink></li>
          <li className='profile-link'><NavLink to="/profile">My Profile</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar;