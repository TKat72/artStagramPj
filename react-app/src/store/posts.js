const GET_ALL_POSTS = "posts/GET_ALL_POSTS"

const getAll = posts => ({
    type: "GET_ALL_POSTS",
    payload: posts
})


export const getAllPosts = () => async (dispatch) => {
    const res = await fetch("/api/posts/all")
    if (res.ok) {
        const data = await res.json()
        dispatch(getAll(posts))
    }

}


export default function postReducer(state = {}, action) {
    let newState

    switch (action.type) {
        case "GET_ALL_POSTS":
            newState = { ...state }
            action.payload.map(post => newState[post.id] = post)
            return newState
        default:
            return state

    }
}
