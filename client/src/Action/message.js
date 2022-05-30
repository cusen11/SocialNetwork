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

export const GetConversationId = async (data) =>{
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        } 
        const res = await axios.post('/api/conversation/contant',data,config)  
        return res.data
       
    } catch (err) {
        console.log(err.response.data.mgs)
    }
}
export const sendTextConversationId = (token,conversationId,text)=>{
    console.log({token,conversationId,text})
    
}