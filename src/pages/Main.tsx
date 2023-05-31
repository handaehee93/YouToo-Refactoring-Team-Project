import Carousel from "../components/Main/Carousel";
import DiaryMain from "../components/Main/DiaryMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { myContext } from "../theme";
import { useAppSelector } from '../redux/store/hooks';
import { selectLogin } from '../redux/slice/LoginSlice';

function Main() {
  const { isLogin }: any = useContext(myContext);
  const LOGIN = useAppSelector(selectLogin);

  return (
    <>
      {LOGIN? <LoginHeader /> : <LogoutHeader />}
      <Carousel />
      <DiaryMain />
    </>
  );
}

export default Main;
