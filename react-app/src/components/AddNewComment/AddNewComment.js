import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewComment } from "../../store/comments"


export default function AddNewComment({ post_id, setShowModal }) {
    const dispatch = useDispatch()

    const [comment, setComment] = useState("")


    const user_id = useSelector(state => state.session?.user?.id)
    console.log(post_id)
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createNewComment(comment, post_id))
        setShowModal(false)

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label>Your comment </label>
                <input onChange={(e) => setComment(e.target.value)} value={comment}></input>
                <button>Submit</button>
            </form>
        </>
    )

}
