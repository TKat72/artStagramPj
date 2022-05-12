import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOnePost, updatePost, deletePost } from "../../store/posts"


export default function PostInformation() {
    const { post_id } = useParams()
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false)
    const post = useSelector(state => state?.posts[post_id])
    const test = post?.description
    const [description, setDescription] = useState(test)
    const history = useHistory()
    useEffect(() => {
        dispatch(getOnePost(post_id))
    }, [dispatch])


    return (
        <>
            <button onClick={() => setShowForm(true)} >Edit</button>
            {showForm ? (
                <>
                    <label>Description</label>
                    <input onChange={(e) => setDescription(e.target.value)} value={description}></input>
                    <button onClick={(e) => { dispatch(updatePost(description, post_id)); setShowForm(false) }}> submit</button>
                    <button onClick={() => setShowForm(false)}>Cencel</button>
                </>
            ) : null}
            <button onClick={() => { dispatch(deletePost(post_id)); history.push('/posts') }} >Delete</button>
            <div>
                {post?.photos.map(photo => (
                    <>
                        <img key={photo.id} src={photo.photo_url} />
                    </>
                ))}
                <h4>{post?.description} </h4 >
                <h3>Comments </h3>
                {post?.comments.map(comment => (
                    <>
                        <p>{comment.comment}</p>
                    </>
                ))}
            </div>

        </>

    )
}
