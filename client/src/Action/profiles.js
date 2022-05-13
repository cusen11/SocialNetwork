import axios from "axios";  
import { ProfileStore } from "../reducers/Profile";
// import { error, success } from "./func";


export const GetProfile = async (token,dispatch) =>{
  
    try {
        const config = {
            headers:{
                'x-auth-token': token
            }
        }
        const res = await axios.get('/api/profile/me',config)  
        dispatch(ProfileStore(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const UpdateProfile = async (token,values, dispatch) => {
    try {
        const config = {
            headers:{
                'x-auth-token': token,
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/profile',values,config)
        dispatch(ProfileStore(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const addExperience = async (token, values, dispatch) =>{
    try {
        const config = {
            headers:{
                'x-auth-token': token,
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience',values,config)
        dispatch(ProfileStore(res.data)) 
    } catch (err) {
        console.log(err)
    }
}
export const addEducation = async (token, values, dispatch) =>{
    try { 
        const config = {
            headers:{
                'x-auth-token': token,
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/education',values,config)
        dispatch(ProfileStore(res.data)) 
    } catch (err) {
        console.log(err)
    }
}

export const deleteEducation = async(token,id,dispatch) =>{ 
    try { 
        const config = {
            headers:{
                'x-auth-token': token
            }
        }
        if (window.confirm('Bạn có chắc chắn xóa?')){
            const res = await axios.delete(`/api/profile/education/${id}`,config)
            dispatch(ProfileStore(res.data)) 
        } 
    } catch (err) {
        console.log(err)
    }
}
export const deleteExperience = async(token,id,dispatch) =>{ 
    try { 
        const config = {
            headers:{
                'x-auth-token': token
            }
        }
        if (window.confirm('Bạn có chắc chắn xóa?')){
            const res = await axios.delete(`/api/profile/experience/${id}`,config)
            dispatch(ProfileStore(res.data)) 
        } 
    } catch (err) {
        console.log(err)
    }
}