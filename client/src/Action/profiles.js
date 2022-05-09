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

export const UpdateProfile = (token,values, dispatch) => {
    console.log({token,values})
}