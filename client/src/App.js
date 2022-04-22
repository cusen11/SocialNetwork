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
const App = () => {
  
  const token = useSelector(state => state.login); 
  const { login } = token.value;  
  useEffect(()=>{ 
      setAuthToken(token)  
  },[token])
  return(
    <BrowserRouter>  
        <Navbar/> 
        {!login ? <LoginForm/> :
        <Routes>
          <Route index path="/" element={<HomePage/>}/> 
          <Route path="/profile" element={<Profile/>}/> 
          <Route path="/registration" element={<Registration/>}/>
        </Routes> 
        }
         
    </BrowserRouter> 
    )
}  
export default App;
