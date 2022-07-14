import { Avatar, Badge, Button, Col, List, Popover, Row, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/SEN-LOGO.png';
import { logout } from '../reducers/Login';
import { useDispatch } from 'react-redux';
import { MessageOutlined, NotificationOutlined, PoweroffOutlined } from '@ant-design/icons';

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
    const dataMessage = [
        {
          title: 'Thành Tuân',
          description: `Ê đang làm gì đó | 3 giờ trước`
        },
        {
          title: 'Thùy Trang',
          description: 'Bạn ơi!!!'
        },
        {
          title: 'Trans',
          description: 'Biến hình'
        },
        {
          title: 'IronMan',
          description: 'i love u 3000'
        }
      ];
    const dataNotification = [
        { 
          description: 'Ê đang làm gì đó'
        },
        { 
          description: 'Bạn ơi!!!'
        },
        { 
          description: 'Biến hình'
        },
        { 
          description: 'i love u 3000'
        }
      ];
    const message =(
        <> 
            <h4>Tin nhắn mới</h4>
            <List  style={{width:'400px'}}
            itemLayout="horizontal"
            dataSource={dataMessage}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta 
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description} />
                </List.Item>
            )}
            />
            <hr/>
            <List  style={{width:'400px'}}
            itemLayout="horizontal"
            dataSource={dataMessage}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta 
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description} />
                </List.Item>
            )}
            />
         
        </> 
    )
    const notification =(
        <> 
        <h4>Thông báo mới</h4>
        <List  style={{width:'400px'}}
            itemLayout="horizontal"
            dataSource={dataNotification}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} 
                    description={item.description}
                    />
                </List.Item>
            )}
        />
        <hr/>
         <List  style={{width:'400px'}}
            itemLayout="horizontal"
            dataSource={dataNotification}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} 
                    description={item.description}
                    />
                </List.Item>
            )}
        />
         
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
                                                    <Popover content={notification} title={<h3>Thông báo</h3>} style={{position:'fixed'}} placement="topRight" trigger="click">
                                                        <Badge count={5}>
                                                            <NotificationOutlined style={{fontSize: '24px'}} />
                                                        </Badge>
                                                    </Popover> 
                                                </Col>
                                                <Col>
                                                    <Popover content={message} title={<h3>Tin nhắn</h3>} placement="topRight" trigger="click">
                                                        <Badge count={3}>
                                                            <MessageOutlined style={{fontSize: '24px'}} />
                                                        </Badge>
                                                    </Popover> 
                                                </Col>
                                                 
                                                <Col>
                                                    <Popover content={user} title={<h3>Chào {data.info.username} !!!</h3>} placement="topRight" trigger="click">
                                                        <Avatar  size={35} src={data.info.avatar}/>
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