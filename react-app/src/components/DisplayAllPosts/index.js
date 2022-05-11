import React, { useEffect, useState } from 'react'
import { getAllPosts, addPost } from "../../store/posts"
import { useDispatch, useSelector } from 'react-redux'


export default function DisplayPosts() {
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [photo_url, setPhotoUrl] = useState("")
    const [photo_url2, setPhotoUrl2] = useState("")
    const [photo_url3, setPhotoUrl3] = useState("")

    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))

    useEffect(() => {
        dispatch(getAllPosts())


    }, [dispatch])

    const onClick = (e) => {
        e.preventDefault()
        const post = {
            photo_url,
            photo_url2,
            photo_url3,
            description,
            user_id
        }
        dispatch(addPost(post))

    }
    return (
        <>
            <h1>Hello</h1>
            <form>
                <label>Photo url </label>
                <input onChange={(e) => setPhotoUrl(e.target.value)} value={photo_url} required></input>
                <label>Photo url </label>
                <input onChange={(e) => setPhotoUrl2(e.target.value)} value={photo_url2} ></input>
                <label>Photo url </label>
                <input onChange={(e) => setPhotoUrl3(e.target.value)} value={photo_url3} ></input>
                <label>Description </label>
                <input onChange={(e) => setDescription(e.target.value)} value={description} ></input>
                <button onClick={onClick}>Submit</button>
            </form>
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
