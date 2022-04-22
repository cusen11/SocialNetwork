import React from 'react';
import PropTypes from 'prop-types';
import { LikeOutlined } from '@ant-design/icons';
import { Button } from 'antd';

LikePost.propTypes = {
    data:PropTypes.number.isRequired,
};

function LikePost({data}) {
    const likePost = () =>{
        console.log('call API Like Post')
    }
    return (
        <>
            <Button
            type="text" 
            icon={<LikeOutlined />} 
            size='large'
            onClick={likePost}
            >
                    {data === 0 ? '' : ` ${data}`} 
            </Button> 
        </>
    );
}

export default LikePost;