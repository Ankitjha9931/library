import Home from './pages/Home';
import Signin from './pages/Signin';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import MemberDashboard from './pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './pages/Allbooks';
import AdminDashboard from './pages/Dashboard/AdminDashboard/AdminDashboard.js';
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext.js";
import Header from '.src/Components/Header.js'

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          {/* Public Route */}
          <Route path="/Signin" element={<Signin />} />

          {/* Home Route */}
          <Route path="/home" element={<Home />} />

          {/* Default route redirects based on user role */}
          <Route
            path="/"
            element={
              user ? (
                user.isAdmin ? (
                  <Navigate to="/dashboard@admin" replace />
                ) : (
                  <Navigate to="/dashboard@member" replace />
                )
              ) : (
                <Navigate to="/Signin" replace />
              )
            }
          />

          {/* Member Dashboard Route */}
          <Route
            path="/dashboard@member"
            element={
              user ? (
                !user.isAdmin ? (
                  <MemberDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Admin Dashboard Route */}
          <Route
            path="/dashboard@admin"
            element={
              user ? (
                user.isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* All Books Route */}
          <Route path="/books" element={<Allbooks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
