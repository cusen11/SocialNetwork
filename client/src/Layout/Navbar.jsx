import { Avatar, Badge, Button, Col, Popover, Row, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/SEN-LOGO.png';
import { logout } from '../reducers/Login';
import { useDispatch } from 'react-redux';
import { CaretDownOutlined, MessageOutlined, NotificationOutlined, PoweroffOutlined } from '@ant-design/icons';

function Navbar({data}) { 
    const dispatch = useDispatch();  
    const user =(
       <> 
        <Row gutter={[16, 16]}>
            <Col xs={24} md={24}><Link to='/profile'>Hồ sơ</Link></Col>
            <Col xs={24} md={24}>
                <Tooltip title="Logout"> 
                    <Button style={{width: '100%'}} 
                        type='primary' 
                        danger onClick={() => dispatch(logout())} 
                        icon={<PoweroffOutlined />}
                    />
                </Tooltip>
            </Col>
        </Row>
        
        </> 
    )
    const message =(
        <> 
         <h1>đây là message</h1>
         
         </> 
     )
     const notification =(
        <> 
         <h1>đây là thông báo</h1>
         
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
                                   
                                        <Row justify='center' align='middle' className='avatar' gutter={10}>  
                                                <Col>
                                                    <Popover content={notification} placement="topRight" arrowPointAtCenter trigger="click">
                                                        <Badge count={5}>
                                                            <NotificationOutlined style={{fontSize: '24px'}} />
                                                        </Badge>
                                                    </Popover> 
                                                </Col>
                                                <Col>
                                                    <Popover content={message} placement="topRight" arrowPointAtCenter trigger="click">
                                                        <Badge count={3}>
                                                            <MessageOutlined style={{fontSize: '24px'}} />
                                                        </Badge>
                                                    </Popover> 
                                                </Col>
                                                
                                                <Col>
                                                    <Link to='/profile'><Avatar  size={35} src={data.info.avatar}/></Link>
                                                </Col>
                                                <Col>
                                                    <Popover content={user} title={`Chào ${data.info.username} !!!`} placement="topRight" arrowPointAtCenter trigger="click">
                                                        <CaretDownOutlined style={{fontSize: '18px'}} />
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