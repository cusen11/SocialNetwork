import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LikeOutlined,LikeTwoTone } from '@ant-design/icons';
import { Button } from 'antd'; 
import { LikePostAPI, UnLikePostAPI } from '../Action/posts';
import { useDispatch, useSelector } from 'react-redux'; 

LikePost.propTypes = {
    data:PropTypes.object 
};

function LikePost({data,token}) {   
    const dispath = useDispatch()  
    const [ isLike, setIsLike ] = useState()
    const [ length, setLength ] = useState(data.likes.length)
    const user  = useSelector(state => state?.login.info)  
    useEffect(()=>{
        setIsLike(data.likes.some((like) => {return like.user === user._id})) 
    },[token,data.likes, user._id]) 
    
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