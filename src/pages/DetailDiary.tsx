import DetailMain from "../components/DetailDiary/DetailMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { myContext } from "../theme";
import { useAppSelector } from '../redux/store/hooks';
import { selectLogin } from '../redux/slice/LoginSlice';
import { useLocation } from 'react-router-dom';

function DetailDiary() {
  // const { isLogin }: any = useContext(myContext);
  const LOGIN = useAppSelector(selectLogin);
  console.log('로그인',LOGIN)
  // const LOG = JSON.stringify(LOGIN)
  // console.log('LOG',LOG.email)

  const {state: {
    list, listUid
  }} = useLocation()
  console.log('디테일 메인',list)

  return (
    <>
      {LOGIN ? <LoginHeader /> : <LogoutHeader />}
      <DetailMain />
    </>
  );
}

export default DetailDiary;
