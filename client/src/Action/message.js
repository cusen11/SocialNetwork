import axios from "axios";  
import { error } from "./func";


export const GetMessageByConversationId = async (token,id) =>{
    try { 
        const config ={
            headers:{
                'x-auth-token':token
            }
        }
        const res = await axios.get(`/api/message/${id}`,config)
        return res.data
    } catch (err) {
        error(err.response.data.msg)
    }
}