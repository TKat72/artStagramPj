import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from "../../store/comments"


export default function DeleteComment({ id, setShowForm }) {
    const dispatch = useDispatch()




    const user_id = useSelector(state => state.session?.user?.id)

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(deleteComment(id))

    }

    return (
        <>
            <h2>Are you sure you want to Delete this comment </h2>
            <button onClick={onSubmit}>Yes</button>
            <button onClick={() => setShowForm(false)}>No</button>
        </>
    )

}
