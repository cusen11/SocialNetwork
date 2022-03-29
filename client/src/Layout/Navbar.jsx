import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/SEN-LOGO.png';

function Navbar() {
    return (
        <Row className='header-page' align='middle' justify='space-between'>
            <Col><Link to="/"><img src={Logo} alt="logo"/></Link></Col>
            <Col>
                <Row align='middle' justify='start' gutter={8} >
                    <Col><Link to="/login">Login</Link></Col>
                    <Col><Link to="/logout">Logout</Link></Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Navbar;