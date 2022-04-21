import React from 'react';
import { useSelector } from 'react-redux'; 
import { GetAllPost } from '../Action/posts';
import Post from '../Component/Post';

function HomePage() { 

    const token = useSelector(state => state.login.value.request_token.token);
    GetAllPost(token)  
    return (
        <>
            {
                <h1>Homepage</h1>
                // <Post token={token}/>
            }
        </>
    );
}

export default HomePage;