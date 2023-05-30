// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getDatabase } from "firebase/database";
import { getDatabase, ref, set } from "firebase/database";




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

function writeUserData(userId:string, email:any) {
  set(ref(db, `users/${userId}`), {
    // username: name,
    userEmail: email
    // profile_picture : imageUrl
  });
}

// 회원 가입 함수
export function  signUp (email:any, password:string) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    const user = userCredential.user;
    console.log(user.uid, user.email)
    writeUserData(user.uid, user.email )
  })
  .then((data) => {console.log(data)})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}



// const database = getDatabase(app);
// console.log('hello')