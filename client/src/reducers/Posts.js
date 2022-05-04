import { createSlice } from "@reduxjs/toolkit";

export const PostSlice = createSlice({
    name:'Posts',
    initialState:{},
    reducers:{
        GetPost: (state, actions) =>{
            state.value = actions.payload.data;  
        },
        GetPostByUser: (state, actions) =>{ 
            state.users = actions.payload.data; 
        }
    }
})

export const { GetPost,GetPostByUser } = PostSlice.actions;
export default PostSlice.reducer
