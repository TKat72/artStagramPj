import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from "../../store/posts"
import "./addNewPost.css" 


export default function AddNewPost({ setShowModal }) {
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [photo_url, setPhotoUrl] = useState("")
    const [photo_url2, setPhotoUrl2] = useState("")
    const [photo_url3, setPhotoUrl3] = useState("")
    const user_id = useSelector(state => state.session?.user?.id)

    const onSubmit = (e) => {
        e.preventDefault()
        const post = {
            user_id,
            photo_url,
            description,
            photo_url2,
            photo_url3
        }
        dispatch(addPost(post))
        setShowModal(false)
    }


    return (
        <div>
            <h1>Hello</h1>
            <form onSubmit={onSubmit} className="form-add-post">
                <label>Photo url </label>
                <input onChange={(e) => setPhotoUrl(e.target.value)} value={photo_url} required></input>
                <label>Photo url </label>
                <input onChange={(e) => setPhotoUrl2(e.target.value)} value={photo_url2} ></input>
                <label>Photo url </label>
                <input onChange={(e) => setPhotoUrl3(e.target.value)} value={photo_url3} ></input>
                <label>Description </label>
                <input onChange={(e) => setDescription(e.target.value)} value={description} ></input>
                <button >Submit</button>
            </form>
        </div>
    )
}
