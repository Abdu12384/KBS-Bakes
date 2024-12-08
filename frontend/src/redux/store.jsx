import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import  userReducer from './slices/userSlice'
import adminReducer from './slices/adminSlice'; 


const persistConfig = {
   key:'root',
   storage
}

const rootReducer= combineReducers({
  user:userReducer,
  admin:adminReducer
})

const persistedReducer= persistReducer(persistConfig,rootReducer)

const store = configureStore({
   reducer:persistedReducer
})

const persistor= persistStore(store)

export {store, persistor}