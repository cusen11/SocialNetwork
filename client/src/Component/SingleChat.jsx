import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import io from 'socket.io-client'; 
import { CloseOutlined } from '@ant-design/icons';
import { GetConversationId, GetMessageByConversationId } from '../Action/message';
import { Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

function SingleChat({token,data, handleCloseMessage}) { 
    const dataUser = useSelector(state => state.login.info) 
    const ENDPONT = 'http://localhost:5000/'
    const socket = io(ENDPONT)
    const [height, setHeight] = useState(true) 
    const [messages, setMessages] = useState()
    const [conversationId, setConversationId] = useState()
    const [ client, setClient ] = useState()
    const [ room, setRoom ] = useState()  
    const [dataText, setDataText] = useState('')
    const boxMessage = useRef()  
    const [form] = Form.useForm();
    const onFinish = () => {   
        socket.emit('client-send-data',{dataUser, dataText}) 
        form.resetFields();
        
        const newa = { 
            conversationId: data.conversation,
            text: "nô nô",
            user: {
                _id: "623ada0bc390cedaeb576637",
                username: "Thành Tuân",
                avatar: "//www.gravatar.com/avatar/c0c5d1d5c10532a79a57c74c6b78805c?s=200&r=pg&d=mm"
            } 
        } 
        setMessages(messages => [...messages,newa]) 
        setTimeout(()=>{
            boxMessage.current.scrollIntoView(
                {
                  behavior: 'smooth',
                  block: 'end',
                  inline: 'nearest'
                })
        })
    }; 
    useEffect(()=>{ 
        socket.on('server-send-data-room',(data)=>{
            setRoom(data)
        })
        socket.on('server-send-data',(data)=>{
            setClient(data) 
        })  
        const GetConversationID = async() =>{
            const conversationResult = await GetConversationId(data.conversation) 
            if(conversationResult.length === 0){  
                console.log('tạo mới cuộc hội thoại')
            }else { 
                setConversationId(conversationResult[0]._id)
            }
        }
        GetConversationID()
       
    },[]) 
    useEffect(()=>{
        const getMassage = async()=>{ 
            const newMessage = await GetMessageByConversationId(token,conversationId)
            setMessages(newMessage)
            
            boxMessage.current.scrollIntoView(
                {
                  behavior: 'smooth',
                  block: 'end',
                  inline: 'nearest'
                })
        }
        getMassage()
        
    },[conversationId]) 
    
    return (
        <Row className="chat-box">
            <Row className="name-box" justify='space-between' style={{width: '100%'}}>
                <Col><Link to='/'>{data.user.data.username}</Link></Col> 
                <Col style={{width: '50%', height:'100%'}} onClick={()=> setHeight(!height) } ></Col>
                <Col style={{width: '10%'}}>
                    <Button onClick={()=>handleCloseMessage(data.user.socketId)} ghost icon={<CloseOutlined/>} /> 
                </Col>
            </Row>
            
            <Row  justify='start' wrap='wrap' style={{height: height ? '360px' : '0' }}>
                <Col md={24} xs={24} className="box-massage">
                    
                    {messages?.map((m,index) =>
                        <Message key={index} data={m} position={dataUser._id !== m.user._id ? true : false}/>
                    )}
                    <span ref={boxMessage}></span>
                
                </Col>
                <Col md={24} xs={24} >
                    <Form 
                        form={form} 
                        name='basic'
                        style={{width:'100%',display:'flex',padding: '0 20px', marginTop:'30px'}}
                        onFinish={onFinish} 
                    >
                        <Form.Item name='text' style={{width:'100%'}}>
                            <Input className='input-message' placeholder='Tâm sự mỏng tại đây...' onChange={(e)=> setDataText(e.target.value)} />
                        </Form.Item>
                        
                    </Form> 
                </Col>  
            </Row> 
        </Row>
    );
}

export default SingleChat;