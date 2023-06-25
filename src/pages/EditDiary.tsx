import EditMain from "../components/EditDiary/EditMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { myContext } from "../theme";
import { useAppSelector } from '../redux/store/hooks';
import { selectLogin } from '../redux/slice/LoginSlice';
import { useLocation } from 'react-router-dom';
function EditDiary() {

  const LOGIN = useAppSelector(selectLogin);
  const {state: { list, listUid,setDiaryData }} = useLocation()
  console.log('에딧 다이어리',list)
  return (
    <>
      {LOGIN ? <LoginHeader /> : <LogoutHeader />}
      <EditMain list={list} setDiaryData={setDiaryData} listUid={listUid}/>
    </>
  );
}

export default EditDiary;
