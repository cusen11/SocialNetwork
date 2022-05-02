import { createSlice } from '@reduxjs/toolkit'  

export const loginSlice = createSlice({
  name: 'login',
  initialState:{
    value:{
      status: false,
      expires_at: "",
      request_token: ""
    },
    info:{
      _id:"",
      username:"",
      email:"",
      avatar:"",
      createdAt:"",
      updatedAt:""
    }
  },
  reducers: {
    login: (state, actions) => {
      state.value = {
        status: true,
        expires_at: Date.now(),
        request_token:  actions.payload.data
      };  
    },
    logout: (state) => {
      state.value = {
        status: false,
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