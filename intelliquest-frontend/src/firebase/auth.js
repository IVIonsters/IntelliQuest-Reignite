import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { auth } from "./firebase";

// create user with email and password
export const doCreateUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// sign in with email and password
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


// sign in with google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  //! result.user can use to save in firestore later
  return result;
};

// sign out
export const doSignOut = () => {
  return signOut(auth);
};

// reset password
export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// password change
export const doPasswordUpdate = (password) => {
  return updatePassword(auth.currentUser, password);
};