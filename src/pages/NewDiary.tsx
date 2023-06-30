import NewMain from "../components/NewDiary/NewMain";
import LoginHeader from "../components/Navbar/LoginHeader";
import LogoutHeader from "../components/Navbar/LogoutHeader";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../theme";
import { useAppSelector } from '../redux/store/hooks';
import { selectLogin } from '../redux/slice/LoginSlice';

function NewDiary() {
  const [login, setLogin] = useState<string | undefined>()

  useEffect(() => {
    const userLogin = localStorage.getItem('login')
    userLogin && setLogin(userLogin)
  }, [])

  return (
    <>
      {login ? <LoginHeader /> : <LogoutHeader />}
      <NewMain />
    </>
  );
}

export default NewDiary;
