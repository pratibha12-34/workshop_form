import React from 'react';
import Register from './Register.jsx';
import Home from './Home.jsx';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css'

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/register" replace />} />
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  )

}

export default App
