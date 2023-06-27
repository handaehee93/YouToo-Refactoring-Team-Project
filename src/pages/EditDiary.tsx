import EditMain from "../components/EditDiary/EditMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
export default function EditDiary() {
  const {state: { list, listUid,setDiaryData }} = useLocation()
  const [login, setLogin] = useState<string | undefined>()

  useEffect(() => {
      const userLogin = localStorage.getItem('login')
      userLogin && setLogin(userLogin)
    },[])
  
  return (
    <>
      {login ? <LoginHeader /> : <LogoutHeader />}
      <EditMain list={list} setDiaryData={setDiaryData} listUid={listUid}/>
    </>
  );
}


