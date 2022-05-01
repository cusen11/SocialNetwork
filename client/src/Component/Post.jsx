import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, Typography } from 'antd';
import { formatDAY } from '../Action/func';
import CommentComponent from './Comment';
import LikePost from './LikePost'; 
import { GetAllPost } from '../Action/posts'; 
import CreatePost from './CreatePost';

function Post() {  
    const { Meta } = Card;
    const token = useSelector(state => state.login.value.request_token.token);  
    const posts = useSelector(state => state.posts.value)
    const dispatch = useDispatch()
    //Get All Post 
    useEffect(()=>{
        GetAllPost(token,dispatch) 
    },[token,dispatch]) 
    return (
        <> 
            <CreatePost/>
            {
                posts?.map(post =>(
                    <Card key={post._id} style={{margin: '15px 0'}}>
                        <Meta  avatar={<Avatar src={post.user.avatar}/>} title={post.user.username}/>
                        <Typography>{formatDAY(post.createdAt)}</Typography>
                        <br/>
                        <Typography level={3}>{post.content}</Typography> 
                        <LikePost data={post}/>
                        <CommentComponent data={post.comment} token={token} id={post._id}/> 
                    </Card>
                    
                )) 
            }
        </>
    );
}

export default Post;