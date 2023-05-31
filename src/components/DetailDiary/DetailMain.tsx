import DetailList from "./DetailList";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DiaryData, DiaryData2 } from "../../util/Type";
import { BASE_API } from "../../util/API";

function DetailMain() {
  const [detailData, setDetailData] = useState<DiaryData2>();

  const { diaryId } = useParams();
  const {state: {
    list:list
  }} = useLocation()
  console.log(list)
  useEffect(() => {
  setDetailData(list)

  },[list])
  console.log('main', list)
  // 선택한 다이어리 get 요청
  // const getDetailData = async () => {
  //   try {
  //     const res = await BASE_API.get(`/diary/${diaryId}`);
  //     setDetailData(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // useEffect(() => {
  //   getDetailData();
  // }, []);

  return <>{detailData && <DetailList list={detailData} getDetailData={() => {}} />};</>;
}

export default DetailMain;
