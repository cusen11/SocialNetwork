import { Button, Form, Input } from 'antd';
import React, { useRef, useState } from 'react'; 
import PropTypes from 'prop-types';
import { CommentOutlined } from '@ant-design/icons';
 
Comment.propTypes = {
    data:PropTypes.number.isRequired,
};

function Comment({data}) { 
    const [ hidden, setHidden] = useState(true) 
    const [form] = Form.useForm();

    const valueTextArea = useRef() 
    const onFinish = (values) => {
        console.log('Finish:', values); 
        form.resetFields();
        setHidden(!hidden)
    };
    return (
        <>
            <Button 
            type="text" 
            icon={<CommentOutlined />} 
            size='large' 
            onClick = {()=> setHidden(!hidden)} >
                    {data === 0 ? '' : `${data}`}
            </Button > 
            <Form hidden={hidden} form={form} name="basic" onFinish={onFinish}> 
                    <Form.Item name="comment">
                        <Input rows={2} ref={valueTextArea}/>
                    </Form.Item> 
                    <Button type='primary' size='default' htmlType="submit">Gửi</Button> 
            </Form>
            
        </>
    );
}

export default Comment;

