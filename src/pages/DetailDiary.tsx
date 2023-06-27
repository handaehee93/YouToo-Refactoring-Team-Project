import DetailMain from "../components/DetailDiary/DetailMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../theme";
import { useAppSelector } from '../redux/store/hooks';
import { selectLogin } from '../redux/slice/LoginSlice';
import { useLocation } from 'react-router-dom';

function DetailDiary() {
  const [login, setLogin] = useState<string | undefined>()

  useEffect(() => {
      const userLogin = localStorage.getItem('login')
      userLogin && setLogin(userLogin)
    },[])

  return (
    <>
      {login ? <LoginHeader /> : <LogoutHeader />}
      <DetailMain />
    </>
  );
}

export default DetailDiary;
