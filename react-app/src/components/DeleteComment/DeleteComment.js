import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from "../../store/comments"


export default function DeleteComment({ id, setShowModal }) {
    const dispatch = useDispatch()




    const user_id = useSelector(state => state.session?.user?.id)

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(deleteComment(id))
        setShowModal(false)

    }

    return (
        <div className="delete-post">
            <h2>Are you sure you want to Delete this comment </h2>
            <div className="btn-div">
                <button className="rnb" onClick={onSubmit}>Yes</button>
                <button className="rnb" onClick={() => setShowModal(false)}>No</button>
            </div>
        </div >
    )

}
