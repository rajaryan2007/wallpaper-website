import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";

import Login from "./assets/auth/Login";
import Register from "./assets/auth/Register";
import AllImage from "./assets/wallpaper.jsx/AllImage";
import SingleImage from "./assets/wallpaper.jsx/SingleImage";
import UploadImage from "./assets/wallpaper.jsx/ImageUplaod";
import DeleteImage from "./assets/wallpaper.jsx/DeleteImage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children; 
}

function RoleProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/all-image" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      
        <Routes>
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

      
          <Route
            path="/all-image"
            element={
              <ProtectedRoute>
                <AllImage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/image/:id"
            element={
              <ProtectedRoute>
                <SingleImage />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/upload"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <UploadImage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/delete"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <DeleteImage />
              </RoleProtectedRoute>
            }
          />


          <Route path="*" element={<Navigate to="/all-image" replace />} />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
