import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './CSS/index.css';
import App from './Components/App';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Profile from './Components/Profile';
import Restaurant from './Components/Restaurant';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/restaurant/:id" element={<Restaurant />}/>
      </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
