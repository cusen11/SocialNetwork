import { GetInfoLoginUser } from "./users" ;
import axios from "axios"; 

export const LikeAndUnlikePost = async (data,token) => {  
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
    } catch (err) {
        console.log(err.respond.data.msg)
    }
} 

export const GetAllPost = async(token) =>{ 
    let dataPost;
    try {
        const config = { 
            headers:{ 
                'x-auth-token': token
            }
        } 
        await axios.get('/api/posts/', config).then(function(res){
            dataPost = res.data  
        })
    } catch (err) {
        alert(err.respond.data.msg)
    } 
    return dataPost
}