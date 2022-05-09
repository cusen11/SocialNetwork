import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Row } from 'antd';
import { GetProfile, UpdateProfile } from '../Action/profiles';
import { useDispatch, useSelector } from 'react-redux';

function Profile({dataToken}) { 
    const profile = useSelector(state => state.profile.value)
    const userInfo = useSelector(state => state.login.info)
    
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
                    <h1> Có PROFILE</h1>
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
                            <Form.Item name="email">
                                <Input placeholder="Email"/>
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