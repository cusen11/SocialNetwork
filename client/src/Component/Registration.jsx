import React from 'react';
import { Form, Input, Button,Row, Col, Typography ,Card } from 'antd';   
import axios from 'axios';
import { login } from '../reducers/Login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { error } from '../Action/func';

function Registration() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { Title } = Typography;

    const onFinish = async (values) => {
        if(values.password !== values.password2){
            error('Mật khẩu không gióng nhau!!!')
            return
        }
        const newUser = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        try {
            const body = JSON.stringify(newUser);
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await axios.post('/api/users/registration', body, config).then(function(res){
                dispatch(login(res)) 
                navigate('/')
            }); 
        } catch (err) {
            error(err.response.data.mgs);

        } 
    }; 
    return (
    <Row justify='center' align='middle'>
        
        <Col xs={24} md={12} lg={8} >
        <Title level={1} align='center'>Registration</Title>
            <Card>
                <Form
                    name="basic"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish} 
                    autoComplete="off"
                >
                    <Form.Item 
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your Name!',
                        },
                    ]}
                    > 
                        <Input placeholder='Name'/>
                    </Form.Item>

                    <Form.Item 
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your Email!',
                        },
                    ]}
                    > 
                        <Input placeholder='Email'/>
                    </Form.Item>

                    <Form.Item 
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password placeholder='Password' />
                    </Form.Item>

                    <Form.Item 
                    name="password2"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password placeholder='Password' />
                    </Form.Item> 
                    <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    </Row>
    );
}

export default Registration;