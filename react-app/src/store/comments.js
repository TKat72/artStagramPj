const CREATE_COMMENT = 'comment/CREATE_POST';
const DELETE_COMMENT = 'comment/DELETE';
const UPDATE_COMMENT = 'comment/UPDATE';
const GET_ALL_COMMENT = 'comment/GET_All_COMMENT'
const GET_MY_COMMENT = 'comment/GET_MY_COMMENT'
const createComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment
})

const getAll = (comments) => ({
    type: GET_ALL_COMMENT,
    payload: comments
})
const getMy = (comments) => ({
    type: GET_MY_COMMENT,
    payload: comments
})
const editComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})
const removeComment = (id) => ({
    type: DELETE_COMMENT,
    payload: id
})

export const createNewComment = (comment, post_id) => async (dispatch) => {
    const res = await fetch(`/api/comments/create-comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, post_id })
    })
    if (res.ok) {
        const data = await res.json()

        dispatch(createComment(data))

    } else if (res.status < 500) {
        const data = await res.json();

        return data
    }
    return res;
}
export const updateComment = (comment, id) => async (dispatch) => {

    const res = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
    })
    if (res.ok) {
        const data = await res.json()

        dispatch(editComment(data))
    } else if (res.status < 500) {
        const data = await res.json();

        return data
    }
    return res;
}
export const deleteComment = (id) => async (dispatch) => {

    const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        const data = await res.json()

        dispatch(removeComment(id))
        return data
    }
}
export const getAllComments = (id) => async (dispatch) => {

    const res = await fetch(`/api/comments/${id}/all`)
    if (res.ok) {
        const data = await res.json()

        dispatch(getAll(data.comments))
    }
}
export const getMYComments = () => async (dispatch) => {

    const res = await fetch(`/api/comments/mycoments`)
    if (res.ok) {
        const data = await res.json()

        dispatch(getMy(data.comments))
    }
}

export default function commentReducer(state = {}, action) {
    let newState

    switch (action.type) {
        case GET_ALL_COMMENT:
            newState = { ...state }
            action.payload.map(comment => newState[comment.id] = comment)
            return newState
        case GET_MY_COMMENT:
            newState = { ...state }
            action.payload.map(comment => newState[comment.id] = comment)
            return newState
        case CREATE_COMMENT:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case UPDATE_COMMENT:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState[action.payload]
            return newState

        default:
            return state

    }
}
