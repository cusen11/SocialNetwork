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
      console.log('login')
    },
    logout: (state) => {
      state.value = {
        login: false,
        expires_at: "",
        request_token: ""
      }
      console.log('logout')
    },
    
  },
})
 
export const { login, logout  } = loginSlice.actions

export default loginSlice.reducer