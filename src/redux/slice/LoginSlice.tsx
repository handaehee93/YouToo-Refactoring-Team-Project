import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export interface UserType {
  isLogin: boolean
  usernickname:string
}

const initialState:UserType = {
  isLogin: false,
  usernickname:''
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logined: (state) => {
      console.log('state,',state.usernickname)
      state.isLogin = true
    }
  }
})


export const {logined} = loginSlice.actions
export const selectLogin = (state: RootState) => state.login.isLogin
export default loginSlice.reducer