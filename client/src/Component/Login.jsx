import React from 'react';
import { Form, Input,
        Button,
        Row, Col,
        Typography ,Card }
        from 'antd';  
import { Link } from 'react-router-dom';

function Login() {
    const { Title } = Typography;
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    return (
    <Row justify='center' align='middle'>
        
        <Col xs={24} md={12} lg={8} >
        <Title level={1}>Login</Title>
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
                label="Username"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password />
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