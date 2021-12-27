import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import * as Components from './components';

import AuthService from './services/auth.service';

function App() {
  // Získání usera.
  const user = AuthService.getCurrentUser();

  // Handler pro notifikaci o přihlášení.
  const [ isAuthenticated, setIsAutheticated ] = useState(user != null);

  // OVerlay pro shadow efekt na telefonu.
  const [ useOverLay, setUseOverlay ] = useState(false);
  
  return (
    <Router>
      <main className="min-h-screen bg-gray-50 flex flex-col w-screen h-screen">        
        {
          isAuthenticated ?
            <Components.Navbar 
              userName={user.userName}
              selectedPage={window.location.pathname}
              setOverlay={setUseOverlay}
              setAuthenticated={setIsAutheticated} 
              /> :
            <></>
        }
        
        <div className={"w-screen h-screen absolute bg-gray-100 opacity-50 z-0 " + (useOverLay ? "" : "hidden")}></div>

          <Routes>
            {/* 
              Private routes
            */}
            <Route path="/" element={isAuthenticated ? <Components.TaskList /> : <Navigate to="/login" />} />
            <Route path="categories" element={isAuthenticated ? <Components.CategoryList /> : <Navigate to="/login" />} />

            {/*
              Session routes  
            */}
            <Route path="login" element={!isAuthenticated ? <Components.Login setAutheticated={setIsAutheticated} /> : <Navigate to="/" />} />
            <Route path="loginRedirect" element={!isAuthenticated ? <Components.LoginRedirect /> : <Navigate to = "/"/>} />
            <Route path="register" element={!isAuthenticated ? <Components.Register /> : <Navigate to="/" />} />
            <Route path="logout" element={!isAuthenticated ? <Components.Logout /> : <Navigate to="/"/>} />

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
