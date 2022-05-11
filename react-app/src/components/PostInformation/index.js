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
        <>
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
