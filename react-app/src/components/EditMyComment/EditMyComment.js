import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateComment } from "../../store/comments"

export default function EditComment({ id, commentVal, setShowModal }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [comment, setComment] = useState(commentVal)
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateComment(comment, id))
            .then((res) => {

                if (!res?.ok) {
                    setErrors(res.errors)

                } else {
                    setErrors([])
                    setShowModal(false)
                }
            })

    }

    return (
        <form className="edit-form" onSubmit={onSubmit}>
            {errors?.length > 0 && errors?.map((error, indx) => (
                <div className="errors" key={indx}>{error}</div>
            ))}
            <label>Your comment </label>
            <textarea className="inputForAddPost" style={{ height: "4vw", margin: "5px", marginBottom: "40px" }} type="text" onChange={(e) => setComment(e.target.value)} value={comment} ></textarea>
            <button className="rnb submit">Submit</button>
            <button className="rnb" onClick={() => setShowModal(false)}>Cencel</button>
        </form>
    )
}
