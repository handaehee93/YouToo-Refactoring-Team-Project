import styled from "styled-components";
import DetailPlayList from "./DetailPlayList";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { DiaryData} from "../../util/Type";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import DOMPurify from "dompurify";
import { getUserData, removeFromDiary, userState} from '../../firebase';



interface Props {
  list: DiaryData;
  listUid:string

}

export default function DetailList({ list, listUid}: Props) {
  const [userUid, setUserUid] = useState('')
  const [currentUser, setCurrentUser] = useState()

  // 페이지가 렌더링이 되면 userState함수가 실행이 되면서 user의 정보를 받아옴
  useEffect(() => {
    userState((user:any) => setUserUid(user.uid))
  },[])

  const [checkLike, setCheckLike] = useState<boolean>(false);
  const [withDrawalModalOpen, setWithdrawalModalOpen] = useState<boolean>(false);




  const navigate = useNavigate();

  useEffect(() => {
    getUserData(userUid)
    .then(res=> res?.map((us:any) => {
      setCurrentUser(us)
    }))
  })

  const myDiary: boolean = list.userNickname === currentUser


  
  // 좋아요 버튼
  // const plusLikeCount = async () => {
  //   if (checkLike === false) {
  //     const like = {
  //       likeCount: list.likeCount + 1,
  //     };
  //     const res = await TOKEN_API.patch(`/diary/${diaryId}`, like);
  //     getDetailData(res.data);
  //     setCheckLike(true);
  //   } else {
  //     const like = {
  //       likeCount: list.likeCount - 1,
  //     };
  //     const res = await TOKEN_API.patch(`/diary/${diaryId}`, like);
  //     getDetailData(res.data);
  //     setCheckLike(false);
  //   }
  // };

  // 다이어리 삭제 모달 오픈 이벤트 핸들러
  const openModalHandler = () => {
    setWithdrawalModalOpen(!withDrawalModalOpen);
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  };

  // 다이어리 삭제 모달 클로즈 이벤트 핸들러
  const closeModalHandler = () => {
    setWithdrawalModalOpen(!withDrawalModalOpen);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  // 선택한 다이어리 delete 요청
  const postDelete = async () => {
    removeFromDiary(userUid, listUid)
  };


  // 수정 페이지로 이동
  const moveEditDiary = () => {
    list && navigate(`/EditDiary/${list.diaryId}`,{state: {list,listUid}});
  };

  return (
    <DetailMainContainer>
      <DetailMainWrapper>
        <TitleArea>
          <div className='DetailTitle'>{list.title}</div>
          <ButtonArea>
            {myDiary ? (
              <>
                <button className='edit' onClick={moveEditDiary}>
                  수정
                </button>
                <button className='delete' onClick={openModalHandler}>
                  삭제
                </button>
              </>
            ) : null}
            {withDrawalModalOpen ? (
              <DeleteModalBack>
                <DeleteModalView>
                  <div className='deleteModalTitle'>다이어리를 삭제 하시겠습니까?</div>
                  <div className='warningText'>삭제한 다이어리는 복구되지 않습니다.</div>
                  <button className='deleteCancelButton' onClick={closeModalHandler}>
                    취소
                  </button>
                  <button
                    className='deleteButton'
                    onClick={() => {
                      postDelete();
                      closeModalHandler();
                    }}
                  >
                    삭제
                  </button>
                </DeleteModalView>
              </DeleteModalBack>
            ) : null}
            <button className='like'>
              {checkLike === true ? (
                <AiFillHeart className='likeIcon' size={16} />
              ) : (
                <AiOutlineHeart className='likeIcon' size={16} />
              )}
              좋아요
              <span className='likeCount'>{list.likeCount}</span>
            </button>
          </ButtonArea>
        </TitleArea>
        <AlbumCoverArea>
          <img className='coverImg' src={list && list.playlists[0]?.thumbnail} alt='첫번째 앨범 커버' />
          <InfoArea>
            <UserInfo>
              <span className='text'>등록자</span>
              {list.userNickname}
            </UserInfo>
            <UserInfo>
              <span className='text'>등록일</span>
              {list.createdAt.substring(0, 10)}
            </UserInfo>
            <UserInfoTag>
            <div>
              <p>태그</p>
            </div>
            <div className='selected'>
              {list.tag}
            </div>
            </UserInfoTag>
          </InfoArea>
        </AlbumCoverArea>
        <AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <div
            className='playContent'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(list.body) }}
          ></div>
        </AlbumInfoArea>
        <PlayListArea>
          <div className='playTitle'>유튜브 링크</div>
          {list.playlists?.map((value, index) => {
            return <DetailPlayList list={value} key={index} />;
          })}
        </PlayListArea>
      </DetailMainWrapper>
    </DetailMainContainer>
  );
}




