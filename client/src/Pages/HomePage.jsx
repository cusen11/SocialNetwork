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
        <div style={{margin: '30px auto', maxWidth:'800px'}}> 
            <Post dataToken={dataToken}/> 
        </div> 
    );
}

export default HomePage;