import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Tabs, Typography } from 'antd';
import { GetProfile, UpdateProfile } from '../Action/profiles';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea'; 
import Experience from '../Component/Experience';
import Education from '../Component/Education';
import Skills from '../Component/Skills';
import ImageView from '../Component/ImageView';
import Dashboard from './Dashboard';

function Profile({dataToken}) { 
    const profile = useSelector(state => state.profile.value)
    const userInfo = useSelector(state => state.login.info)
    const login = useSelector(state => state.login)
    const { Title } = Typography
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();  
    useEffect(()=>{
        GetProfile(dataToken,dispatch) 
    },[dataToken,dispatch]) 

    const onFinish = (values) =>{
        UpdateProfile(dataToken,values,dispatch);
        setIsModalVisible(false);
        form.resetFields();
    }
    
    return (
        <>
            {
                profile.user !== null ? 
                <Row className='wrapperInner'> 
                    <Row gutter={15}>
                        <Col>
                            <ImageView img={profile.user.avatar}/>
                        </Col>
                        <Col>
                            <Title level={2}>{profile.user.username}</Title>
                            <Typography >{profile.bio}</Typography>
                            <Typography><strong>Công ty: </strong>{profile.company}</Typography>
                            <Typography><strong>Vị trí: </strong>{profile.status}</Typography>
                            <Typography><strong>Địa chỉ: </strong>{profile.location}</Typography>
                            <Typography><strong>Website: </strong>{profile.website}</Typography>
                            <Skills data={profile.skills}/>
                        </Col>
                    </Row>
                    <Tabs tabPosition='top' style={{width:'100%'}}>
                        <Tabs.TabPane tab="Bài viết" key="1">
                            <Dashboard dataToken={login}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Kinh nghiệm" key="2">
                            <Experience data={profile.experience}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Học vấn" key="3">
                            <Education data={profile.education} />
                        </Tabs.TabPane>
                    </Tabs> 
                </Row>
                :
                <Row className='wrapperInner'>
                    <h1>Xin Chào {userInfo.username} bạn chưa cập nhật profile</h1> 
                    <Button type='default' size='large' onClick={() => setIsModalVisible(true)}>Cập nhật Profile</Button> 
                    <Modal 
                        centered={true}
                        title="Cập nhật Profile" 
                        visible={isModalVisible}
                        footer={null} 
                        onCancel={()=> setIsModalVisible(false)}
                     > 
                        <Form
                            form={form} 
                            name="basic"
                            onFinish={onFinish}  
                            >
                            <Form.Item name="company">
                                <Input placeholder="Tên Công Ty"/>
                            </Form.Item> 
                            <Form.Item name="location">
                                <Input placeholder="Địa chỉ"/>
                            </Form.Item> 
                            <Form.Item name="website">
                                <Input placeholder="Website"/>
                            </Form.Item> 
                            <Form.Item name="bio">
                                <TextArea placeholder="Giới thiệu"/>
                            </Form.Item> 
                            <Form.Item name="githubusername">
                                <Input placeholder="Github Username"/>
                            </Form.Item> 
                            <Form.Item name="status">
                                <Input placeholder="Chức vụ"/>
                            </Form.Item> 
                            <Form.Item name="skills">
                                <Input placeholder="Kỹ Năng: Cách nhau bởi dấu Phẩy (,)"/>
                            </Form.Item> 
                            <Form.Item name="youtube">
                                <Input placeholder="Youtube"/>
                            </Form.Item> 
                            <Form.Item name="facebook">
                                <Input placeholder="Facebook"/>
                            </Form.Item> 
                            <Form.Item name="intargram">
                                <Input placeholder="Intargram"/>
                            </Form.Item> 
                            <Form.Item name="likein">
                                <Input placeholder="Likein"/>
                            </Form.Item> 
                            <Form.Item name="twitter">
                                <Input placeholder="Twitter"/>
                            </Form.Item> 
                            <Button key='update' type='primary' htmlType="submit">Cập nhật</Button>
                        </Form> 
                    </Modal>
                </Row>
            }
        </>
    );
}

export default Profile;