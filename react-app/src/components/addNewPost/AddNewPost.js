import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from "../../store/posts"
import "./addNewPost.css"


export default function AddNewPost({ setShowModal }) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const [photo_url2, setPhotoUrl2] = useState(null)
    const [photo_url3, setPhotoUrl3] = useState(null)
    const [errors, setErrors] = useState([])
    const [imageLoading, setImageLoading] = useState(false);
    const user_id = useSelector(state => state.session?.user?.id)


    const onSubmit = (e) => {
        e.preventDefault()
        const post = {
            user_id,
            image,
            description,
            photo_url2,
            photo_url3
        }
        setImageLoading(true)
        dispatch(addPost(post))
            .then((res) => {
                if (!res?.ok) {
                    console.log(res?.errors)
                    setImageLoading(false)
                    setErrors(res?.errors)
                } else {
                    setErrors([])
                    setImageLoading(false)
                    setShowModal(false)

                }
            })

    }
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    const updateImage2 = (e) => {
        const file = e.target.files[0];
        setPhotoUrl2(file);
    }
    const updateImage3 = (e) => {
        const file = e.target.files[0];
        setPhotoUrl3(file);
    }


    return (
        <div>
            <form onSubmit={onSubmit} className="form-add-post">
                {errors?.length > 0 && errors?.map((error, ind) => (
                    <div className="errors" key={ind}>{error}</div>
                ))}

                <input className="inputForAddPost" type="file" onChange={updateImage} ></input>


                <input className="inputForAddPost" type="file" onChange={updateImage2} ></input>

                <input className="inputForAddPost" type="file" placeholder="Photo 3" onChange={updateImage3}  ></input>

                <input className="inputForAddPost" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} ></input>
                {imageLoading && (<p>Loading... please wait...</p>)}
                <button className="rnb" id='add-post-btn' >Submit</button>
            </form>
        </div>
    )
}
