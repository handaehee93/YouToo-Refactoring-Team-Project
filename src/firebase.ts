import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue, child, get, remove } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';




const firebaseConfig = {
  apiKey: "AIzaSyB3l3hlX4WfwRk1QDbLOUmfpv52gWW73Ow",
  authDomain: "music-1aa8a.firebaseapp.com",
  projectId: "music-1aa8a",
  storageBucket: "music-1aa8a.appspot.com",
  messagingSenderId: "1014569750077",
  appId: "1:1014569750077:web:5b9331daa8b23c7bf9e454",
  measurementId: "G-GC1VKDEP9C",
  databaseURL: "https://music-1aa8a-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getDatabase(app);






// 회원 가입 함수
export async function  signUp (email:string, password:string, nickname:string) {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('유아이디',user.uid)
    writeUserData(user.uid, user.email ,nickname)
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorMessage
  });
}

// 회원 가입시 user정보 db에 저장하는 함수
function writeUserData(userUid:string, email:string|null, nickname:string) {
  set(ref(db, `users/${userUid}`), {
    userEmail: email,
    userNickname: nickname
  });
}


// 로그인 함수
export async function userLogin (email:any, password:string) {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('로그인한 유저 정보',user)
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorCode
  });
}

interface LoginUserType {
  userEmail:string;
  userNickname:string
}
// 현재 로그인한 user의 정보를 가져오는 함수
const dbRef = ref(db);
export async function getUserData (uid:string){
  // console.log('전달받은 uid',uid)
  return get(child(dbRef,`users/${uid}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      // console.log('firebase함수',snapshot.val());
      const us = snapshot.val()
      return Object.values(us)
    } else {
      console.log("No data available");
    }
  })
}



// userstate
export  async function userState (callback:any) {
  return onAuthStateChanged(auth,  async (user:any) => {
    callback(user)
    // console.log(user.email)
    // return user.email
    // if (user) {
    //   // User is signed in, see docs for a list of available properties
    //   // https://firebase.google.com/docs/reference/js/firebase.User
    //   const uid = user.uid;
    //   const userEmail = user.email
    //     cb(user)
    //   // console.log(user.email)
      
    //   // ...
    // } else {
    //   // User is signed out
    //   // ...
    // }
  })
  
}

// 데이터 post하는 함수
export function writeDiaryData(userUid:any,title:string, body:string, playlists:any, today:string, nickname: string , uidData:any) {
  const uuid = uuidv4()
  set(ref(db, `diarys/${userUid}/${uuid}`), {
      diaryId: uuid,
      title: title,
      body: body,
      viewCount: 0,
      likeCount: 0,
      createdAt: today,
      modifiedAt: "",
      userNickname: nickname,
      playlists: playlists,
      comments: {
        commentId: userUid + 1,
        diaryId: userUid,
        body: "",
        createdAt: "",
        modifiedAt: "",
        userNickname: '한대희'
      }
  });
}
export function writeComment(userId:any) {
  set(ref(db,`diarys/${userId}`), {
    comments:  {
      "commentId": userId + 1,
      "diaryId": userId,
      "body": "댓글 등록",
      "createdAt": "2023-03-22T11:00:00",
      "modifiedAt": "2023-03-22T11:03:00",
      "userNickname": '한대희'
  }
});
}


//데이터 불러오는 함수
export async function getData () {
return get(ref(db, `diarys`))
.then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    return Object.values(snapshot.val())
  } else {
    console.log("No data available");
  }
})
.catch((error) => {
  console.error(error);
});
}

// 특정 uid의 diary 가져오기
export async function getUidData (userUid:string) {
  return get(ref(db, `diarys/${userUid}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return Object.values(snapshot.val())
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
  }

  // 다이어리 수정 함수
  export async function patchDiary (userUid:string, listUid: string, list:any) {
    return set(ref(db, `diarys/${userUid}/${listUid}`),list )
  }

  // 다이어리 삭제 함수
  export async function removeFromDiary (userUid:string, listUid:string) {
    return remove(ref(db, `diarys/${userUid}/${listUid}`))
  }