import { Avatar, Card, Col, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDAY } from '../Action/func';
import { GetPostByUserId } from '../Action/posts';
import CommentComponent from '../Component/Comment';
import LikePost from '../Component/LikePost';

function Dashboard({dataToken}) { 
    const { Meta } = Card; 
    const token = dataToken.value.request_token.token  
    const posts = useSelector(state => state?.posts.users)
    const dispatch = useDispatch() 
    useEffect(()=>{
        GetPostByUserId(token,dispatch) 
    },[token,dispatch]) 
    return (
        <Row className="wrapperInner">
            <Col md={24} xs={24}>
                {
                    posts?.map(post =>(
                        <Card key={post._id} style={{margin: '15px 0'}}>
                            <Meta  avatar={<Avatar src={post.user.avatar}/>} title={post.user.username}/>
                            <Typography>{formatDAY(post.createdAt)}</Typography>
                            <br/>
                            <Typography level={3}>{post.content}</Typography> 
                            <LikePost data={post} token={token}/>
                            <CommentComponent data={post.comment} token={token} id={post._id} dashboard={true}/> 
                        </Card>
                        
                    )) 
                }
            </Col>
        </Row>
    );
}

export default Dashboard;