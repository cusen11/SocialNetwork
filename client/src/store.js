import loginReducer from './reducers/Login';
import PostReducer from './reducers/Posts';
import { configureStore } from '@reduxjs/toolkit' ;
import { persistReducer } from 'redux-persist';
import {combineReducers} from "redux"; 
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const reducers = combineReducers({ 
  login: loginReducer,
  posts: PostReducer 
 });
const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});