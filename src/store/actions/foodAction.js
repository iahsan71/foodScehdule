import { toast } from "react-toastify";
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
    toast.success("SuccessFully Added");  
  })   
  .catch((error) => {  
    toast.warning("Error in Adding food schedule: ", error);  
  });  
};  


export const editFoodSchedule = (id, updatedSchedule, onComplete = () => {}) => (dispatch) => {
  db.collection("food").doc(id).update(updatedSchedule).then(() => {
    dispatch({ 
      type: 'EDIT_FOOD_SCHEDULE', 
      payload: { id, updatedSchedule } 
    });  

    onComplete();
    toast.success("SuccessFully Updated");  
  }).catch((error) => {
    toast.warning("Error in Editing food schedule: ", error);  

  })
}

export const deleteFoodSchedule = (id, imageUrl,  onComplete = () => { }) => async (dispatch) => {
  try { 
    await firebase.firestore().collection('food').doc(id).delete();  
    await   firebase.storage().refFromURL(imageUrl).delete(); 

    dispatch({ 
      type: 'DELETE_FOOD_SCHEDULE', 
      payload: id 
    });  
    toast.success("SuccessFully Deleted");  
  } catch (error) {  
    toast.warning("Error in Deleting food schedule: ", error);  
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