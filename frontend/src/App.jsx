import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/auth/Login';
import AllImage from './assets/wallpaper.jsx/AllImage';


function App() {
  return (
    
         <Routes>
      <Route path="/login" element={<Login />} />
         </Routes>
      
  );
}

export default App;
