import { Avatar, Button, Col, Row, Tooltip, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/SEN-LOGO.png';
import { logout } from '../reducers/Login';
import { useDispatch, useSelector } from 'react-redux';
import { PoweroffOutlined } from '@ant-design/icons';

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.info)
    const token = useSelector(state => state.login);
    const { login } = token.value; 
    return (
        <Row className='header-page' align='middle' justify='space-between'>
            <Col><Link to="/"><img src={Logo} alt="logo"/></Link></Col>
            <Col>
                <Row align='middle' justify='start' gutter={8} >
                    <Col>{!login ? <Button type='primary'><Link to='/'>Login</Link></Button> : ''}</Col>
                    <Col>
                        {
                            login ? 
                            <Row justify='end' align='middle'>
                                <Avatar size={40} src={user.avatar}/>
                                <Typography.Title level={5} style={{margin: '0 16px'}}> Hi {user.username}</Typography.Title>
                                <Tooltip title="Logout">
                                    <Button  
                                        type='primary' 
                                        danger onClick={() => dispatch(logout())} 
                                        icon={<PoweroffOutlined />}
                                    />
                                </Tooltip>
                            </Row>
                            :
                            ''
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Navbar;