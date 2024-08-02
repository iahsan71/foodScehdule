import firebase from "../../config/firebase"
import { db } from "../../config/firebase";

export const addFoodSchedule = (updatedSchedule, onComplete = () => { }) => (dispatch) => {
  db.collection("food").add(updatedSchedule)
    .then(() => {
      onComplete()
    })
};

export const editFoodSchedule = (id, updatedSchedule, onComplete = () => {}) => (dispatch) => {
  db.collection("food").doc(id).update(updatedSchedule).then(() => {
    onComplete()
  })
}

export const deleteFoodSchedule = (id, onComplete = () => { }) => (dispatch) => {
  firebase.firestore().collection('food').doc(id).delete();
  onComplete()
};
export const getFoodData = (uid) => (dispatch) => {
  firebase.firestore().collection("food").where("uid", "==", uid).onSnapshot((query) => {
    let tempData = []
    query.forEach((i) => {
      tempData.push({ ...i.data(), id: i.id })
    })
    dispatch({
      type: "GET_FOOD_DATA",
      payload: tempData
    })
  })

}