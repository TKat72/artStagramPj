import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePost } from "../../store/posts"
import "./DeletePost.css"

export default function DeletePost({ id, setShowModal }) {
    const dispatch = useDispatch()
    const history = useHistory()



    const user_id = useSelector(state => state.session?.user?.id)

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(deletePost(id))
        history.push("/")
        setShowModal(false)

    }

    return (
        <div className="delete-post" >
            <h2>Are you sure you want to Delete this Post </h2>
            <div className="btn-div">
                <button className="rnb" onClick={onSubmit}>Yes</button>
                <button className="rnb" onClick={() => setShowModal(false)}>No</button>
            </div>
        </div >
    )

}
