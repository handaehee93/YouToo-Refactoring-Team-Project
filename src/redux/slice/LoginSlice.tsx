import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export interface UserType {
  isLogin: any
  usernickname:string
}

const initialState:UserType = {
  isLogin: '',
  usernickname:''
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logined: (state,action) => {
      state.isLogin = action.payload
    },
    userUid: (state,action) => {
      state.usernickname = action.payload
    }
  }
})



export const { logined,userUid } = loginSlice.actions
export const selectLogin = (state: RootState) => state.login.isLogin
// loginSlice에 예를들어 logined말고 여러가지 reducer가 있다면 이걸 loginSlice.reducer를 이용하여 하나의 reducer로 만들어서 export 해준다.
export default loginSlice.reducer