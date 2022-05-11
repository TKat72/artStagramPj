const GET_ALL_POSTS = "posts/GET_ALL_POSTS"
const GET_ONE_POST = "posts/GET_ONE_POST"


const getAll = posts => ({
    type: GET_ALL_POSTS,
    payload: posts
})
const getOne = (post) => ({
    type: GET_ONE_POST,
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
        console.log(" im in fetch for get One=======>>>", data)
        dispatch(getOne(data))
    }
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
        default:
            return state

    }
}