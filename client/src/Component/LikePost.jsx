import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LikeOutlined,LikeTwoTone } from '@ant-design/icons';
import { Button } from 'antd'; 
import { LikeAndUnlikePost } from '../Action/posts';
import { useSelector } from 'react-redux';
import { GetInfoLoginUser } from '../Action/users';

LikePost.propTypes = {
    data:PropTypes.object 
};

function LikePost({data}) {  
    const token = useSelector(state => state.login.value.request_token.token);
    const [ isLike, setIsLike ] =useState()
    useEffect(()=>{
        const isLikeFunc = async () =>{
            const user = await GetInfoLoginUser(token);
            const userId = user._id  
            setIsLike(data.likes.some((like) => {return like.user === userId})) 
        } 
        isLikeFunc()
    },[token,data.likes]) 
    return (
        <>
            <Button
            type="text" 
            icon={!isLike ? <LikeOutlined /> : <LikeTwoTone />} 
            size='large'
            onClick={()=>LikeAndUnlikePost(data,token)}
            >
                    {data.likes.length === 0 ? '' : ` ${data.likes.length}`} 
            </Button> 
        </>
    );
}

export default LikePost;