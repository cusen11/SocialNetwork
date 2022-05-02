import axios from 'axios' 
import { login, userInfo } from '../reducers/Login';  


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
            GetInfoLoginUser(res.data.token,dispatch)  
        })
    } catch (err) { 
        alert(err.response.data.mgs)
    } 
} 

export const GetInfoLoginUser = async (token,dispatch) => { 
    let dataUser;
    try {
        const config = {
            headers:{
                'x-auth-token': token
            }
        }
        await axios.get('/api/users/',config).then(function(res){
            dataUser = res.data
            dispatch(userInfo(dataUser))
            
        })
       
    } catch (err) {
        console.log(err.response.data.mgs)
    }  
}

