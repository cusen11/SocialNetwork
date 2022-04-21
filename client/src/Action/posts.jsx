import axios from "axios";
import Post from "../Component/Post";


//Get All Post

export const GetAllPost = async (token) =>{
    try {
        const config = { 
            headers:{ 
                'x-auth-token': token
            }
        } 
        await axios.get('/api/posts/', config).then(function(res){
            console.log(res.data)
        }) 
    } catch (err) {
        alert(err.respond.data.msg)
    }
    
}