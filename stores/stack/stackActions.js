export const SET_SELECTED_STACK = 'SET_SELECTED_STACK'

export const setSelectedStackSuccess = (selectedStack) => ({
    type: SET_SELECTED_STACK,
    payload: { selectedStack }
})

export function setSelectedStack(selectedStack) {
    return dispatch => {
        dispatch(setSelectedStackSuccess(selectedStack))
    }
}