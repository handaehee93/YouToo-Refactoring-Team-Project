import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export interface UserType {
  isLogin: boolean
}

const initialState:UserType = {
  isLogin: false
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logined: (state) => {
      state.isLogin = true
    }
  }
})


export const {logined} = loginSlice.actions
export const selectLogin = (state: RootState) => state.login.isLogin
export default loginSlice.reducer