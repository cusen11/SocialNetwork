import { Button, Form, Input } from 'antd';
import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { CreatePostAPI } from '../Action/posts';
function CreatePost() { 
    const token = useSelector(state => state.login.value.request_token.token);   
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const onFinish = (values) => {
        CreatePostAPI(values,token,dispatch) 
        form.resetFields();   

    };
    return (
        <> 
            <Form name="basic" form={form} onFinish={onFinish}> 
                    <Form.Item name="content">
                        <Input rows={4}/>
                    </Form.Item> 
                    <Button type='primary' size='default' htmlType="submit">Post</Button> 
            </Form>
        </>
    );
}

export default CreatePost;