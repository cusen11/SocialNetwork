import React from 'react';
import PropTypes from 'prop-types';
import { LikeOutlined } from '@ant-design/icons';
import { Button } from 'antd'; 
import { LikeAndUnlikePost } from '../Action/posts';
import { useSelector } from 'react-redux';

LikePost.propTypes = {
    data:PropTypes.array.isRequired, 
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
                    {data.length === 0 ? '' : ` ${data.length}`} 
            </Button> 
        </>
    );
}

export default LikePost;