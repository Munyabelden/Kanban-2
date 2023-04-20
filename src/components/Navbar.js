import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/planet.png';
import './styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <div className='display-logo'>
        <img src={logo} alt="logo" />
        <h1>Space Traveler's Hub</h1>
      </div>
      <ul className="navigation">
        <li className='rockets'>
          <NavLink to="/" isActive={() => location.pathname === '/'}>Rockets</NavLink>
        </li>
        <li className='mission'>
          <NavLink to="/mission" isActive={() => location.pathname === '/mission'}>Mission</NavLink>
        </li>
        <li className='profile-link'>
          <NavLink to="/profile" isActive={() => location.pathname === '/profile'}>My Profile</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
