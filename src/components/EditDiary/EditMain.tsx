import EditList from "./EditList";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DiaryData } from "../../util/Type";


export default function EditMain() {
  const [detailData, setDetailData] = useState<DiaryData>();

  const { diaryId } = useParams();
  // 디테일 페이지에서 navigate로 현재 데이터를 전달 하고, useLoacatin으로 받아옴
  const {state: { list, listUid }} = useLocation()
  useEffect(() => {
    setDetailData(list)
  },[list])


  return <>{detailData && <EditList list={detailData} listUid={listUid}/>}</>;
}


