import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'; 
import io from 'socket.io-client';

function UserOnline() {
    const ENDPONT = 'http://localhost:5000/'
    const socket = io(ENDPONT)

    const [users, setUsers] = useState()
    useEffect(()=>{ 
        socket.on('getUser',data =>{
            setUsers(data)  
        }) 
    },[users]) 
    const handleClickOnlineFriend = (user) =>{
        console.log(user)
    }
    return ( 
        <Row className="chat-box list-friend" justify='start'> 
                <Col className="name-box">Online</Col> 
                <Col className="online-friend">
                    <ul>
                        {users?.map(user =>
                            <li onClick={()=>{handleClickOnlineFriend(user)}} key={user.socketId}>{user.data.username}</li>                            
                        )}
                    </ul>
                </Col> 
        </Row>
        
    );
}

export default UserOnline;