import { Avatar } from 'antd';
import React from 'react';

function Message({data,position}) {
    return (
        <div className={!position ? 'message-box current' : 'message-box friend'}>
             {position ? <Avatar size={30} src={data.user.avatar} /> : ''}
             <span className='text-box'> {data.text}</span>
        </div>
    );
}

export default Message;