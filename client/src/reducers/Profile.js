import { createSlice } from "@reduxjs/toolkit";

export const ProfileSlice = createSlice({
    name:'profile',
    initialState:{
        value:{
            social: null,
            _id: null,
            user: null,
            company: null,
            website: null,
            location: null,
            status: null,
            skills: [],
            bio: null,
            githubusername: null,
            experience: [],
            education: [] 
        }
    },
    reducers:{
        ProfileStore: (state, actions) =>{
            state.value = actions.payload;  
        }
        
    }
})

export const { ProfileStore } = ProfileSlice.actions;
export default ProfileSlice.reducer
