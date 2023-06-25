import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DiaryData, DiaryDataProps, DiaryDataProps2 } from "../../util/Type";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import DiaryCard from './DiaryCard';
import { v4 as uuidv4 } from 'uuid';


interface Props {
  list: DiaryData

}
function DiaryList({ list }:Props) {
  const navigate = useNavigate();
  // const arr = Array(list)
  // console.log('arr',arr)
  const list2 = Object.values(list)
  const listUid = Object.keys(list)

  // console.log('DiaryMain에서 props로 전달한 데이터',list)
  // console.log('DiaryMain에서 props로 전달한 데이터의 value',list2)
  // console.log('DiaryMain에서 props로 전달한 데이터의 키',listUid)
const uuid = uuidv4()
  return (
    <>
      {
        list2 && list2.map((list1,idx) => { 
          return <DiaryCard list={list1} key={list1.diaryId} listUid={listUid[idx]} />
        })
      }
      {/* {
        list2.map((list1) => {
          return listUid.map((uid,idx) => {
            return <DiaryCard list={list1} listUid={uid} key={list1.diaryId}/>
          })
        })
      } */}
    </>

  );
}

export default DiaryList;


export const DiaryListContainer = styled.li`
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  width: 310px;
  height: 339px;
  list-style: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.disabledTagBackground};
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }
`;

export const Thumbnail = styled.img`
  width: 310px;
  height: 184px;
  background-color: lightgray;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const InfoArea = styled.div`
  padding: 15px;

  > .infoTitle {
    color: ${(props) => props.theme.mainText};
    font-weight: 500;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > .infoDate {
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => props.theme.diaryDate};
    margin-bottom: 15px;
  }
`;

// export const Tag = styled.ul`
//   display: flex;
//   font-size: 12px;
//   font-weight: 500;
//   color: #757170;
//   list-style: none;

//   > li {
//     margin-right: 5px;
//     padding: 3px 6px 3px 6px;
//     border: 1px solid #d1d1d1;
//     border-radius: 50px;
//   }
// `;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px 8px 15px;
  border-top: 0.5px solid ${(props) => props.theme.diaryInfoLine};
  /* 태그 미구현으로 인한 임시로 위치 내림 */
  margin-top: 20px;
`;

export const ByUsername = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.mainText};

  > .by {
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => props.theme.diaryDate};
    margin: 0 5px 2px 0;
  }
`;

export const Profile = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: lightgray;
`;

export const LikeAndComment = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${(props) => props.theme.mainText};

  > .likeIcon {
    color: red;
    margin-right: 5px;
  }

  > .commentIcon {
    color: ${(props) => props.theme.mainText};
    margin: 0 5px 0 10px;
  }
`;