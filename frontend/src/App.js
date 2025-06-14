import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Homepage from './components/Homepage';
import OBpage from './components/OBpage';
import Counter from './components/Counter';
import StudentDetail from './components/StudentDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/:obpage" element={<OBpage />} />  
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path='/counter' element={<Counter />} /> 
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;