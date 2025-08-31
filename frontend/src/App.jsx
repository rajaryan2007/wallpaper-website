import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/auth/Login';
import AllImage from './assets/wallpaper.jsx/AllImage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<AllImage />} />
      </Routes>
    </Router>
  );
}

export default App;
