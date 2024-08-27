const initialData = {
    list : [],
    lastDocument:"",
    hasMoreDocument:true
}
const foodReducers = (state = initialData, action) => {
    switch(action.type){
        case  "GET_FOOD_DATA":
        return{
            ...state,
            list : action.payload.data,
            lastDocument:action.payload.lastDocument,
            hasMoreDocument :action.payload.hasMoreDocument,
        }
        case  "GET_FOOD_DATA_MORE":
            return{
                ...state,
                list :[...state.list ,...action.payload.data],
                lastDocument:action.payload.lastDocument,
                hasMoreDocument :action.payload.hasMoreDocument,
            }
        default :
        return state;
    }
}

export default foodReducers;