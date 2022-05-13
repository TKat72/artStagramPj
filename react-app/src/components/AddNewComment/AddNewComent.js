import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


export default function AddNewComment(){
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false)
    const post = useSelector(state => state?.posts[post_id])
    const test = post?.description
    const [description, setDescription] = useState(test)
    const history = useHistory()
    useEffect(() => {
        dispatch(getOnePost(post_id))
    }, [dispatch])


}
