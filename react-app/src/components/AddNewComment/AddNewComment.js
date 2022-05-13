import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewComment } from "../../store/comments"


export default function AddNewComment({ post_id, }) {
    const dispatch = useDispatch()

    const [comment, setComment] = useState("")


    const user_id = useSelector(state => state.session?.user?.id)

    const onSubmit = (e) => {
        e.preventDefault()
        const newComment = { post_id, comment }
        dispatch(createNewComment(newComment))

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
