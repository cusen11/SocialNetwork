import React from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 

import 'antd/dist/antd.css';
import './Assets/Style/style.scss';

import Navbar from './Layout/Navbar';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import Login from './Component/Login';



const App = () =>  
    <BrowserRouter> 
      <Navbar/> 
      <Routes>
        <Route index path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes> 
    </BrowserRouter> 
export default App;
