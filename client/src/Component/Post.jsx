import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Typography } from 'antd';
import { formatDAY } from '../Action/func';
import CommentComponent from './Comment';
import LikePost from './LikePost'; 
import { GetAllPost } from '../Action/posts'; 
import CreatePost from './CreatePost';
import {  SyncOutlined } from '@ant-design/icons';

function Post({dataToken}) {  
    const [ load, setLoad ] = useState(false)
    const { Meta } = Card; 
    const token = dataToken.value.request_token.token  
    const posts = useSelector(state => state?.posts.value)
    const dispatch = useDispatch() 
    useEffect(()=>{
        GetAllPost(token,dispatch) 
    },[token,dispatch]) 

    useEffect(()=>{
        const loadmoreIcon = document.querySelector('.loadmore'); 
        if(loadmoreIcon) 
            window.addEventListener('scroll', ()=> {
                const a = window.innerHeight + window.scrollY
                const b = loadmoreIcon.clientHeight + loadmoreIcon.offsetTop
                if(a > b){
                    setLoad(true) 
                }
                else{
                    setLoad(false) 
                }
        })
        console.log(load)
    },[load])
    return (
        <> 
            <CreatePost dataToken={dataToken}/>
            {
                posts?.map(post =>(
                    <Card key={post._id} style={{margin: '15px 0'}}>
                        <Meta  avatar={<Avatar src={post.user.avatar}/>} title={post.user.username}/>
                        <Typography>{formatDAY(post.createdAt)}</Typography>
                        <br/>
                        <Typography level={3}>{post.content}</Typography> 
                        <LikePost data={post} token={token}/>
                        <CommentComponent data={post.comment} token={token} id={post._id} dashboard={false}/> 
                    </Card>
                    
                )) 
            }
            <Button style={{width:'100%'}} className="loadmore"
            type="text"
            icon={<SyncOutlined spin />}
            loading={200}
            size='large'
          ></Button>
        </>
    );
}

export default Post;