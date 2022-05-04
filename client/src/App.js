import React, { useEffect } from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './Layout/Navbar';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile'; 
import Registration from './Component/Registration';

//redux 
import { useSelector } from 'react-redux';
import LoginForm from './Component/LoginForm';  
import setAuthToken from './utils/auth';
import Dashboard from './Pages/Dashboard';
const App = () => { 
  const token = useSelector(state => state.login)  
  useEffect(()=>{    
      setAuthToken(token.value) 
  },[token])   
  return(
    <BrowserRouter>  
        <Navbar data={token}/>
        {!token.value.status ? 
          <LoginForm/> 
          :
          <Routes>
            <Route index path="/" element={<HomePage dataToken={token}/>}/> 
            <Route path="/profile" element={<Profile/>}/> 
            <Route path="/registration" element={<Registration/>}/> 
            <Route path="/dashboard" element={<Dashboard dataToken={token}/>}/>

          </Routes>  
        }
    </BrowserRouter>   
   
    )
}  
export default App;
