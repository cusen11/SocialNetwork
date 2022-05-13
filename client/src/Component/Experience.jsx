
import { Button, Card, Form, Input, Modal, Typography,Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { formatDDMMYY } from '../Action/func';
import { addExperience } from '../Action/profiles';

function Experience({data}) { 
    const { Title } = Typography
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const token = useSelector(state => state.login.value.request_token.token) 
    const onFinish = (values) =>{ 
        addExperience(token,values,dispatch)
        setIsModalVisible(false);
        form.resetFields();
    }
 
    return (
        <>
           {
                data.map((e,index) =>(
                <><Card 
                key={index}
                title={<Title level={4}>{e.title}</Title>}
                >
                    <Title level={5}>{e.company}</Title>
                    <Typography><strong>Nghiệp vụ: </strong>{e.description}</Typography>
                    <Typography><strong>Địa chỉ: </strong>{e.location}</Typography>
                    <Typography><strong>Thời gian: </strong>{formatDDMMYY(e.from)} - {e.current ? 'Bây giờ' : formatDDMMYY(e.to)}</Typography> 
                </Card>
                <br/></>
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
                    <Form.Item name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập chức vụ!' }]}
                    >
                        <Input placeholder="Chức vụ"/>
                    </Form.Item> 
                    <Form.Item name="company"
                    rules={[{ required: true, message: 'Vui lòng nhập Tên Công Ty!' }]}
                    >
                        <Input placeholder="Tên Công Ty"/>
                    </Form.Item> 
                    <Form.Item name="location"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input placeholder="Địa chỉ"/>
                    </Form.Item> 
                    <Form.Item 
                    rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu!' }]}                    
                    name="from" label="Ngày bắt đầu">
                        <Input type='date'/>
                    </Form.Item> 
                    <Form.Item name='current'
                    
                    valuePropName="checked" style={{textAlign:'right'}}>
                        <Checkbox onChange={() => setIsHidden(!isHidden)}>Hiện tại</Checkbox> 
                    </Form.Item>  
                    {
                    isHidden ?  
                   '' :  <Form.Item 
                    hidden={isHidden}
                    rules={[{ required: true, message: 'Vui lòng nhập kết thúc!' }]} 
                    label="Ngày kết thúc"
                    name="to"  >
                       <Input type='date'/>
                   </Form.Item>
                        
                    }
                    
                    <Form.Item name="description" 
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]} 
                    >
                        <TextArea placeholder="Mô tả"/>
                    </Form.Item>  
                    <Button key='update' type='primary' htmlType="submit">Cập nhật</Button>
                </Form> 
            </Modal>
            <br/>
            <Button onClick={() => setIsModalVisible(true)}>Add new Experience</Button>  
        </>
    );
}

export default Experience;