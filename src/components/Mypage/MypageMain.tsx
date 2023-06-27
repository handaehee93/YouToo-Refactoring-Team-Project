import MyDiary from "./MyDiary";
import MypagePagination from "./MypagePagination";
import MyLikeDiary from "./MyLikeDiary";
import MyComment from "./MyComment";
import MyInfo from "./MyInfo";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { DiaryData } from "../../util/Type";
import { CommentData } from "../../util/Type";
import { UserData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import { useContext } from "react";
import { myContext } from "../../theme";
import { getUidData, getUserData, userState } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
const ListTab = styled.ul`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 50px 0 50px 0;
  gap: 10px;
  cursor: pointer;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    width: 200px;
    height: 40px;
    text-align: center;

    > .el {
      color: ${(props) => props.theme.subText};
    }
  }

  .focused {
    border-bottom: 2px solid ${(props) => props.theme.mainText};

    > .el {
      color: ${(props) => props.theme.mainText};
    }
  }
`;

const MypageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoContainer = styled.div`
  width: 100vw;
  max-width: 900px;
  font-size: 15px;
`;

const DiaryContainer = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
  gap: 56.6px;
`;

const CommentContainer = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
`;

function MypageMain() {
  const [userUid,setUserUid] = useState('')
  const [userData, setUserData] = useState<UserData[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const LIMIT_COUNT: number = 20;
  const offset: number = (page - 1) * LIMIT_COUNT;



  // 로그인 유저 uid 가져오기
  useEffect(() => {
    userState((user:any) => setUserUid(user.uid))
  }, []);

  // 로그인한 user가 작성한 diary 가져오기
  useEffect(() => {
    userUid && getUserData(userUid)
    .then((res:any)=> {
      setUserData(res)
    })
  }, [userUid]);

  // 마이 페이지 탭 리스트
  const tabArr = [
    { feel: "마이 페이지" }
    // { feel: "나의 다이어리" },
  ];

  // 탭 선택 이벤트 핸들러
  const selectTabHandler = (index: number) => {
    setCurrentTab(index);
  };

  const uuid = uuidv4
  return (
    <>
      <ListTab>
        {tabArr.map((tab, index) => {
          return (
            <li
              key={index}
              className={currentTab === index ? "tab focused" : "tab"}
              onClick={() => selectTabHandler(index)}
            >
              <div className='el'>{tab.feel}</div>
            </li>
          );
        })}
      </ListTab>
      <MypageContainer>
          <InfoContainer>
            { userData.length > 1 && <MyInfo list={userData} />}
          </InfoContainer>
      </MypageContainer>
    </>
  );
}

export default MypageMain;


  // Tab 1(MyInfo) : 나의 유저 정보만 불러오는 get 요청
  // const UserData =  () => {
    // userState((user:any) => console.log(user.uid))
    // userState((user:any) =>setUserUid(user.uid))
    //   .then(() => console.log(userUid))
      // .then(() => getUserData(userUid))
      // .then((res:any)=> setUserData(res))
        // .then((res:any)=> console.log('res',res))
  // };


//   <CommentContainer>
//   {myCommentData.slice(offset, offset + LIMIT_COUNT).map((value) => {
//     return <MyComment list={value} key={value.commentId} />;
//   })}
// </CommentContainer>

{/* <DiaryContainer>
{myLikeDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
  return <MyLikeDiary list={value} key={value.diaryId} />;
})}
</DiaryContainer> */}

{/* <DiaryContainer>
{myDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
  return <MyDiary  list={value} key={value.diaryId} />;
})}
</DiaryContainer> */}

{/* {userData.map((value: any) => {
              return <MyInfo list={value} key={value.userId} getUserData={UserData} />;
            })} */}

       {/* <MypagePagination
        myPageLength={myDiaryData.length}
        myLikePageLength={myLikeDiaryData.length}
        myCommentPageLength={myCommentData.length}
        LIMIT_COUNT={LIMIT_COUNT}
        page={page}
        setPage={setPage}
        currentTab={currentTab}
      /> */}