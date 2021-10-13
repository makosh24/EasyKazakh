import * as stackActionTypes from './stackActions';

const initialState = {
    selectedStack: ''
}

const stackReducer = (state = initialState, action) => {
    switch (action.type) {
        case stackActionTypes.SET_SELECTED_STACK:
            return {
                ...state,
                selectedStack: action.payload.selectedStack
            }
        default:
            return state
    }
}

export default stackReducer;