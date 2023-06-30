import DetailList from "./DetailList";
import { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import { DiaryData } from "../../util/Type";


export default function DetailMain() {
  const [detailData, setDetailData] = useState<DiaryData>();


  const {state: {
    list, listUid
  }} = useLocation()

  useEffect(() => {
    list && setDetailData(list)
  },[])
  return (
  <>
    {
    detailData && 
      <DetailList list={detailData}  listUid={listUid} />
    };
  </>
  )
}


