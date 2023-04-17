import { NavLink } from 'react-router-dom';
import logo from '../assets/planet.png';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <img src={logo} alt="logo" />
      <div className="navigation">
        <h1>Space Travellers Hub</h1>
        <ul>
          <li><NavLink to="/">Rockets</NavLink></li>
          <li><NavLink to="/mission">Mission</NavLink></li>
          <li><NavLink to="/profile">MyProfile</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;