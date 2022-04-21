import React, { useEffect, useState } from 'react'; 
import axios from "axios"; 

function Post({token}) {   
    const { posts, setPosts } = useState([])
    //Get All Post 
     useEffect(()=>{
        const GetAllPost = async (token) =>{
            try {
                const config = { 
                    headers:{ 
                        'x-auth-token': token
                    }
                } 
                await axios.get('/api/posts/', config).then(function(res){
                    setPosts(res.data)
                }) 
            } catch (err) {
                alert(err.respond.data.msg)
            }
            
        }
        GetAllPost();
     },[token])
    return (
        <>
            {
                posts?.map(item =>(
                    console.log(item)
                ))
            }
        </>
    );
}

export default Post;