import * as DiaryList from "../Main/DiaryList";
import { useNavigate } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../../theme";
import { getUidData, userState } from '../../firebase';

function MyDiary({ list }: DiaryDataProps) {
  const list2 = Object.values(list)
  console.log(list2)
  const { currentUser }: any = useContext(myContext);
  // const myDiary: boolean = list.userNickname === currentUser.nickname;
  const myDiary: boolean = true

  const navigate = useNavigate();

  // 디테일 페이지로 이동
  const clickHandler = () => {
    navigate(`/DetailDiary/${list.diaryId}`);
  };

  return (
    <>
      {myDiary === true ? (
        <DiaryList.DiaryListContainer onClick={clickHandler}>
          <DiaryList.Thumbnail src={list2 && list2[0].playlists[0]?.thumbnail} alt='첫번째 앨범 커버' />
          <DiaryList.InfoArea>
            <div className='infoTitle'>{list.title}</div>
            <div className='infoDate'>{list2[0].createdAt.substring(0, 10)}</div>
            {/* <DiaryList.Tag>
          {list.tag.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </DiaryList.Tag> */}
          </DiaryList.InfoArea>
          <DiaryList.UserArea>
            <DiaryList.ByUsername>
              <DiaryList.Profile />
              <div className='by'>by</div>
              {list2[0].userNickname}
            </DiaryList.ByUsername>
            <DiaryList.LikeAndComment>
              <AiFillHeart className='likeIcon' size={16} />
              {list2[0].likeCount}
              <FaRegCommentDots className='commentIcon' size={15} />
              {/* {list.comments.length} */}
            </DiaryList.LikeAndComment>
          </DiaryList.UserArea>
        </DiaryList.DiaryListContainer>
      ) : null}
    </>
  );
}

export default MyDiary;
