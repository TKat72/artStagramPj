import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePost } from "../../store/posts"


export default function PostInformation() {
    const { post_id } = useParams()
    const dispatch = useDispatch()
    const post = useSelector(state => state?.posts[post_id])
    
    useEffect(() => {
        dispatch(getOnePost(post_id))
    }, [dispatch])
    return (
        <div>Hello there im here </div>
    )
}
