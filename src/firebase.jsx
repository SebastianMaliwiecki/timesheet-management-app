import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDkzTHFkg7A9B4U3hysURybtCab2wfIm3c",
    authDomain: "timesheet-management-820a7.firebaseapp.com",
    projectId: "timesheet-management-820a7",
    storageBucket: "timesheet-management-820a7.appspot.com",
    messagingSenderId: "516986374151",
    appId: "1:516986374151:web:6e1816416a6a991832c2a2",
    measurementId: "G-P8PB11CCTX"
})

export const auth = app.auth()
export default app