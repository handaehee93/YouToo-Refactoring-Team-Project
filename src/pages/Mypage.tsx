import MypageMain from "../components/Mypage/MypageMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../theme";
import { useAppSelector } from '../redux/store/hooks';
import { selectLogin } from '../redux/slice/LoginSlice';
import { getUserData, userState } from '../firebase';
import { UserData } from '../util/Type';

function Mypage() {
  const [login, setLogin] = useState<string | undefined>()

  useEffect(() => {
      const userLogin = localStorage.getItem('login')
      userLogin && setLogin(userLogin)
    },[])

  return (
    <>
      {login ? <LoginHeader /> : <LogoutHeader />}
      <MypageMain />
    </>
  );
}

export default Mypage;
