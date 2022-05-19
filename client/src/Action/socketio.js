
import io from 'socket.io-client'



const ENDPONT = 'http://localhost:5000/'
const socket = io(ENDPONT)


export const connectServer = (dataUser) =>{
    socket.emit('setup', dataUser)
}

export const SendMessageToUserID = (values,room) =>{ 
    socket.emit('message-to-id-server', {values,room}) 
}

export const GetMessageToUserID = () =>{ 
    
}
 