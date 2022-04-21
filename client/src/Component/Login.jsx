import React from 'react'; 
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm'; 
import { useNavigate } from "react-router-dom";

function Login() {
    const token = useSelector(state => state.login);
    const { login } = token.value;
    const navigate = useNavigate()  
    return (
        <>
          {
              login ? () => navigate('/') : <LoginForm/> 
          }
        </>
    );
}

export default Login;