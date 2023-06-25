import EditList from "./EditList";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DiaryData } from "../../util/Type";

interface Props {
  list: DiaryData
  listUid:string
  setDiaryData:any
}

export default function EditMain({list,listUid,setDiaryData}:Props) {
  const [detailData, setDetailData] = useState<DiaryData>();
  console.log('에딧메인',list && list)
  const { diaryId } = useParams();
  // 디테일 페이지에서 navigate로 현재 데이터를 전달 하고, useLoacatin으로 받아옴
  // const {state: { list, listUid }} = useLocation()
  useEffect(() => {
    list && setDetailData(list)
  },[list])


  return <>{detailData && <EditList list={detailData} setDiaryData={setDiaryData} listUid={listUid}/>}</>;
}


