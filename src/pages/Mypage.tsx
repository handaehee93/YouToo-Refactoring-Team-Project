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
  const [userUid,setUserUid] = useState('')
  const [userData, setUserData] = useState<UserData[]>([]);
  


    // useEffect(() => {
    //   userState((user:any) => setUserUid(user.uid))
    // },[])


    // useEffect(() => {
    //   getUserData(userUid)
    //     .then((res:any)=> setUserData(res))
    // })

  const LOGIN = useAppSelector(selectLogin);

  return (
    <>
      {LOGIN ? <LoginHeader /> : <LogoutHeader />}
      <MypageMain />
    </>
  );
}

export default Mypage;
