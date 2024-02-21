import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login from './auth/Login';
import Layout from './pages/Layout'
import ChangePassword from "./auth/ChangePassword";

function App() {
  return (


      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Login />} />
                  <Route path="changepassword" element={<ChangePassword />} />

              </Route>
          </Routes>
      </BrowserRouter>


    <div className="App">
      <Login/>
    </div>
   
  );
}

export default App;
