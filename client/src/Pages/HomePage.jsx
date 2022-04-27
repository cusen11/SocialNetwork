import React from 'react'; 
import Post from '../Component/Post';

function HomePage() {  
    return (
        <div style={{margin: '30px auto', maxWidth:'800px'}}> 
            <Post/> 
        </div>
    );
}

export default HomePage;