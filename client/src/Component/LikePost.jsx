import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LikeOutlined,LikeTwoTone } from '@ant-design/icons';
import { Button } from 'antd'; 
import { LikePostAPI, UnLikePostAPI } from '../Action/posts';
import { useDispatch, useSelector } from 'react-redux';
import { GetInfoLoginUser } from '../Action/users';

LikePost.propTypes = {
    data:PropTypes.object 
};

function LikePost({data}) {  
    const dispath = useDispatch()
    const token = useSelector(state => state.login.value.request_token.token); 
    const [ isLike, setIsLike ] = useState()
    const [ length, setLength ] = useState(data.likes.length)
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
            {
                !isLike ?
                <Button
                type="text" 
                icon={<LikeOutlined />} 
                size='large'
                onClick={()=>{
                    LikePostAPI(data._id,token,dispath)
                    setIsLike(!isLike)
                    setLength(length + 1)
                }}
                >
                        {length === 0 ? '' : ` ${length}`} 
                </Button> 
                :
                <Button
                type="text" 
                icon={<LikeTwoTone/>} 
                size='large'
                onClick={()=>{
                    UnLikePostAPI(data._id,token,dispath)
                    setIsLike(!isLike)
                    setLength(length - 1)
                }}
                >
                        {length === 0 ? '' : ` ${length}`} 
                </Button>
            } 
        </>
    );
}

export default LikePost;