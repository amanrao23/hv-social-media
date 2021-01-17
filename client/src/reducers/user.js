import { GET_USERS,SEND_FRIEND_REQUEST,ACCEPT_FRIEND_REQUEST,ERROR_REQUEST,GET_SENT_REQUEST,GET_FRIENDS,GET_POTENTIAL_FRIENDS} from "../actions/types"


const initialState={
    friends:[],
    users:[],
    friendRequest:[],
    loading:true,
    sentRequest:[],
    error:{}
}

export default function(state=initialState,action){
    const {type,payload}=action
    
    switch(type){
        case GET_USERS:
            return {
                ...state,
                users:payload,
                loading:false
            }
            
            case GET_FRIENDS:
            return {
                ...state,
                friends:payload,
                loading:false
            }
            
            case GET_POTENTIAL_FRIENDS:
            return {
                ...state,
                users:payload,
                loading:false
            }
        
            case GET_SENT_REQUEST:
                return {
                    ...state,
                    loading:false
                }
            
        case SEND_FRIEND_REQUEST:
            return {
                ...state,
                users:[state.users.filter(potentialFriend=>potentialFriend._id!==payload)],
                sentRequest:[payload,...state.sentRequest],
                loading:false
            }
            
        case ERROR_REQUEST:
            return {
                ...state,
                error:payload,
                loading:false
            }
            
        default:
             return state
            
    }
}