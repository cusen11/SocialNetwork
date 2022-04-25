import { GetInfoLoginUser } from "./users" ;
import axios from "axios"; 
import { GetPost } from "../reducers/Posts";


export const LikeAndUnlikePost = async (data,token,dispatch) => {  
    const user = await GetInfoLoginUser(token);
    const userId = user._id  
    const userExist = data.likes.some((like) => {return like.user === userId});  
    try {
        const config = { 
            headers:{ 
                'x-auth-token': token
            } 
        }
        if(!userExist){
            axios.put(`/api/posts/like/${data._id}`,config); 
        }
        else{
            axios.put(`/api/posts/unlike/${data._id}`,config);
        }  
        GetAllPost(token, dispatch)
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
            dispatch(GetPost(res)) 
        }) 
    } catch (err) {
        alert(err.respond.data.msg)
    } 
     
}