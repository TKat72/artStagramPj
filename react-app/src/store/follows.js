const GET_ALL_FOLLOWS = 'session/GET_ALL_FOLLOWS'
const UNFOLLW = 'session/UNFOLLW'
const FOLLOW = 'session/FOLLOW'

const getFallows = (fallows) => ({
    type: GET_ALL_FOLLOWS,
    payload: fallows
})
const unfollw = (id) => ({
    type: UNFOLLW,
    payload: id
})

const follow = (fallow) => ({
    type: FOLLOW,
    payload: fallow
})


export const getAllFollows = () => async (dispatch) => {

    const res = await fetch("/api/users/get_follows")
    if (res.ok) {
        const data = await res.json()

        if (data.errors) {
            return;
        }

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
export const followUser = (id) => async (dispatch) => {

    const res = await fetch(`/api/users/follow/${id}`)
    if (res.ok) {
        const user = await res.json()
        if (user.errors) {
            return;
        }

        dispatch(follow(user.user))
    }
}
export default function followsReducer(state = {}, action) {
    let newState;

    switch (action.type) {
        case GET_ALL_FOLLOWS:
            newState = { ...state }
         
            action.payload.map(follow => newState[follow.id] = follow)
            return newState
        case UNFOLLW:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        case FOLLOW:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state
    }
}
