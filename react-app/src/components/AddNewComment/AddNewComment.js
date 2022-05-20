import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewComment } from "../../store/comments"


export default function AddNewComment({ post_id, setShowModal }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [comment, setComment] = useState("")


    const user_id = useSelector(state => state.session?.user?.id)

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createNewComment(comment, post_id))
            .then((res) => {
                if (!res?.ok) {
                    setErrors(res?.errors)

                } else {
                    setErrors([])
                    setShowModal(false)
                }
            })

    }

    return (
        <>
            <form className="edit-form" onSubmit={onSubmit}>
                {errors?.length > 0 && errors?.map((error, ind) => (
                    <div className="errors" key={ind}>{error}</div>
                ))}
                <label>Your comment </label>
                <input style={{ height: "4vw", margin: "5px", marginBottom: "40px" }} onChange={(e) => setComment(e.target.value)} value={comment}></input>
                <button className="rnb submit">Submit</button>
                <button className="rnb" onClick={(e) => setShowModal(false)}> Cencel</button>
            </form>
        </>
    )

}
