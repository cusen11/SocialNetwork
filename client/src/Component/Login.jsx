import React from 'react';
import { Form, Input,
        Button,
        Row, Col,
        Typography ,Card }
        from 'antd';  
import { Link } from 'react-router-dom';

import { login } from '../reducers/Login'; 
import { useDispatch } from 'react-redux';

import axios from 'axios'


function Login() {
    const dispatch = useDispatch()
    const { Title } = Typography;
    const onFinish = async (values) => {
        try {
            const body = JSON.stringify(values);
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            await axios.post('/api/auth/login',body, config).then(function(res){
                dispatch(login(res.data))
                console.log(res.data)
            })
        } catch (err) {
            console.error(err.response.data);
        } 
    };

    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    return (
    <Row justify='center' align='middle'>
        
        <Col xs={24} md={12} lg={8} >
        <Title level={1} align='center'>Sign In</Title>
            <Card>
                <Form
                name="basic"
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item 
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input your Email!',
                    },
                ]}
                >
                <Input placeholder="Email"/>
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
                <Input.Password placeholder="Password"/>
                </Form.Item>

                <Form.Item>
                    <Row justify='space-between' align='middle'>
                    <Link to="/registration">Registration</Link>
                    <Link to="/forgotpassword">Forgot password ?</Link>
                    </Row>
                </Form.Item> 
                <Form.Item >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
                </Form.Item>
                </Form>
            </Card>
        </Col>
    </Row>
    );
}

export default Login;