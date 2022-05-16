import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOnePost, updatePost, deletePost } from "../../store/posts"
import { getAllComments } from "../../store/comments"
import AddCommentModal from "../AddNewComment"
import AddNewComment from "../AddNewComment/AddNewComment"
import EditMyCommentModal from "../EditMyComment"
import DeleteCommentModal from "../DeleteComment"
import 'react-slideshow-image/dist/styles.css'


export default function PostInformation() {
    const { post_id } = useParams()
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false)
    const [showForm2, setShowForm2] = useState(false)
    const post = useSelector(state => state?.posts[post_id])
    const user_id = useSelector(state => state?.session?.user?.id)
    const comments = useSelector(state => Object.values(state?.comment))
    const postComments = comments.filter(comment => comment.post_id === parseInt(post_id))
    const test = post?.description
    const [description, setDescription] = useState(test)
    const history = useHistory()
    console.log("im here %%%%%%", comments)


    useEffect(() => {
        dispatch(getOnePost(post_id))
        dispatch(getAllComments(post_id))
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
                <div className="slide-container">

                    {post?.photos.map(photo => (
                        <div className="each-fade">
                            <img key={photo.id} src={photo.photo_url} style={{ height: "300px", width: "auto" }} />
                        </div>
                    ))}

                </div>
                <h4>{post?.description} </h4 >
                <div>
                    <AddCommentModal post_id={post?.id}></AddCommentModal>
                </div>
                {postComments.map(comment => (
                    <div>
                        <p>{comment.comment} </p>
                        {comment.user_id === user_id && (
                            <>
                                <EditMyCommentModal comment_id={comment.id} commentVal={comment.comment}></EditMyCommentModal>
                                <DeleteCommentModal id={comment.id}></DeleteCommentModal>
                            </>
                        )}
                    </div>
                ))}

            </div>

        </>

    )
}
