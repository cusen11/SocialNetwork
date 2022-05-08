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
            skills: null,
            bio: null,
            githubusername: null,
            experience: null,
            education: null 
        }
    },
    reducers:{
        ProfileStore: (state, actions) =>{
            state.value = actions.payload; 
            console.log(state.value)
        }
        
    }
})

export const { ProfileStore } = ProfileSlice.actions;
export default ProfileSlice.reducer
