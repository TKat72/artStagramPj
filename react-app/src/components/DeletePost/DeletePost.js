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
        setShowModal(false)


    }

    return (
        <div className="delete-post" >
            <p className="delete-post-h2">Are you sure you want to <span className="delete-span">Delete</span> this Post </p>
            <div className="btn-div">
                <button className="rnb" onClick={onSubmit}>Yes</button>
                <button className="rnb" onClick={() => setShowModal(false)}>No</button>
            </div>
        </div >
    )

}
