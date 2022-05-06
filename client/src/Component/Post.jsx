import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Typography } from 'antd';
import { formatDAY } from '../Action/func';
import CommentComponent from './Comment';
import LikePost from './LikePost'; 
import { GetAllPostPagination } from '../Action/posts'; 
import CreatePost from './CreatePost';
import {  SyncOutlined } from '@ant-design/icons';
import { GetPost } from '../reducers/Posts';

function Post({dataToken}) {    
    const dispatch = useDispatch() 
    const { Meta } = Card; 

    const [ load, setLoad ] = useState(true); 
    const [ limit, setLimit ] = useState(5);

    const token = dataToken.value.request_token.token; 
    const posts = useSelector(state => state?.posts.value)
    useEffect(()=>{  
       const initData = async()=>{
            const newPosts = await GetAllPostPagination(token, 1,limit)   
            dispatch(GetPost(newPosts)) 
       }
       initData()
    },[])
    useEffect(()=>{ 
        const loadmoreIcon = document.querySelector('.loadmore'); 
        if(loadmoreIcon) 
            window.addEventListener('scroll',async ()=> {
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
    const loadMoreFunc = async() =>{ 
            if(posts.currentPage !== posts.totalPage){ 
                setLimit(limit + 5)
                const newPosts = await GetAllPostPagination(token, 1,limit)   
                dispatch(GetPost(newPosts)) 
            } 
    }
    useEffect(()=>{ 
        if(load){
            loadMoreFunc()
        } 
    },[load])
    
    return (
        <> 
            <CreatePost dataToken={dataToken}/>
            {
                posts.results?.map(post =>(
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
            <Button hidden={posts.currentPage === posts.totalPage} style={{width:'100%'}} className="loadmore"
            type="text"
            icon={<SyncOutlined spin />}
            loading={200}
            size='large'
          ></Button>
        </>
    );
}

export default Post;