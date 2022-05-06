import { Col, Row } from 'antd';
import React, { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import { GetInfoLoginUser } from '../Action/users';
import Post from '../Component/Post';

function HomePage({dataToken}) {
    const dispatch = useDispatch() 
    const token = dataToken.value.request_token.token  
   useEffect(()=>{
        GetInfoLoginUser(token,dispatch);
   },[token,dispatch])

    return (
        <Row className="wrapperInner">
            <Col md={24} xs={24}><Post dataToken={dataToken}/> </Col>
        </Row> 
    );
}

export default HomePage;