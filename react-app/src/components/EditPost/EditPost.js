import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from "../../store/posts"

export default function EditPost({ id, descriptionVal, setShowModal }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [description, setDescription] = useState(descriptionVal)
    console.log("id ------------", id)
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePost(description, id))
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
        <form onSubmit={onSubmit}>
            {errors?.length > 0 && errors?.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}
            <label>Your Description </label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} ></input>
            <button>Submit</button>
            <button onClick={() => setShowModal(false)}>Cencel</button>
        </form>
    )
}
