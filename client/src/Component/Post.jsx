import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Typography } from 'antd';
import { formatDAY } from '../Action/func';
import CommentComponent from './Comment';
import LikePost from './LikePost'; 
import { GetAllPostPagination } from '../Action/posts'; 
import CreatePost from './CreatePost';
import {  SyncOutlined } from '@ant-design/icons'; 

function Post({dataToken}) {    
    const dispatch = useDispatch() 
    const { Meta } = Card; 

    const [ load, setLoad ] = useState(true); 
    const [ limit, setLimit ] = useState(5);

    const token = dataToken.value.request_token.token; 
    const posts = useSelector(state => state?.posts.value)
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
    })
    const loadMoreFunc = () =>{ 
            if(posts.currentPage !== posts.totalPage){ 
                setLimit(limit + 5)
                GetAllPostPagination(token,dispatch, 1,limit)
            } 
    }
    useEffect(()=>{ 
        if(load){
            loadMoreFunc()
        } 
    },[load])
    
    return (
        <> 
            <CreatePost dataToken={dataToken} limit={limit}/>
            {
                posts.results?.map(post =>(
                    <Card key={post._id} style={{margin: '15px 0'}}>
                        <Meta  avatar={<Avatar src={post.user.avatar}/>} title={post.user.username}/>
                        <Typography>{formatDAY(post.createdAt)}</Typography>
                        <br/>
                        <Typography level={3}>{post.content}</Typography> 
                        <LikePost data={post} token={token} limit={limit}/>
                        <CommentComponent data={post.comment} token={token} limit={limit} id={post._id} dashboard={false}/> 
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