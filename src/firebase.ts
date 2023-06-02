// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { getDatabase } from "firebase/database";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";




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
// const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getDatabase(app);

function writeUserData(userId:string, email:any,nickname:string) {
  set(ref(db, `users/${userId}`), {
    userEmail: email,
    userNickname: nickname
  });
}



// 회원 가입 함수
export async function  signUp (email:string, password:any,nickname:string) {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user.uid, user.email)
    writeUserData(user.uid, user.email ,nickname)
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorMessage
  });
}



// 로그인 함수
export async function userLogin (email:any, password:string) {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    return user
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
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
export function writeDiaryData(userId:any,title:string, body:string, playlists:any, today:string) {
  set(ref(db, 'diarys/' + userId), {
      diaryId: userId,
      title: title,
      body: body,
      viewCount: 0,
      likeCount: 0,
      createdAt: today,
      modifiedAt: "2023-02-22T07:14:00",
      userNickname: "한대희",
      playlists:playlists,
      comments: {
        commentId: userId + 1,
        diaryId: userId,
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
  // const dbRef = ref(getDatabase());
return get(ref(db, `diarys`))
  .then((snapshot) => {
  if (snapshot.exists()) {
    // console.log(snapshot.val());
    return Object.values(snapshot.val())
  } else {
    console.log("No data available");
  }
})
// .then(data => console.log(data))
.catch((error) => {
  console.error(error);
});
}


export async function getUserData (uid:string):Promise<string[]|undefined> {
  return get(ref(db,`users/${uid}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      return Object.values(snapshot.val())
    } else {
      console.log("No data available");
    }
  })
}