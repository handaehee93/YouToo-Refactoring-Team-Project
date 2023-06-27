import DetailList from "./DetailList";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DiaryData, DiaryData2 } from "../../util/Type";
import { BASE_API } from "../../util/API";

function DetailMain() {
  const [detailData, setDetailData] = useState<DiaryData>();

  
  const {state: {
    list, listUid
  }} = useLocation()

  useEffect(() => {
    list && setDetailData(list)
  },[])
  return <>{detailData && <DetailList list={detailData} getDetailData={() => {}} listUid={listUid} />};</>;
}

export default DetailMain;
