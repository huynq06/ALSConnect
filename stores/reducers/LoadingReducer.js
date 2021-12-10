import * as types from '../actions/actionTypes';
const initialState = { activeLoadings: {}, loading: false };


export default (state = initialState, action) => {
    switch (action.type) {
        case  types.START_LOADING:
            const { key, opacity } = action.payload;
            return{
                ...state,
                actives: { ...state.activeLoadings, [key]: action },
                loading: true,
                opacity,
            }
        case types.STOP_LOADING:
            delete state.activeLoadings[action.payload.key];
           return {
               ...state,
               loading:!!Object.keys(state.activeLoadings).length
           }

            case types.CLEAR_LOADING:
                return   initialState;
        }
    
    return state;
  };
  