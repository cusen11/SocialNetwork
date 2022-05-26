import React, { useEffect } from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './Layout/Navbar';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile'; 
import Registration from './Component/Registration'; 

import { useSelector } from 'react-redux';
import LoginForm from './Component/LoginForm';  
import setAuthToken from './utils/auth';
import Dashboard from './Pages/Dashboard';   
import MessageToID from './Component/MessageToID'; 

const App = () => { 
  const token = useSelector(state => state?.login)   
  useEffect(()=>{    
      setAuthToken(token.value) 
  },[token])   



  return(
    <BrowserRouter>  
        <Navbar data={token}/> 
          {!token.value.status ? '' : <MessageToID token={token}/> } 
          <Routes> 
            <Route path="/" element={!token.value.status ? <LoginForm/> : <HomePage dataToken={token}/> }/>  
            <Route path="/registration" element={<Registration/>}/>   
            <Route path="/profile" element={!token.value.status ? <LoginForm/> :  <Profile dataToken={token.value.request_token.token}/>}/>  
            <Route path="/dashboard" element={!token.value.status ? <LoginForm/> : <Dashboard dataToken={token}/>}/>  
          </Routes>  
    </BrowserRouter>   
   
    )
}  
export default App;
