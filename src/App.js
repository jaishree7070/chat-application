import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import "./styles.scss"
import {
  Route, Routes,
  BrowserRouter as Router,
  Navigate
} from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<p>Error</p>} />
      </Routes>
    </Router>
  );
}

export default App;
