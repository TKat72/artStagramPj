import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOnePost, updatePost, deletePost } from "../../store/posts"
import { getAllComments } from "../../store/comments"
import AddCommentModal from "../AddNewComment"
import EditPostModal from "../EditPost"
import EditMyCommentModal from "../EditMyComment"
import DeleteCommentModal from "../DeleteComment"
import DeletePostModal from "../DeletePost"
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import "./PostInfo.css"


export default function PostInformation({ id }) {

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
    console.log("im here %%%%%%", post?.id)


    useEffect(() => {
        dispatch(getOnePost(post_id))
        dispatch(getAllComments(post_id))
    }, [dispatch])


    return (
        <>

            <div className="postInfo">
                <div className="topPostBar">
                    {post?.user_id === user_id && (
                        < div className="edit-delte">
                            <EditPostModal id={post?.id} descriptionVal={post.description} />
                            <DeletePostModal id={post?.id}></DeletePostModal>
                        </div >
                    )}
                    <div className="slide-container" >
                       

                            {post?.photos.map(photo => (
                                <>
                                    <div className="each-slide">
                                        <div className="image-container">
                                            <img key={photo.id} src={photo.photo_url} style={{ height: "300px", width: "auto" }} />
                                        </div>
                                    </div>
                                </>
                            ))}

                    </div>


                </div>
                <div>
                    <p>{post?.username}</p>
                    <p className="div-for-desscription">{post?.description} </p >
                    <div>
                        <AddCommentModal post_id={post?.id}></AddCommentModal>
                    </div>
                    <div>
                        {postComments.map(comment => (
                            <div>
                                <p><span className='username'>{comment.username} </span>{comment.comment} </p>
                                {comment?.user_id === user_id && (
                                    <>
                                        <EditMyCommentModal comment_id={comment.id} commentVal={comment.comment}></EditMyCommentModal>
                                        <DeleteCommentModal id={comment.id}></DeleteCommentModal>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>

    )
}
