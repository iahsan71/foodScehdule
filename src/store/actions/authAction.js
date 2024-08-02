import firebase from "../../config/firebase"
import { db } from "../../config/firebase";

export const userSignup = (data, onComplete = () => { }) => () => {
  let { pass, ...newdata} = data;
  let newData = {
    ...newdata,
    created_at: firebase.firestore.Timestamp.now()
  };
  firebase.auth().createUserWithEmailAndPassword(data.email, data.pass)
    .then((data) => {
      console.log("User created:", data);
      return firebase.firestore().collection("users").doc(data.user.uid).set(newData);
    })
    .then(() => {
      console.log("User data saved to Firestore");
      onComplete();
    })
    .catch((error) => {
      console.error("Error creating user:", error);

      if (error.code === 'auth/email-already-in-use') {
        alert("Email is already in use");
      } else if (error.code === 'auth/weak-password') {
        alert("Password should be at least 6 characters");
      } else {
        alert("Other error:", error.message);
      }
    });
};

export const userLogin = (data, onComplete = () => { }) => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((data) => {
      firebase.firestore().collection("users").doc(data.user.uid).onSnapshot((i) => {
        dispatch({
          type: "USER_LOGIN",
          payload: {
            user: data.user.email,
            id: data.user.uid
          }
        })
      })
      onComplete()
    })
    .catch((error) => {
      console.error("Error creating user:", error);

      if (error.code === 'auth/internal-error') {
        alert("INVALID_LOGIN_CREDENTIALS");
      }
    });
}
export const logout = (onComplete = () => { }) => (dispatch) => {
  dispatch({
    type: "USER_LOGOUT",
  });
  localStorage.removeItem("auth");
  onComplete();
};


