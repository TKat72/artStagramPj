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
    const [errors, setErrors] = useState([])
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
            .then((res) => {
                if (!res?.ok) {
                    setErrors(res?.errors)
                } else {
                    setErrors([])
                    setShowModal(false)
                }
            })

    }


    return (
        <div>
            <form onSubmit={onSubmit} className="form-add-post">
                {errors?.length > 0 && errors?.map((error, ind) => (
                    <div  className="errors" key={ind}>{error}</div>
                ))}

                <input className="inputForAddPost" placeholder="Photo" onChange={(e) => setPhotoUrl(e.target.value)} value={photo_url}></input>

                <input className="inputForAddPost" placeholder="Photo 2" onChange={(e) => setPhotoUrl2(e.target.value)} value={photo_url2} ></input>

                <input className="inputForAddPost" placeholder="Photo 3" onChange={(e) => setPhotoUrl3(e.target.value)} value={photo_url3} ></input>

                <input className="inputForAddPost" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} ></input>
                <button id='add-post-btn' >Submit</button>
            </form>
        </div>
    )
}
