import { Avatar, Button, Col, Popover, Row, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/SEN-LOGO.png';
import { logout } from '../reducers/Login';
import { useDispatch } from 'react-redux';
import { CaretDownOutlined, PoweroffOutlined } from '@ant-design/icons';

function Navbar({data}) { 
    const dispatch = useDispatch();  
    const content =(
       <> 
        <Tooltip title="Logout">
            <Button  
                type='primary' 
                danger onClick={() => dispatch(logout())} 
                icon={<PoweroffOutlined />}
            />
        </Tooltip>
        </> 
    )
    return (
        <Row className='header-page'>
            <Col className='wrapper' md={24} xs={24}>
                <Row align='middle' justify='space-between'>
                    <Col><Link to="/"><img src={Logo} className='avata' alt="logo"/></Link></Col>
                    <Col>
                        <Row align='middle' justify='center'>
                            <Col>{!data.value.status ? <Button type='primary'><Link to='/'>Login</Link></Button> : ''}</Col>
                            
                            <Col>
                                {
                                    data.value.status ? 
                                   
                                        <Row justify='center' align='middle' className='avatar' gutter={5}>  
                                                <Col>
                                                    <Link to='/dashboard'><Avatar  size={35} src={data.info.avatar}/></Link>
                                                </Col>
                                                <Col>
                                                    <Popover content={content} title={`Chào ${data.info.username} !!!`} placement="topRight" arrowPointAtCenter trigger="click">
                                                        <CaretDownOutlined style={{fontSize: '20px'}} />
                                                    </Popover> 
                                                </Col> 
                                        </Row>
                                   
                                    :
                                    ''
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Navbar;