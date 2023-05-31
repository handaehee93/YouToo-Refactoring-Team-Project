import EditMain from "../components/EditDiary/EditMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { myContext } from "../theme";
import { useAppSelector } from '../redux/store/hooks';
import { selectLogin } from '../redux/slice/LoginSlice';
function EditDiary() {
  const { isLogin }: any = useContext(myContext);
  const LOGIN = useAppSelector(selectLogin);

  return (
    <>
      {LOGIN? <LoginHeader /> : <LogoutHeader />}
      <EditMain />
    </>
  );
}

export default EditDiary;
