const GET_ALL_FOLLOWS = 'session/GET_ALL_FOLLOWS'
const UNFOLLW = 'session/UNFOLLW'

const getFallows = (fallows) => ({
    type: GET_ALL_FOLLOWS,
    payload: fallows
})
const unfollw = (id) => ({
    type: UNFOLLW,
    payload: id
})


export const getAllFollows = () => async (dispatch) => {
    console.log(" in fetch +++++++++++++")
    const res = await fetch("/api/users/get_follows")
    if (res.ok) {
        const data = await res.json()
        console.log("++++@@@@@@@ data ", data)
        if (data.errors) {
            return;
        }
        console.log("after fetch ", Object.values(data))
        dispatch(getFallows(Object.values(data)))
    }
}

export const unfollwUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/follow/${id}`, { method: 'DELETE' })
    if (res.ok) {
        const unfUser = await res.json()
        if (unfUser.errors) {
            return;
        }
        dispatch(unfollw(id))
    }
}
export default function followsReducer(state = {}, action) {
    let newState;
    console.log("'''''''''''im here")
    switch (action.type) {
        case GET_ALL_FOLLOWS:
            newState = { ...state }
            console.log("in get all post action", newState.payload)
            action.payload.map(follow => newState[follow.id] = follow)
            return newState
        case UNFOLLW:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}
