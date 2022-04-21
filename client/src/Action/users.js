
import axios from 'axios' 
import { login } from '../reducers/Login';  


export const loginAuthor = async (values ,dispatch) =>{  
    try {
        const body = JSON.stringify(values);
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        
        await axios.post('/api/auth/login',body, config).then(function(res){
            dispatch(login(res)) 
        })
    } catch (err) { 
        alert(err.response.data.mgs)
    } 
} 