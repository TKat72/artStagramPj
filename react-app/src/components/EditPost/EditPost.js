import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updatePost } from "../../store/posts"

export default function EditComment({ id, descriptionVal, setShowModal }) {
    const dispatch = useDispatch()
    const [description, setDescription] = useState(descriptionVal)
    const history = useHistory()
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePost(description, id))
        setShowModal(false)
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Your Description </label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} ></input>
            <button>Submit</button>
            <button onClick={() => setShowModal(false)}>Cencel</button>
        </form>
    )
}
