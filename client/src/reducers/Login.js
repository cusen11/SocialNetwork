import { createSlice } from '@reduxjs/toolkit' 

export const loginSlice = createSlice({
  name: 'login',
  initialState:{},
  reducers: {
    login: (state, actions) => {
      state.value = actions.payload;
      console.log("login thành công")
    },
    logout: (state) => {
      state.value = {}
    },
    
  },
})
 
export const { login, logout  } = loginSlice.actions

export default loginSlice.reducer