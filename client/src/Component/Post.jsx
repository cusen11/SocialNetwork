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
    const [postsPagination , setPostsPagination] =useState()
    const [ load, setLoad ] = useState(false);
    const { Meta } = Card; 
    const token = dataToken.value.request_token.token; 
    const posts = useSelector(state => state?.posts.value) 
    const dispatch = useDispatch() 
    useEffect(()=>{
        GetAllPost(token,dispatch)  
        
    },[token,dispatch]) 
    const newPosts = [
        {
            "_id": "62728d53a96544060f9af7dd",
            "user": "623ada0bc390cedaeb576637",
            "content": "Tôi yêu tổ quốc và đồng bào\n",
            "likes": [
                {
                    "user": "623ada1ac390cedaeb57663a",
                    "_id": "62733da9cdc03e876f86fb25"
                },
                {
                    "user": "623ada0bc390cedaeb576637",
                    "_id": "62728d58a96544060f9af7e2"
                }
            ],
            "comment": [
                {
                    "user": "623ada0bc390cedaeb576637",
                    "text": "hì",
                    "username": "Thành Tuân",
                    "avatar": "//www.gravatar.com/avatar/c0c5d1d5c10532a79a57c74c6b78805c?s=200&r=pg&d=mm",
                    "_id": "6272a4ffdbf876687c9159a8",
                    "date": "2022-05-04T16:08:31.730Z"
                },
                {
                    "user": "623ada1ac390cedaeb57663a",
                    "text": "check thử",
                    "username": "Thùy Tran",
                    "avatar": "//www.gravatar.com/avatar/43c3e1236c27ec6bd1ff03e58378bbdf?s=200&r=pg&d=mm",
                    "_id": "6272a1473eedcd63e926c297",
                    "date": "2022-05-04T15:52:39.027Z"
                },
                {
                    "user": "623ada0bc390cedaeb576637",
                    "text": "test",
                    "username": "Thành Tuân",
                    "avatar": "//www.gravatar.com/avatar/c0c5d1d5c10532a79a57c74c6b78805c?s=200&r=pg&d=mm",
                    "_id": "6272970a23a709ca06060048",
                    "date": "2022-05-04T15:08:58.783Z"
                },
                {
                    "user": "623ada0bc390cedaeb576637",
                    "text": "cmt",
                    "username": "Thành Tuân",
                    "avatar": "//www.gravatar.com/avatar/c0c5d1d5c10532a79a57c74c6b78805c?s=200&r=pg&d=mm",
                    "_id": "627296f723a709ca0606003f",
                    "date": "2022-05-04T15:08:39.742Z"
                }
            ],
            "createdAt": "2022-05-04T14:27:31.284Z",
            "updatedAt": "2022-05-05T02:59:53.761Z",
            "__v": 14
        },
        {
            "_id": "6271500eda283e23ed60b256",
            "user": "624414ba6b2c08c307099de3",
            "content": "Viết tâm sự lên đây",
            "likes": [
                {
                    "user": "623ada1ac390cedaeb57663a",
                    "_id": "627245b650c61c2ecbd6557d"
                },
                {
                    "user": "624414ba6b2c08c307099de3",
                    "_id": "62715161da283e23ed60b26a"
                }
            ],
            "comment": [
                {
                    "user": "624414ba6b2c08c307099de3",
                    "text": "lại cái nào",
                    "username": "Thành Tuân New 5",
                    "avatar": "//www.gravatar.com/avatar/fa479618d745eadde4e123a173ff6ba9?s=200&r=pg&d=mm",
                    "_id": "62715bf61ead163d96adcd0c",
                    "date": "2022-05-03T16:44:38.874Z"
                }
            ],
            "createdAt": "2022-05-03T15:53:50.403Z",
            "updatedAt": "2022-05-04T09:21:58.857Z",
            "__v": 5
        }
    ]
    useEffect(()=>{
        setPostsPagination(posts) 
        const arr = [...postsPagination,...newPosts]
        console.log(arr)
    },[posts])
    
    
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