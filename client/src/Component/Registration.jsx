import React from 'react';
import { Form, Input, Button,Row, Col, Typography ,Card } from 'antd';   
import axios from 'axios';
import { login } from '../reducers/Login';
import { useDispatch } from 'react-redux';

function Registration() {
    const dispatch = useDispatch();

    const { Title } = Typography;

    const onFinish = async (values) => {
        if(values.password !== values.password2){
            console.log('Passowords do not match!!!');
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
                dispatch(login(res.data))
            }); 
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
        <Title level={1} align='center'>Registration</Title>
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
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    </Row>
    );
}

export default Registration;