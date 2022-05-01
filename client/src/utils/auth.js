import axios from "axios";

const setAuthToken = (token) => {
    if (token.value.login){ 
      axios.defaults.headers.common['x-auth-token'] = token.value.request_token.token; 
    } else {
      delete axios.defaults.headers.common['x-auth-token']; 
    }
  };
  
  export default setAuthToken;