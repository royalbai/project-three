// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjLAIVPk_nRQPXOVfmlmPCa3XQmBcZ4gs",
    authDomain: "project-3-fitness-planner.firebaseapp.com",
    databaseURL: "https://project-3-fitness-planner-default-rtdb.firebaseio.com",
    projectId: "project-3-fitness-planner",
    storageBucket: "project-3-fitness-planner.appspot.com",
    messagingSenderId: "481498483128",
    appId: "1:481498483128:web:21fd8f03714ae38198a74d"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);

export default firebase;