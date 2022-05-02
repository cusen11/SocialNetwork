import React from 'react';
import { Form, Input,
        Button,
        Row, Col,
        Typography ,Card }
        from 'antd';  
import { Link } from 'react-router-dom';
  
import { useDispatch } from 'react-redux';
 
import { loginAuthor } from '../Action/users'; 


function LoginForm() {
    const dispatch = useDispatch()
    const { Title } = Typography;
    const onFinish = (values) => {
        loginAuthor( values, dispatch)  
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

export default LoginForm;