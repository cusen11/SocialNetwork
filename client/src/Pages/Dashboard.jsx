import React, { useEffect, useState } from 'react';
import { GetPostById } from '../Action/posts';

function Dashboard({dataToken}) {
    const { _id } = dataToken.info; 
    const token = dataToken.value.request_token.token   
    const [ dataUser, setDataUser ] = useState()
    useEffect(() =>{
        const getData = async() =>{
            const data = await GetPostById(token,_id)
             setDataUser(data)
             console.log(data)
        }
        getData()
    },[_id])
    return (
        <>
            <h1>Dashboard page</h1>
        </>
    );
}

export default Dashboard;