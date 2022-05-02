import axios from "axios";

const setAuthToken = (data) => { 
    if (data.status){  
      axios.defaults.headers.common['x-auth-token'] = data.request_token.token;  
    } else {
      delete axios.defaults.headers.common['x-auth-token']; 
    }
  };
  
  export default setAuthToken;