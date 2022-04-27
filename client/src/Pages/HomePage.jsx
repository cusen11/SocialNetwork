import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { GetInfoLoginUser } from '../Action/users';
import Post from '../Component/Post';

function HomePage() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.login.value.request_token.token);
    
   useEffect(()=>{
        GetInfoLoginUser(token,dispatch);
   },[token,dispatch])

    return (
        <div style={{margin: '30px auto', maxWidth:'800px'}}> 
            <Post/> 
        </div>
    );
}

export default HomePage;