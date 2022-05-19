import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connectServer } from '../Action/socketio';
import MessageToID from './MessageToID';

function SocketIOSetup() {
    const dataUser = useSelector(state => state.login.info) 
    useEffect(()=>{
      connectServer(dataUser)
    },[]) 
    return(
    <>
      <MessageToID size={300}/>
    </>)
}

export default SocketIOSetup;