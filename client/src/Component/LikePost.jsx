import React from 'react';
import PropTypes from 'prop-types';
import { LikeOutlined } from '@ant-design/icons';
import { Button } from 'antd'; 
import { LikeAndUnlikePost } from '../Action/posts';
import { useSelector } from 'react-redux';

LikePost.propTypes = {
    data:PropTypes.object 
};

function LikePost({data}) {  
    const token = useSelector(state => state.login.value.request_token.token);
    return (
        <>
            <Button
            type="text" 
            icon={<LikeOutlined />} 
            size='large'
            onClick={()=>LikeAndUnlikePost(data,token)}
            >
                    {data.likes.length === 0 ? '' : ` ${data.likes.length}`} 
            </Button> 
        </>
    );
}

export default LikePost;