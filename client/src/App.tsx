import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/AuthPage';
import DrivePage from './pages/DrivePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/drive" 
            element={
              <PrivateRoute>
                <DrivePage />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/drive" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;