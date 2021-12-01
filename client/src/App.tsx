import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import * as Components from './components';

import AuthService from './services/auth.service';

function App() {
  const isAuthenticated = AuthService.isLogged();
  let rand = Math.random();
  
  return (
    <Router>
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          {/* 
            Private routes
          */}
          <Route path="/" element={isAuthenticated ? <Components.TextComponent/> : <Navigate to="/login" />} />

          {/*
            Session routes  
          */}
          <Route path="login" element={!isAuthenticated ? <Components.LoginComponent/> : <Navigate to="/" />} />
          <Route path="register" element={!isAuthenticated ? <Components.RegisterComponent/> : <Navigate to="/" />} />

          {/*
            404
          */}
          <Route path="*" element={<Components.NotFound />}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
