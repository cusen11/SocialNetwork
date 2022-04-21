import React from 'react';
import { useSelector } from 'react-redux'; 
import Post from '../Component/Post';

function HomePage() { 

    const token = useSelector(state => state.login.value.request_token.token);  
    return (
        <>
            {
                <Post token={token}/>
            }
        </>
    );
}

export default HomePage;