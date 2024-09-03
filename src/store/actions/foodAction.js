import firebase from "../../config/firebase";  
import { db, storage } from "../../config/firebase";  

export const addFoodSchedule = (updatedSchedule, onComplete = () => { }) => (dispatch) => {  
  const { image, ...Schedule } = updatedSchedule;
  const storageRef = storage.ref();  
  
  const imageRef = storageRef.child(`foodImages/${image.name}`); 

  imageRef.put(image).then((snapshot) => {  
    return snapshot.ref.getDownloadURL();  
  }).then((url) => {  
    const newData = {  
      ...Schedule,  
      imageUrl: url  
    };

    return db.collection("food").add(newData).then((doc) => {  
      dispatch({   
        type: 'ADD_FOOD_SCHEDULE',   
        payload: { id: doc.id, ...newData }   
      });  
    });  
  })  
  .then(() => {  
    onComplete();  
  })   
  .catch((error) => {  
    console.error("Error uploading image or adding food schedule: ", error);  
  });  
};  

export const deleteImage = (imageUrl) => (dispatch) => {
  // console.log()
  firebase.storage().refFromURL(imageUrl).delete();
};

export const editFoodSchedule = (id, updatedSchedule, onComplete = () => {}) => (dispatch) => {
  db.collection("food").doc(id).update(updatedSchedule).then(() => {
    onComplete()
  })
}

export const deleteFoodSchedule = (id, onComplete = () => { }) => async (dispatch) => {
  try {  
    await firebase.firestore().collection('food').doc(id).delete();  
    dispatch({ 
      type: 'DELETE_FOOD_SCHEDULE', 
      payload: id 
    });  
    console.log(id)
  } catch (error) {  
    console.error("Error deleting:", error);  
  }    
  onComplete()
};
export const getFoodData = (uid, lastDocument ) => async (dispatch) => {
  console.log(lastDocument)
  // console.log(uid)
let quary=  firebase.firestore().collection("food").where("uid", "==", uid).orderBy("createdAt", "desc");
if(lastDocument!==""){
  quary = quary.startAfter(lastDocument);
}
quary.limit(4).get().then((query) => {
    let tempData = []
    query.forEach((i) => {
      tempData.push({ ...i.data(), id: i.id })
    })
    console.log(tempData)
    dispatch({
      type: lastDocument !=="" ? "GET_FOOD_DATA_MORE"  :"GET_FOOD_DATA",
      payload: {data:tempData, lastDocument:query.docs[tempData.length -1],hasMoreDocument:tempData.length >= 4}
    })
  })

}