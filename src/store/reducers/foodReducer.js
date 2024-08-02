const initialData = {
    list : [],
}
const foodReducers = (state = initialData, action) => {
    switch(action.type){
        case  "GET_FOOD_DATA":
        return{
            ...state,
            list : action.payload
        }
        default :
        return state;
    }
}

export default foodReducers;