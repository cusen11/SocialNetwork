import React, { useEffect } from 'react';
import { GetProfile } from '../Action/profiles';
import { useDispatch } from 'react-redux';

function Profile({dataToken}) { 
    const dispatch = useDispatch();  
    useEffect(()=>{
        GetProfile(dataToken,dispatch) 
    },[dataToken,dispatch])
    return (
        <>
            <h1>Profile</h1>
        </>
    );
}

export default Profile;