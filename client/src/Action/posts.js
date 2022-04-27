import axios from "axios"; 
import { GetPost } from "../reducers/Posts";
import { error, success } from "./func";

export const LikePostAPI = async (id,token,dispatch) => { 
    console.log(id)  
    try {
        const config = { 
            headers:{ 
                'x-auth-token': token
            } 
        } 
        axios.put(`/api/posts/like/${id}`,config).then(()=>{
            GetAllPost(token, dispatch)
        });  
        
    } catch (err) {
        console.log(err.respond.data.msg)
    }
} 
export const UnLikePostAPI = async (id,token,dispatch) => {   
    try {
        const config = { 
            headers:{ 
                'x-auth-token': token
            } 
        }
        axios.put(`/api/posts/unlike/${id}`,config).then(()=>{
            GetAllPost(token, dispatch)
        });   
    } catch (err) {
        console.log(err.respond.data.msg)
    }
} 
export const GetAllPost = async(token,dispatch) =>{   
    try {
        const config = { 
            headers:{ 
                'x-auth-token': token
            }
        } 
        await axios.get('/api/posts/', config).then(function(res){
            dispatch(GetPost(res)) 
        }) 
    } catch (err) {
        alert(err.respond.data.msg)
    } 
     
}

export const CreatePostAPI = async(data,token,dispatch) => {
    try {
        const body = JSON.stringify(data)
        const config = {
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            }
        } 
        await axios.post('/api/posts/add', body, config).then(()=>{
            success('Create post Success!!!')
            GetAllPost(token,dispatch)
            
        }) 
    } catch (err) {
        error(err.respond.data.msg) 
    }
}