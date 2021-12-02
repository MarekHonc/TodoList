import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import * as Components from './components';

import AuthService from './services/auth.service';

function App() {
  // Handler pro notifikaci o přihlášení.
  const [ isAuthenticated, setIsAutheticated ] = useState(AuthService.isLogged());
  
  return (
    <Router>
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <div style={styles.absolute}>Reloaded: {Math.floor(Math.random() * 1000)}</div>
        <Routes>
          {/* 
            Private routes
          */}
          <Route path="/" element={isAuthenticated ? <Components.TextComponent /> : <Navigate to="/login" />} />

          {/*
            Session routes  
          */}
          <Route path="login" element={!isAuthenticated ? <Components.LoginComponent setAutheticated={setIsAutheticated} /> : <Navigate to="/" />} />
          <Route path="loginRedirect" element={!isAuthenticated ? <Components.LoginRedirect /> : <Navigate to = "/"/>} />
          <Route path="register" element={!isAuthenticated ? <Components.RegisterComponent /> : <Navigate to="/" />} />

          {/*
            404
          */}
          <Route path="*" element={<Components.NotFound />}/>
        </Routes>
      </main>
    </Router>
  );
}

const styles = {
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0
  },
} as const;

export default App;