const DetailMainContainer = styled.div`
  display: flex;
  justify-content: center;

`;

const DetailMainWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  padding: 10px 20px 10px 20px;
`;

const TitleArea = styled.div`
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.detailLine};
  padding: 0 10px 0 10px;

  > .DetailTitle {
    width: 580px;
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.mainText};
  }
`;

const ButtonArea = styled.div`
  display: flex;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    padding: 5px;
    background-color: transparent;
    cursor: pointer;
  }

  > .edit {
    width: 40px;
    color: ${(props) => props.theme.mainText};
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .delete {
    width: 40px;
    color: ${(props) => props.theme.mainText};
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .like {
    color: ${(props) => props.theme.mainText};
    margin-left: 25px;
    width: 140px;
    height: 35px;
    border: 1px solid ${(props) => props.theme.detailLine};
    border-radius: 4px;

    > .likeIcon {
      color: #ec1d36;
      margin-right: 5px;
    }

    > .likeCount {
      margin-left: 5px;
    }

    &:hover {
      background-color: ${(props) => props.theme.likeHover};
    }
  }
`;

const DeleteModalBack = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const DeleteModalView = styled.div`
  text-align: center;
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  width: 430px;
  height: 220px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .deleteModalTitle {
    color: ${(props) => props.theme.mainText};
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin: 30px 0 45px 0;
  }

  > .warningText {
    color: ${(props) => props.theme.subText};
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 50.5px;
  }

  > button {
    font-weight: 500;
    width: 215px;
    height: 50px;
    border: none;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }

  > .deleteCancelButton {
    color: ${(props) => props.theme.subText};
    font-weight: 600;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.detailLine};
    border-right: 0.5px solid ${(props) => props.theme.detailLine};
    border-bottom-left-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.likeHover};
    }
  }

  > .deleteButton {
    color: #ec1d36;
    font-weight: 600;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.detailLine};
    border-left: 0.5px solid ${(props) => props.theme.detailLine};
    border-bottom-right-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.likeHover};
    }
  }
`;

const AlbumCoverArea = styled.div`
  display: flex;
  margin: 30px 0 30px 0;

  > .coverImg {
    width: 190px;
    height: 180px;
    margin-right: 30px;
    border-radius: 4px;
    background-color: lightgray;
    object-fit: cover;
  }
`;

const InfoArea = styled.div`
  width: 400px;
  margin-top: 5px;
`;

const UserInfo = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  color: ${(props) => props.theme.mainText};

  > .text {
    font-size: 13px;
    margin-right: 50px;
  }
`;
const UserInfoTag = styled.div`
  display:flex;
  margin-bottom: 15px;
  font-size: 14px;
  color: ${(props) => props.theme.mainText};

  > .selected {
    margin-left:60px
  }
`;

const AlbumInfoArea = styled.div`
  padding: 30px 10px 30px 10px;
  border-top: 1px solid ${(props) => props.theme.detailLine};
  height: 30vh;
  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }

  > .playContent {
    font-size: 14px;
    color: ${(props) => props.theme.mainText};
  }
`;

const PlayListArea = styled.div`
  padding: 30px 10px 30px 10px;
  border-top: 1px solid ${(props) => props.theme.detailLine};

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }
`;

