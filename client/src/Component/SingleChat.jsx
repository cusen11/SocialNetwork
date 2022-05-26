import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import io from 'socket.io-client'; 
import { CloseOutlined } from '@ant-design/icons';
import { GetMessageByConversationId } from '../Action/message';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function SingleChat({token,data}) { 
    const dataUser = useSelector(state => state.login.info) 
    const ENDPONT = 'http://localhost:5000/'
    const socket = io(ENDPONT)
    const [height, setHeight] = useState(false) 
    const [messages, setMessages] = useState()
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
    const handleCloseMessage = () =>{
        console.log('close id')
    }
    useEffect(()=>{ 
        socket.on('server-send-data-room',(data)=>{
            setRoom(data)
        })
        socket.on('server-send-data',(data)=>{
            setClient(data) 
        })  
        const getConversationId = async() =>{
            try {
                const config = {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
                const body = data.conversation 
                const res = await axios.post('/api/conversation/contant',body,config)
                console.log(res.data)
               
            } catch (err) {
                console.log(err.response.data.mgs)
            }
        }
        getConversationId()
    },[]) 
    useEffect(()=>{
        const getMassage = async()=>{ 
            const newMessage = await GetMessageByConversationId(token,'conversationId')
            setMessages(newMessage)
            
            boxMessage.current.scrollIntoView(
                {
                  behavior: 'smooth',
                  block: 'end',
                  inline: 'nearest'
                })

        }
        getMassage()
        
    },[token])
    return (
        <Row className="chat-box">
            <Row className="name-box" justify='space-between' style={{width: '100%'}}>
                <Col style={{width: '30%'}}><Link to='/'>Thùy Trang</Link></Col> 
                <Col style={{width: '60%', height:'100%'}} onClick={()=> setHeight(!height) } ></Col>
                <Col style={{width: '10%'}}>
                    <Button onClick={()=>handleCloseMessage()} ghost icon={<CloseOutlined/>} /> 
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