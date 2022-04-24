import { GetInfoLoginUser } from "./users"

export const LikeAndUnlikePost = (data,token) => {
    const user = GetInfoLoginUser(token);
    const userId = user._id 
    const userExist = data.some(() => {return data.user === userId}) 
    if(!userExist){
        console.log('Call API like Post')
    }
    else{
        console.log('Call API unlike Post')
    }
}