import { createSlice } from '@reduxjs/toolkit'  

export const loginSlice = createSlice({
  name: 'login',
  initialState:{
    login: false,
    expires_at: "",
    request_token: ""
  },
  reducers: {
    login: (state, actions) => {
      state.value = {
        login: true,
        expires_at: Date.now(),
        request_token:  actions.payload.data
      }; 
    },
    logout: (state) => {
      state.value = {
        login: false,
        expires_at: "",
        request_token: ""
      }  
    },
    userInfo:(state, actions) =>{
      state.info = actions.payload
    } 
  },
})
 
export const { login, logout, userInfo  } = loginSlice.actions

export default loginSlice.reducer