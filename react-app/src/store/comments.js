const CREATE_COMMENT = 'comment/CREATE_POST';
const DELETE_COMMENT = 'comment/DELETE';
const UPDATE_COMMENT = 'comment/UPDATE';
const GET_ONE_COMMENT = 'comment/GET_ONE_COMMENT'

const createCommwnt = (comment) = ({
    type: CREATE_COMMENT,
    payload: comment
})

const getOne = (comment) => ({
    type: GET_ONE_COMMENT,
    payload: comment
})
const editComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})
const removeComment = (id) => ({
    type: DELETE_COMMENT,
    payload: id
})

export const createNewComment = (comment) => async (dispatch) => {
    const res = await fetch(`/api/posts/create-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const data = await res.json()

        dispatch(createCommwnt(data))
    }
}
export const updatePost = (comment, id) => async (dispatch) => {

    const res = await fetch(`/api/posts/${id}/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
    })
    if (res.ok) {
        const data = await res.json()
        console.log("data======>", data)
        dispatch(editComment(data))
    }
}
export const deletePost = (id) => async (dispatch) => {

    const res = await fetch(`/api/posts/${id}/delete`, {
        method: 'DELETE',
    })
    if (res.ok) {
        const data = await res.json()

        dispatch(removeComment(id))
    }
}

export default function commentReducer(state = {}, action) {
    let newState

    switch (action.type) {
        case CREATE_COMMENT:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case UPDATE_COMMENT:
            newState = { ...state }
            newState = { [action.payload.id]: action.payload }
            return newState
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState[action.payload]
            return newState

        default:
            return state

    }
}
