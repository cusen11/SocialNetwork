import React from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 

import 'antd/dist/antd.css';
import './Assets/Style/style.scss';

import Navbar from './Layout/Navbar';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import Login from './Component/Login';
import Registration from './Component/Registration';

//redux
import { persistStore } from 'redux-persist'; 
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import store from './store';


let persistor = persistStore(store);

const App = () =>  
<Provider store={store}> 
  <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter> 
        <Navbar/> 
        <Routes>
          <Route index path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/> 
          <Route path="/registration" element={<Registration/>}/>
        </Routes> 
      </BrowserRouter> 
    </PersistGate>
  </Provider>
export default App;
