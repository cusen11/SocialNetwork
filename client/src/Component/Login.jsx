import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

function Login() {
    
    const token = useSelector(state => state.login);  
    console.log(token.value)
    return (
        <>
          {
              token !== null ? <LoginForm/> : 
              <div>
                <h1>Đã login</h1>  
              </div>  
          }
        </>
    );
}

export default Login;