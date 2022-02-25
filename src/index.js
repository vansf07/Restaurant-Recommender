import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './CSS/index.css';
import App from './Components/App';
import Login from './Components/Login';
import Profile from './Components/Profile';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
