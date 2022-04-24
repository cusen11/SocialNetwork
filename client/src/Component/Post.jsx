import React, { useEffect, useState } from 'react'; 
import axios from "axios"; 
import { useSelector } from 'react-redux';
import { Avatar, Card, Typography } from 'antd';
import { formatDAY } from '../Action/func';
import Comment from './Comment';
import LikePost from './LikePost';

function Post() {  
    const { Meta } = Card;
    const token = useSelector(state => state.login.value.request_token.token);  
    const [ posts, setPosts ] = useState()
    //Get All Post 
     useEffect(()=>{
        const GetAllPost = async () =>{ 
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
                posts?.map(post =>(
                    <Card key={post._id} style={{ width: 800, margin:'30px auto' }}>
                        <Meta  avatar={<Avatar src={post.user.avatar}/>} title={post.user.username}/>
                        <Typography>{formatDAY(post.createdAt)}</Typography>
                        <br/>
                        <Typography level={3}>{post.content}</Typography> 
                        <LikePost data={post.likes}/>
                        <Comment data={post.comment.length}/> 
                    </Card>
                    
                ))
            }
        </>
    );
}

export default Post;