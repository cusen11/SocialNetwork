import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDDMMYY } from '../Action/func';
import { addEducation, deleteEducation } from '../Action/profiles';

function Education({data}) {
    const { Title } = Typography
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const token = useSelector(state => state.login.value.request_token.token) 
    const onFinish = (values) =>{ 
        addEducation(token,values,dispatch)
        setIsModalVisible(false);
        form.resetFields();
    }  
    return (
        <>
            {
                data.map((e) =>(
                <Card 
                    key={e._id}
                    className='box'
                    title={
                    <>
                        <Title level={4}>{e.school}</Title>
                        <CloseOutlined 
                            className='closeCmt' 
                            onClick={()=>deleteEducation(token,e._id,dispatch)} 
                        />
                    </>
                    }> 
                    
                    <Typography><strong>Giới thiệu : </strong>{e.description}</Typography>
                    <Typography><strong>Bằng cấp / Chứng chỉ: </strong>{e.degree}</Typography>
                    <Typography><strong>Nghiệp vụ: </strong>{e.fieldofstudy}</Typography>
                    <Typography><strong>Thời gian: </strong>{formatDDMMYY(e.from)} - {formatDDMMYY(e.to)}</Typography> 
                </Card>
                ))
            }
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
                    <Form.Item name="school"
                    rules={[{ required: true, message: 'Vui lòng nhập trường!' }]}
                    >
                        <Input placeholder="Tên trường"/>
                    </Form.Item> 
                    <Form.Item name="degree"
                    rules={[{ required: true, message: 'Vui lòng nhập chứng chỉ!' }]}
                    >
                        <Input placeholder="Chứng chỉ / Bằng cấp"/>
                    </Form.Item> 
                    <Form.Item name="fieldofstudy"
                    rules={[{ required: true, message: 'Vui lòng nhập Chuyên nghành!' }]}
                    >
                        <Input placeholder="Chuyên nghành"/>
                    </Form.Item> 
                    <Form.Item 
                    rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu!' }]}                    
                    name="from" label="Ngày bắt đầu">
                        <Input type='date'/>
                    </Form.Item>  
                    <Form.Item
                     rules={[{ required: true, message: 'Vui lòng nhập kết thúc!' }]} 
                     label="Ngày kết thúc"
                     name="to" 
                     >
                        <Input type='date'/>
                    </Form.Item> 
                    
                    <Form.Item 
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]} 
                    name="description" >
                        <TextArea placeholder="Mô tả"/>
                    </Form.Item>  
                    <Button key='update' type='primary' htmlType="submit">Cập nhật</Button>
                </Form> 
            </Modal>
            <br/>
            <Button onClick={() => setIsModalVisible(true)}>Add new Edudation</Button>
        </>
    );
}

export default Education;