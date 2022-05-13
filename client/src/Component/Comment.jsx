import { Avatar, Button, Col, Form, Input, Row, Typography,Comment } from 'antd';
import React, { useEffect, useRef, useState } from 'react'; 
import PropTypes from 'prop-types';
import { CloseOutlined, CommentOutlined } from '@ant-design/icons';
import { AddComment, PaginationArray, removeComment } from '../Action/posts';
import { useDispatch } from 'react-redux';
import { formatDAY } from '../Action/func';
 
CommentComponent.propTypes = {
    data:PropTypes.array.isRequired,
};

function CommentComponent({data,token,id,dashboard,limit}) { 
    const dispatch = useDispatch()
    const [ hidden, setHidden] = useState(true) 
    const [dataComment, setDataComment] = useState([])
    const [paginationSize, setPaginationSize] = useState(2) 
    const [form] = Form.useForm();
    const valueTextArea = useRef() 
    const onFinish = (values) => { 
        form.resetFields();  
        AddComment(token, values,id, dispatch,dashboard,limit)
    };
    
    useEffect(()=>{
        setDataComment(PaginationArray(data,paginationSize,1))  
    },[paginationSize,data])
    
    return (
        <>
            <Button 
            type="text" 
            icon={<CommentOutlined />} 
            size='large' 
            onClick = {()=> setHidden(!hidden)} >
                    {data.length === 0 ? '' : `${data.length}`}
            </Button > 
            <Row hidden={hidden}>
                <Col md={24} xs={24}>
                    <Form form={form} name="basic" onFinish={onFinish}> 
                            <Row>
                                <Col md={20} xs={20}>
                                    <Form.Item name="text">
                                        <Input rows={2} ref={valueTextArea}/>
                                    </Form.Item> 
                                </Col>
                                <Col md={4} xs={4}><Button type='primary' size='default' htmlType="submit">Gửi</Button> </Col>
                            </Row>
                            
                    </Form>
                </Col>
                <Col md={24} xs={24} > 
                    {
                        dataComment?.map(cmt => ( 
                            <Comment key={cmt._id}
                            className='box'
                            author={`${cmt.username} | ${formatDAY(cmt.date)}`}
                            avatar={<Avatar src={cmt.avatar} alt={cmt.username}/>}
                            content={
                                <Typography>
                                    {cmt.text}
                                    <CloseOutlined 
                                        className='closeCmt' 
                                        onClick={()=>removeComment(token,id,cmt._id, dispatch,dashboard,limit)} 
                                    />
                                </Typography>
                                
                            }
                            />
                        
                        ))
                    }
                    <Button hidden={data.length <= dataComment.length ? true : false}
                    type='link'
                    onClick={()=>{
                        setPaginationSize(paginationSize+2)
                    }}
                    >Xem thêm</Button>
                </Col> 
            </Row>
            
        </>
    );
}

export default CommentComponent;

