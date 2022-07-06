import { Button, Col, Form, Input, Row, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import io from 'socket.io-client'; 
import { CloseOutlined } from '@ant-design/icons';
import { GetConversationId, GetMessageByConversationId, sendTextConversationId } from '../Action/message';
import { Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

function SingleChat({token,data, messages, handleCloseMessage,assignMessage}) { 
    const dataUser = useSelector(state => state.login.info) 
    const ENDPONT = 'http://localhost:5000/'
    const socket = io(ENDPONT)
    const [height, setHeight] = useState(true)  
    const [conversationId, setConversationId] = useState() 
    const [chatMessage, setChatMessage] = useState() 
    const [dataText, setDataText] = useState('')
    const boxMessage = useRef()  
    const [form] = Form.useForm();  
    const textInput = useRef(null);
    const onFinish = () => {    
        socket.emit('client-send-data',{data, dataText,dataUser}) 
        form.resetFields();  
        const newMessages = { 
            conversationId: conversationId,
            text: dataText,
            user: {
                _id: dataUser._id,
                username: dataUser.username,
                avatar: dataUser.avatar
            } 
        }   
         
        setChatMessage(chatMessage => [...chatMessage,newMessages]) 
        setTimeout(()=>{
            boxMessage.current.scrollIntoView(
                {
                  behavior: 'smooth',
                  block: 'end',
                  inline: 'nearest'
                })
        })  
        textInput.current.focus();
        sendTextConversationId(token,conversationId,dataText)
    };   
    useEffect(()=>{
        const idUser = data.user.data._id
        assignMessage(idUser, chatMessage)   
    },[chatMessage])    
    useEffect(()=>{  
        setTimeout(()=>{
            const _messages = messages.find(x=> x.socketId === data.user.socketId) 
            setChatMessage(_messages?.messages)
        },1500)
        
    },[messages])
    useEffect(()=>{   
        
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
            const idUser = data.user.data._id
            assignMessage(idUser, newMessage)
            setTimeout(()=>{
                boxMessage.current.scrollIntoView(
                    {
                      behavior: 'smooth',
                      block: 'end',
                      inline: 'nearest'
                    })  
            },1000)
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
            
            <Row  justify='start' wrap='wrap' style={{height: height ? '360px' : '0', width:"100%" }}>
                <Col md={24} xs={24} className="box-massage">
                    
                    {chatMessage?.map((m,index) =>
                        <Message key={index} data={m} position={dataUser._id !== m.user._id ? true : false}/>
                        
                    )}
                    <span ref={boxMessage}>
                        {chatMessage === undefined ? <Spin 
                            style={{position: "absolute",top: "10%",left: "50%",transform: "translate(-50%)"}} tip="Loading..."/> : ''}
                    </span>
                    
                    
                
                </Col>
                <Col md={24} xs={24} >
                    <Form 
                        form={form} 
                        name='basic'
                        style={{width:'100%',display:'flex',padding: '0 20px', marginTop:'30px'}}
                        onFinish={onFinish} 
                    >
                        <Form.Item name='text' style={{width:'100%'}}>
                            <Input ref={textInput} className='input-message' placeholder='Tâm sự mỏng tại đây...' onChange={(e)=> setDataText(e.target.value)} />
                        </Form.Item>
                        
                    </Form> 
                </Col>  
            </Row> 
        </Row>
    );
}

export default SingleChat;