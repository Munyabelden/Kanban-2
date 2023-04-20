import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Mission from './components/Mission';
import Profile from './components/Profile';
import Rockets from './components/Rockets';

const App = () => {
  return (
    <div className="App">
       <Navbar />
       <Routes>
          <Route path="/" element={<Rockets />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/profile" element={<Profile />} />
       </Routes>
    </div>
  );
}

export default App;
