import axios from "axios"; 
import { GetPost } from "../reducers/Posts";
import { error, success } from "./func";

export const LikePostAPI = async (id,token,dispatch) => {   
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
        console.log(err.respond.data.msg)
    } 
     
}

export const GetPostById = async(token,id) =>{   
    try {
        const config = { 
            headers:{ 
                'x-auth-token': token
            }
        }  
        const res = await axios.get(`/api/posts/${id}`, config)
        return res.data
    } catch (err) {
        console.log(err.respond.data.msg)
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

export const  PaginationArray = (array, pageSize, PageNumber) =>{
    return array.slice((PageNumber - 1) * pageSize, PageNumber * pageSize);
}

export const AddComment = async (token, text,id, dispatch) =>{
    try {
        const config = {
            headers:{
                'x-auth-token': token,
                'Content-Type': 'application/json'
            }
        }
        await axios.put(`/api/posts/comment/${id}`, text, config).then(()=>{
            success('Add new comment success!!!')
            GetAllPost(token,dispatch) 
        }) 

    } catch (err) { 
        error(err.response.data.msg)
    }
}
export const removeComment = async(token,postId,id,dispatch) =>{ 
        try {
            const config = {
                headers: {
                    'x-auth-token': token
                }
            }
            if (window.confirm('Bạn có chắc chắn xóa comment này?'))
                await axios.delete(`/api/posts/comment/${postId}/${id}`,config).then((res)=>{
                    success('Xóa thành công!!!')
                    GetAllPost(token,dispatch) 
                }) 
        } catch (err) {  
            error(err.response.data.msg)
        } 
}