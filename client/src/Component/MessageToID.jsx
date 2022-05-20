import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { SendMessageToUserID } from '../Action/socketio';
import io from 'socket.io-client'

function MessageToID({size}) {
    const ENDPONT = 'http://localhost:5000/'
    const socket = io(ENDPONT)
    const dataUser = useSelector(state => state.login.info) 
    const [form] = Form.useForm();
    const onFinish = (values) => { 
        SendMessageToUserID(values,dataUser._id)
        form.resetFields();
      };
     
    useEffect(() => {
        socket.on("message-to-id-client", (values) => {
            console.log(values)
        });
    });
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
                        <Input />
                    </Form.Item>
                    <Form.Item style={{width:'15%'}} >
                        <Button type='primary' htmlType='submit' icon={<SendOutlined />}/>
                    </Form.Item> 
                </Form>
                
            </Col>
        </Row>
    );
}

export default MessageToID;