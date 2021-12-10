import {SAVE_TOKEN} from '../actions/token'

const initialState = {
    token: ''
}

export default (state = initialState,action) =>{
    switch (action.type){
        case SAVE_TOKEN:
            return{
                token: action.token
            }
    }
    return state;
}