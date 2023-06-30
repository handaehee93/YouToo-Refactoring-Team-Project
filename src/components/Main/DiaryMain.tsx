import DiaryList from "./DiaryList";
import Pagination from "./Pagination";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { DiaryData} from "../../util/Type";
import { getData} from '../../firebase';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';

function DiaryMain() {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0); // 탭 이동 상태
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호 (기본값: 1페이지부터 노출)
  const LIMIT_COUNT: number = 12;
  const offset: number = (page - 1) * LIMIT_COUNT; // 각 페이지에서 첫 데이터의 위치(index) 계산

const [selectTag, setSelectTag] = useState('')
const [filterData, setFilter] = useState<DiaryData[]>([])
const [tagState,setTagState] = useState(false)

useEffect(() => {
  getData()
    .then((data:any)=> setDiaryData(data))
},[])


const selectTagHandler = (e:any,index:number) => {
  setCurrentTab(index);
  setSelectTag(e.target.value)
  setTagState(true)
  
  if(e.target.value === '전체') {
    setFilter(diaryData)
  } else {
    const selectedTagData = diaryData && diaryData.filter((value) => Object.keys(value)[0] === e.target.value);
    setFilter(selectedTagData)
  }
  
};
// console.log('다이어리 전체 데이터' ,diaryData)
// console.log('필터된 데이터',filterData)
// console.log('선택한 태그', selectTag)

const tagArr = [
  { feel: "전체" },
  { feel: "음악" },
  { feel: "교양" },
  { feel: "예능" },
  { feel: "스포츠" },
  { feel: "테크" },
  { feel: "요리" },
  { feel: "기타" },
];
return (
  <main>
      <ListTab>

        {tagArr.map((tab, index) => {
          return (
            <button
              key={index}
              className={currentTab === index ? "tab focused" : "tab"}
              onClick={(e) => selectTagHandler(e,index)}
              value={tab.feel}
            >
              {tab.feel}
              {/* <div className='el'>{tab.feel}</div> */}
            </button>
          );
        })}
      </ListTab>
      {/* data.diaryId */}
      <DiaryMainContainer>
        <DiaryMainWrapper>
          {
            !tagState && diaryData ? diaryData.slice(offset, offset + LIMIT_COUNT).map((data,idx) => {
              let a = 0
              return <DiaryList list={data} key={data.diaryId} />;
            }):
            tagState && filterData.slice(offset, offset + LIMIT_COUNT).map((data,idx) => {
              let b = 0
              return <DiaryList list={data} key={data.diaryId}/>;
            })
          }
        </DiaryMainWrapper>

      </DiaryMainContainer>
      <Pagination
        allPageLength={diaryData ? filterData.length : 0}
        // tagOnePageLength={
        //   diaryData.filter((value) => value.tag.includes(tagArr[1].feel)).length
        // }
        // tagTwoPageLength={
        //   diaryData.filter((value) => value.tag.includes(tagArr[2].feel)).length
        // }
        // tagThreePageLength={
        //   diaryData.filter((value) => value.tag.includes(tagArr[3].feel)).length
        // }
        // tagFourPageLength={
        //   diaryData.filter((value) => value.tag.includes(tagArr[4].feel)).length
        // }
        // tagFivePageLength={
        //   diaryData.filter((value) => value.tag.includes(tagArr[5].feel)).length
        // }
        // tagSixPageLength={
        //   diaryData.filter((value) => value.tag.includes(tagArr[6].feel)).length
        // }
        // tagSevenPageLength={
        //   diaryData.filter((value) => value.tag.includes(tagArr[7].feel)).length
        // }
        // tagEightPageLength={
        //   diaryData.filter((value) => value.tag.includes(tagArr[8].feel)).length
        // }
        LIMIT_COUNT={LIMIT_COUNT}
        page={page}
        setPage={setPage}
        currentTab={currentTab}
      />
    </main>
  );
}

export default DiaryMain;

const ListTab = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  margin-bottom: 50px;
  gap: 10px;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    width: 100px;
    height: 40px;
    border-radius: 50px;
    text-align: center;
    padding: 7px 7px;
    border: 1px solid ${(props) => props.theme.disabledTagBorder};
    background-color: ${(props) => props.theme.disabledTagBackground};
    transition: 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
    }

    > .el {
      color: ${(props) => props.theme.disabledTagColor};
    }
  }

  .focused {
    border: 1px solid ${(props) => props.theme.mainColor};
    background-color: ${(props) => props.theme.mainColor};

    > .el {
      color: ${(props) => props.theme.TagColor};
      font-weight: 600;
    }
  }
`;

const DiaryMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DiaryMainWrapper = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
  gap: 56.6px;
`;

  // 전체 diary 데이터 get 요청
  // /diary
  // const getDiaryData = async () => {
  //   getData()
  //     .then((data:any)=> setDiaryData(data))

  //   getData()
  //     .then((data)=> {
  //       console.log(data)
  //       setDiaryData(data)
  //     })
  //   try {
  //     const res = await BASE_API.get(`http://ec2-15-164-230-157.ap-northeast-2.compute.amazonaws.com:8080`);
  //     setDiaryData(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


// 임시 데이터 저장 하는 코드
{/* <button onClick={()=> {writeDiaryData(2)}}>ddd</button> */}
{/* <button onClick={() => {getData().then((data:any)=> {
setDiaryData(data)
console.log(data)})}}>getdata</button> */}
{/* <button onClick={() => {writeComment(8)}}>addComment</button> */}


