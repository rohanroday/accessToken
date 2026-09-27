import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/state/auth.slice'


export const appStore = configureStore({
  reducer: {
    auth:authReducer
  },
})


