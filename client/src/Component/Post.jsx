import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { Avatar, Card, Typography } from 'antd';
import { formatDAY } from '../Action/func';
import Comment from './Comment';
import LikePost from './LikePost'; 
import { GetAllPost } from '../Action/posts';

function Post() {  
    const { Meta } = Card;
    const token = useSelector(state => state.login.value.request_token.token);  
    const [ posts, setPosts ] = useState()
    //Get All Post 
    useEffect(()=>{
        const getPost = async () =>{ 
            const dataPost = await GetAllPost(token)
             setPosts(dataPost)
         }
         getPost();
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
                        <LikePost data={post}/>
                        <Comment data={post.comment.length}/> 
                    </Card>
                    
                ))
            }
        </>
    );
}

export default Post;