import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateComment } from "../../store/comments"

export default function EditComment({ id, commentVal, setShowModal }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [comment, setComment] = useState(commentVal)
    const history = useHistory()
    console.log(" im in edit for comment ")
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateComment(comment, id))
            .then((res) => {

                if (!res?.ok) {
                    setErrors(res.errors)
                    console.log("hello", res.errors)
                } else {
                    setErrors([])
                    setShowModal(false)
                }
            })

    }

    return (
        <form onSubmit={onSubmit}>
            {errors?.length > 0 && errors?.map((error, indx) => (
                <div  className="errors"key={indx}>{error}</div>
            ))}
            <label>Your comment </label>
            <input type="text" onChange={(e) => setComment(e.target.value)} value={comment} ></input>
            <button>Submit</button>
            <button onClick={() => setShowModal(false)}>Cencel</button>
        </form>
    )
}
