const GET_ALL_POSTS = "posts/GET_ALL_POSTS"
const GET_ONE_POST = "posts/GET_ONE_POST"
const POST_POST = "posts/POST_POST"
const UPDATE_POST = "posts/UPDATE_POST"
const DELETE_POST = "posts/DELE"
const ADD_PHOTO_TO_POST = "posts/ADD_PHOTO_TO_POST"
const getAll = posts => ({
    type: GET_ALL_POSTS,
    payload: posts
})
const getOne = (post) => ({
    type: GET_ONE_POST,
    payload: post
})

const createPost = (post) => ({
    type: POST_POST,
    payload: post
})
const editPost = (post) => ({
    type: UPDATE_POST,
    payload: post
})
const removePost = (id) => ({
    type: DELETE_POST,
    payload: id
})
const addPhoto = (post) => ({
    type: ADD_PHOTO_TO_POST,
    payload: post
})

export const getAllPosts = () => async (dispatch) => {
    const res = await fetch("/api/posts/all")
    if (res.ok) {
        const data = await res.json()

        dispatch(getAll(data.posts))
    }

}
export const getOnePost = (id) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}`)
    if (res.ok) {
        const data = await res.json()

        dispatch(getOne(data))
    }
}

export const addPost = (post) => async (dispatch) => {
    const { user_id, image, description, photo_url2, photo_url3 } = post
    const formData = new FormData()
    formData.append('user_id', user_id)
    formData.append('description', description)
    formData.append('photo_url2', photo_url2)
    formData.append('photo_url3', photo_url3)
    if (image) formData.append('image', image)
    const res = await fetch(`/api/posts/create-post`, {
        method: 'POST',
        body: formData
    })
    if (res.ok) {
        const data = await res.json()

        dispatch(createPost(data))

    } else if (res.status < 500) {
        const data = await res.json();

        return data
    }
    return res;
}
export const updatePost = (description, id) => async (dispatch) => {

    const res = await fetch(`/api/posts/${id}/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
    })
    if (res.ok) {
        const data = await res.json()

        dispatch(editPost(data))
    } else if (res.status < 500) {
        const data = await res.json();

        return data
    }
    return res
}
export const deletePost = (id) => async (dispatch) => {

    const res = await fetch(`/api/posts/${id}/delete`, {
        method: 'DELETE',
    })
    if (res.ok) {
        const data = await res.json()

        dispatch(removePost(id))
    }
}
export const addOnePhotoToPost = (id, formData) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}/add-photo`, {
        method: 'POST',
        body: formData
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addPhoto(data))

    } else if (res.status < 500) {
        const data = await res.json();

        return data
    }
    return res

}

export default function postReducer(state = {}, action) {
    let newState

    switch (action.type) {
        case GET_ALL_POSTS:
            newState = { ...state }
            action.payload.map(post => newState[post.id] = post)
            return newState
        case GET_ONE_POST:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case POST_POST:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case UPDATE_POST:
            newState = { ...state }
            newState = { [action.payload.id]: action.payload }
            return newState
        case ADD_PHOTO_TO_POST:
            newState = { ...state }
            newState = { [action.payload.id]: action.payload }
            return newState

        case DELETE_POST:
            newState = { ...state }
            delete newState[action.payload]
            return newState

        default:
            return state

    }
}
