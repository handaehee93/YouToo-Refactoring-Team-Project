import EditList from "./EditList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DiaryData } from "../../util/Type";

interface Props {
  list: DiaryData
  listUid:string
  setDiaryData:any
}

export default function EditMain({list,listUid,setDiaryData}:Props) {
  const [detailData, setDetailData] = useState<DiaryData>();

  useEffect(() => {
    list && setDetailData(list)
  },[list])


  return (
    <>
      {
        detailData && 
        <EditList list={detailData} setDiaryData={setDiaryData} listUid={listUid}/>
      }
    </>
  );
}


