import React, { useEffect } from 'react'
import { getAllPosts } from "../../store/posts"
import { useDispatch, useSelector } from 'react-redux'


export default function DisplayPosts() {
    const dispatch = useDispatch()
    const posts = useSelector(state => Object.values(state?.posts))
    console.log("======================>>>>>>>>>>>", posts)
    useEffect(() => {
        dispatch(getAllPosts())


    }, [dispatch])
    return (
        <>
            <h1>Hello</h1>

            {posts?.map(post => (
                <div key={post.id}>
                    <h2 key={`${post.id}2`}>{post.description}</h2>
                    {post?.photos.map(photo => (
                        <>
                            <img key={photo.id} src={photo?.photo_url} />
                        </>
                    ))}

                </div>
            ))
            }
        </>
    )

}
