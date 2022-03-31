import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/SEN-LOGO.png';
import { logout } from '../reducers/Login';
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {
    const dispatch = useDispatch();
    
    const token = useSelector(state => state.login);
    const { login } = token.value;

    return (
        <Row className='header-page' align='middle' justify='space-between'>
            <Col><Link to="/"><img src={Logo} alt="logo"/></Link></Col>
            <Col>
                <Row align='middle' justify='start' gutter={8} >
                    <Col>{!login ? <Button type='primary'><Link to='/login'>Login</Link></Button> : ''}</Col>
                    <Col><Button type='primary' danger onClick={() => dispatch(logout()) }>Logout</Button></Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Navbar;