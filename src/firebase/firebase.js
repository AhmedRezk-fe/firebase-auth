import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtbHlMSAYCbAKiNZ6GSb9IoqQwUkPAFgE",
  authDomain: "fir-auth-application-4c7e5.firebaseapp.com",
  projectId: "fir-auth-application-4c7e5",
  storageBucket: "fir-auth-application-4c7e5.appspot.com",
  messagingSenderId: "392404280647",
  appId: "1:392404280647:web:e83a3edbdd63784ea69862",
  measurementId: "G-4EKHML5HW9",
};

firebase.initializeApp(firebaseConfig);


export const generateUserDocument  = async (user, additionalData) => {
  if (!user) return;

  const userRef =  firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName ,email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName ,
        email,
        createdAt,
        photoURL,
        ...additionalData
      });
    } catch (error){
      console.error("Error creating user document", error);
    }
  }
  return user;
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export default firebase;
