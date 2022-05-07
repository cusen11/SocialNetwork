import { Button, Col, Form, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { CreatePostAPI } from '../Action/posts';

function CreatePost({dataToken,limit}) {  
    const token = dataToken.value.request_token.token  
    
    const user = useSelector(state => state.login.info)
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const onFinish = (values) => {
        CreatePostAPI(values,token,dispatch,limit) 
        form.resetFields();   

    };
    return (
        <> 
            <Form name="basic" form={form} onFinish={onFinish} style={{marginBottom: '80px'}}>  
                    <Row justify='end' wrap='wrap' gutter={[0, 8]}>
                        <Col md={24} xs={24}>
                            <Form.Item name="content" style={{margin: '0'}}>
                                <TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder={`Chào ${user?.username} Bạn đang nghĩ gì?`}/>
                            </Form.Item> 
                        </Col>
                        <Col>
                            <Button type='primary' size='default' htmlType="submit">Đăng</Button>
                        </Col>
                    </Row>
            </Form>
        </>
    );
}

export default CreatePost;