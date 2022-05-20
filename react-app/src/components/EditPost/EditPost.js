import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from "../../store/posts"
import "./EditForm.css"
export default function EditPost({ id, descriptionVal, setShowModal }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [description, setDescription] = useState(descriptionVal)

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePost(description, id))
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
            {errors?.length > 0 && errors?.map((error, ind) => (
                <div className="errors" key={ind}>{error}</div>
            ))}
            <label>Your Description </label>
            <input style={{ height: "4vw", margin: "5px", marginBottom: "40px" }} type="text" onChange={(e) => setDescription(e.target.value)} value={description} ></input>
            <button className="rnb submit">Submit</button>
            <button className="rnb" onClick={() => setShowModal(false)}>Cencel</button>
        </form>
    )
}
