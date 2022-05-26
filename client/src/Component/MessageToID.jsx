import axios from 'axios';
import React, { useEffect, useState } from 'react'; 
import SingleChat from './SingleChat';
import io from 'socket.io-client'; 
import { Col, Row } from 'antd';

function MessageToID({token}) { 
    const tokenKey = token.value.request_token.token 
    const ENDPONT = 'http://localhost:5000/'
    const socket = io(ENDPONT) 
    const [users, setUsers] = useState()
    const [chatData, setChatData] = useState([])
    useEffect(()=>{
        socket.on('connect', async()=>{ 
            try {
                const config = {
                    headers:{
                        'x-auth-token': tokenKey
                    }
                }
                const res = await axios.get('/api/users/',config)  
                socket.emit('setup',res.data)  
               
            } catch (err) {
                console.log(err.response.data.mgs)
            }  
        })  
        
    },[]) 
    
    useEffect(()=>{
        socket.on('connect', async()=>{ 
            socket.on('getUser',data =>{
                setUsers(data)  
            })
        }) 
    },[users]) 
    const handleClickOnlineFriend = (user) =>{
        const conversation = {
            "senderId": token.info._id,
            "userId":user.data._id
        }
        const newChatData = {conversation, user}
        setChatData(chatData => [...chatData,newChatData])  
    }
    return (
        <>
            <div className='box-chat-parent'>
                {
                    chatData.map((chat,index) => (
                        <SingleChat key={index} token={tokenKey} data={chat} /> 
                    ))
                }
               
            </div>
            <Row className="chat-box list-friend" justify='start'> 
                <Col className="name-box">Online</Col> 
                <Col className="online-friend">
                    <ul>
                        {users?.map(user =>
                            <li 
                                style={{display: token.info._id === user.data._id ? 'none' : 'block'}} 
                                onClick={()=>{handleClickOnlineFriend(user)}} 
                                key={user.socketId}
                            >
                                {user.data.username}
                            </li>                            
                        )}
                    </ul>
                </Col> 
            </Row>
        </>
    );
}

export default MessageToID;