import Carousel from "../components/Main/Carousel";
import DiaryMain from "../components/Main/DiaryMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../theme";
import { useAppSelector } from '../redux/store/hooks';
import { selectLogin } from '../redux/slice/LoginSlice';

function Main() {
  const [login, setLogin] = useState<string | undefined>()
  const LOGIN = useAppSelector(selectLogin);
  useEffect(()=> {
    LOGIN && localStorage.setItem('login',LOGIN)
    const userLogin = localStorage.getItem('login')
    userLogin && setLogin(userLogin)
  },[])
  return (
    <>
      {login ? <LoginHeader /> : <LogoutHeader />}
      <Carousel />
      <DiaryMain />
    </>
  );
}

export default Main;
