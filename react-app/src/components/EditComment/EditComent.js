import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from "../../store/comments"


export default function EditComment({ id, comentVal }) {
    const dispatch = useDispatch()

    const [comment, setComment] = useState(comentVal)


    const user_id = useSelector(state => state.session?.user?.id)

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(updateComment(comment, id))

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={(e) => setComment(e.target.value)} value={comment}></input>
                <button>Submit</button>
            </form>
        </>
    )

}
