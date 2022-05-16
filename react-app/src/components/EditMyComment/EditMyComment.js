import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateComment } from "../../store/comments"

export default function EditComment({ id, commentVal, setShowModal }) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState(commentVal)
    const history = useHistory()
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateComment(comment, id))
        setShowModal(false)
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Your comment </label>
            <input type="text" onChange={(e) => setComment(e.target.value)} value={comment} ></input>
            <button>Submit</button>
            <button onClick={() => setShowModal(false)}>Cencel</button>
        </form>
    )
}
