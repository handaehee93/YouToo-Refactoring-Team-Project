import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import NewPlayList from "./NewPlayList";
import { PlaylistData } from "../../util/Type";
import { getUidData,userState } from '../../firebase';
import { writeDiaryData } from '../../firebase';
import { useAppSelector } from '../../redux/store/hooks';
import { selectLogin } from '../../redux/slice/LoginSlice';



export default function NewMain():any {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");
  const [newPlayList, setNewPlayList] = useState<PlaylistData[]>([]);
  const [newUrl, setNewUrl] = useState<string>("");
  const [userUid, setUserUid] =useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [uidData, setUidData] = useState({})
  const navigate = useNavigate();
  const today: string = new Date().toISOString().substring(0, 10);
  const nickName = useAppSelector(selectLogin);
  const [newTag, setNewTag] = useState<string>('');
  // const [exData,setExdata] = useState()
  
  useEffect(() => {
    userState((user:any) => setUserUid(user.uid))
    setNickname(nickName && nickName)
  },[])


// useEffect(() => {
//   getUidData(userUid && userUid)
//   .then((res:any) => {
//     setExdata(res[0])
//     return

//   })
// },[])



  
  // 제목 수정 체인지 이벤트
  const changeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // 플레이리스트 수정 체인지 이벤트
  const changeNewUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
  };

  // 전체 url을 입력받은 후 id만 필터링
  const getVideoId = (url: string) => {
    if (url.indexOf("/watch") > -1) {
      const arr = url.replaceAll(/=|&/g, "?").split("?");
      const id = arr[arr.indexOf("v") + 1];
      return id
    } else if (url.indexOf("/youtu.be") > -1) {
      const arr = url.replaceAll(/=|&|\//g, "?").split("?");
      const id2 = arr[arr.indexOf("youtu.be") + 1];
      return id2
    } else {
      return "none";
    }
    
  };

  // 필터링 된 id를 이용하여 등록한 Url 정보 불러옴
  const getYoutubeData = async (id: any) => {
    try {
      const res =
        await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}
      &part=snippet`);
      return res.data.items[0]?.snippet;
    } catch (err) {
      console.error(err);
    }
  };

  // 추가 버튼 클릭 시 플레이리스트 담는 이벤트 핸들러
  const addPlayList = () => {
    const musicInfo: PlaylistData = {};
    const urlId = getVideoId(newUrl);
    getYoutubeData(urlId)
      .then((res) => {
        musicInfo.channelId = res.channelId;
        if (res.thumbnails.maxres) {
          musicInfo.thumbnail = res.thumbnails.maxres.url;
        } else {
          musicInfo.thumbnail = res.thumbnails.medium.url;
        }
        musicInfo.title = res.title;
        musicInfo.url = newUrl;
      })
      .then(() => {
        setNewPlayList((value) => [...value, musicInfo]);
        setNewUrl("");
      });
  };
// 다이어리 등록 함수
  const submitHandler = () => {
    writeDiaryData(userUid,newTitle,newBody,newPlayList, today, nickname, uidData, newTag)
    alert('다이어리가 등록 되었습니다')
    navigate('/')
  }

      // 드롭다운 선택 시 태그 추가하는 이벤트 핸들러
  const addCategory = (value: string) => {
    setNewTag(value)
  };
  return (
    <MainContainer>
      <MainWrapper>
        <TitleArea>
          <input
            className='inputTitle'
            type='text'
            // value={postDiary && postDiary.title }
            placeholder='제목을 입력하세요'
            onChange={changeNewTitle}
          />
          <SubmitButton onClick={submitHandler} disabled={newTitle.length === 0}>
            등록하기
          </SubmitButton>
        </TitleArea>
        <AlbumCoverArea>
          <div className='coverImg'></div>
          <InfoArea>
            <UserInfo>
              <span className='text'>등록자</span>
              {nickname && nickname}
            </UserInfo>
            <UserInfo>
              <span className='text'>등록일</span>
              {today.toString()}
            </UserInfo>
            <UserInfoTag>
                <span className='tag'>태그</span>
                <div className='drop'>
                  <select className='dropTag' onChange={(e) => addCategory(e.target.value)} required>
                    <option value=''>태그 선택</option>
                    <option value='음악'>음악</option>
                    <option value='스포츠'>스포츠</option>
                    <option value='예능'>예능</option>
                    <option value='요리'>요리</option>
                    <option value='교양'>교양</option>
                    <option value='테크'>테크</option>
                    <option value='기타'>기타</option>
                  </select>
                </div>
                <div className='selected'>
                  {newTag}
                </div>
            </UserInfoTag>
          </InfoArea>
        </AlbumCoverArea>
        <AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <ReactQuill
            className='playContent'
            placeholder='나만의 다이어리를 작성해 보세요'
            onChange={(e) => setNewBody(e)}
          />
        </AlbumInfoArea>
        <PlayListArea>
          <div className='playTitle'>유튜브 링크</div>
          <UrlInput>
            <input
              value={newUrl}
              placeholder='유튜브 URL을 입력해 주세요'
              onChange={changeNewUrl}
            />
            <button className='sumbit' onClick={() => {addPlayList()}} disabled={newUrl.length === 0}>
              추가
            </button>
          </UrlInput>
          {newPlayList?.map((value, index) => {
            return (
              <NewPlayList
                list={value}
                key={index}
                newPlayList={newPlayList}
                setNewPlayList={setNewPlayList}
              />
            );
          })}
        </PlayListArea>
      </MainWrapper>
    </MainContainer>
  );
}





export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const MainWrapper = styled.form`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  padding: 10px 20px 10px 20px;
`;

export const TitleArea = styled.div`
  height: 90px;
  display: flex;
  white-space: normal;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.detailLine};
  padding: 0 10px 0 10px;

  > .inputTitle {
    width: 580px;
    font-size: 24px;
    font-weight: 600;
    padding: 10px 8px 10px 8px;
    border-radius: 4px;
    color: ${(props) => props.theme.mainText};
    border: none;
    border: 1px solid ${(props) => props.theme.disabledTagBorder};
    background-color: ${(props) => props.theme.disabledTagBackground};

    &:focus {
      outline: none;
    }
  }
`;

export const SubmitButton = styled.button`
  font-size: 13px;
  color: #1c1a16;
  font-weight: 700;
  background-color: ${(props) => props.theme.mainColor};
  border: none;
  width: 140px;
  height: 35px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

export const AlbumCoverArea = styled.div`
  display: flex;
  margin: 30px 0 30px 0;
  > .coverImg {
    width: 190px;
    height: 180px;
    margin-right: 30px;
    border-radius: 4px;
    background-color: lightgray;
  }
`;

export const InfoArea = styled.div`
  width: 400px;
  margin-top: 5px;
`;

export const UserInfo = styled.div`
  display:flex;
  margin-bottom: 15px;
  font-size: 14px;
  color: ${(props) => props.theme.mainText};
  > .text {
    font-size: 13px;
    margin-right: 50px;
  }
`;

export const UserInfoTag = styled.div`
  display:flex;
  font-size: 14px;
  color: ${(props) => props.theme.mainText};
  > .tag {
    font-size: 13px;
    margin-right: 50px;
    @media (max-width: 400px) {
    margin-right: 10px;
  }
  }
  >.drop {
    margin-left:10px;
    @media (max-width: 400px) {
    margin-left: 20px
  }
  }
  > .selected {
    margin-left:50px;
    @media (max-width: 400px) {
      display:none;
  }
  }
`;


// 다이어라 소개 부분
export const AlbumInfoArea = styled.div`
  padding: 30px 10px 80px 10px;
  border-top: 1px solid ${(props) => props.theme.detailLine};

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }

  > .playContent {
    color: ${(props) => props.theme.mainText};
    width: 100%;
    height: 200px;

    > .ql-toolbar {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: none;
      border: 1px solid ${(props) => props.theme.disabledTagBorder};
      background-color: ${(props) => props.theme.disabledTagBackground};
    }

    > .ql-container {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border: none;
      border: 1px solid ${(props) => props.theme.disabledTagBorder};
      background-color: ${(props) => props.theme.disabledTagBackground};

      > .ql-editor::before {
        color: gray;
        font-style: normal;
      }
    }
  }
`;

// 다이어리 수록곡 부분
export const PlayListArea = styled.div`
  padding: 30px 10px 80px 10px;
  border-top: 1px solid ${(props) => props.theme.detailLine};

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }
`;

export const UrlInput = styled.div`
  display: flex;
  margin-bottom: 20px;

  > input {
    color: ${(props) => props.theme.mainText};
    width: 1300px;
    resize: none;
    margin-right: 10px;
    border-radius: 4px;
    padding: 10px 8px 10px 8px;
    border: none;
    border: 1px solid ${(props) => props.theme.disabledTagBorder};
    background-color: ${(props) => props.theme.disabledTagBackground};

    &:focus {
      outline: none;
    }
  }

  > .sumbit {
    width: 90px;
    min-width: 90px;
    border: none;
    color: #21252b;
    border-radius: 4px;
    background-color: ${(props) => props.theme.mainColor};
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.buttonHover};
    }
  }
`;

  // console.log('nickname',nickname)

  // 다이어리 post 요청
  // const submitHandler =  () => {
  //   console.log(userUid)
  //   writeDiaryData(userUid,newTitle,newBody,newPlayList)
  //   const newDiary = {
  //     title: newTitle,
  //     body: newBody,
  //     playlists: newPlayList,
  //   };
  //   await TOKEN_API.post(`/diary`, newDiary);
  //   navigate(`/`);
  // };



// 


                {/* {newTag.map((value: string, index: number) => (
                      <li key={index}>
                        <div className='tagTitle'>{value}</div>
                        <div className='tagcloseBtn' onClick={() => removeTags(index)}>
                          <IoIosClose size={20} />
                        </div>
                      </li>
                    ))} */}