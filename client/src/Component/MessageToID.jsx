import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';  
import io from 'socket.io-client';
import axios from 'axios' 

function MessageToID({token,size}) {
    const ENDPONT = 'http://localhost:5000/'
    const socket = io(ENDPONT)
    const dataUser = useSelector(state => state.login.info) 
    const [form] = Form.useForm();
    const [dataText, setDataText] = useState('')
    const [ client, setClient ] = useState()
    const [ room, setRoom ] = useState() 
    const onFinish = () => {   
        socket.emit('client-send-data',{dataUser, dataText})
        form.resetFields();
    };
     
    useEffect(()=>{
        socket.on('connect', async()=>{
            const tokenKey = token.value.request_token.token
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
        socket.on('server-send-data-room',(data)=>{
            setRoom(data)
        })
        socket.on('server-send-data',(data)=>{
            setClient(data)
            console.log('client'+ data)
    })
    },[]) 
    return (
        <Row style={{width:size,border: '1px solid'}} justify='start' wrap='wrap'>
            <Col md={24} xs={24} style={{height:'400px'}}>

            </Col>
            <Col md={24} xs={24}>
                <Form 
                    form={form} 
                    name='basic'
                    style={{width:'100%',display:'flex'}}
                    onFinish={onFinish} 
                >
                    <Form.Item name='text' style={{width:'85%'}}>
                        <Input onChange={(e)=> setDataText(e.target.value)} />
                    </Form.Item>
                    <Form.Item style={{width:'15%'}} >
                        <Button type='primary' htmlType='submit' icon={<SendOutlined />}/>
                    </Form.Item> 
                </Form>
                
            </Col>  
            <h2 style={{width:'100%'}}>room {room}</h2>
            <br/>
            <h2 style={{width:'100%'}}>client {client}</h2>
        </Row>
    );
}

export default MessageToID;