
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

export const GetInfoLoginUser = (token) => {
    let dataUser = []
    try {
        const config = {
            headers:{
                'x-auth-token': token
            }
        }
        axios.get('/api/users/',config).then(function(res){
            console.log(res.data)
        })
    } catch (err) {
        console.log(err.response.data.mgs)
    }
    return dataUser
}