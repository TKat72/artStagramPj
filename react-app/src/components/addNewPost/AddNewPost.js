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
    const [photo_name, setPhotoName] = useState("")
    const [photo_name2, setPhotoName2] = useState("")
    const [photo_name3, setPhotoName3] = useState("")
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
        const name = e.target.files[0]?.name
        setPhotoName(name)

        setImage(file);
    }
    const updateImage2 = (e) => {
        const file = e.target.files[0];

        const name = e.target.files[0]?.name
        setPhotoName2(name)

        setPhotoUrl2(file);

    }
    const updateImage3 = (e) => {
        const file = e.target.files[0];
        const name = e.target.files[0]?.name
        setPhotoName3(name)
        setPhotoUrl3(file);
    }


    return (
        <div>
            <form onSubmit={onSubmit} className="form-add-post">
                {errors?.length > 0 && errors?.map((error, ind) => (
                    <div className="errors" key={ind}>{error}</div>
                ))}
                <label class="label">
                    <input type="file" onChange={updateImage} style={{ display: 'none' }} />
                    <span>{!photo_name ? (<>Select a file</>) : <>Choosen File: {photo_name} </>}</span>
                </label>
                <label class="label">
                    <input type="file" onChange={updateImage2} style={{ display: 'none' }}  ></input>
                    {/* <span>Select a file {photo_name && (<> {photo_name}</> )}</span> */}
                    <span>{!photo_name2 ? (<>Select a file</>) : <>Choosen File: {photo_name2} </>}</span>
                </label>
                <label class="label">
                    <input type="file" onChange={updateImage3} style={{ display: 'none' }} />
                    <span>{!photo_name3 ? (<>Select a file</>) : <>Choosen File: {photo_name3} </>}</span>
                </label>

                {/* <input className="inputForAddPost fileInput" type="file" onChange={updateImage} ></input>


                <input className="inputForAddPost fileInput" type="file" onChange={updateImage2} ></input>

                <input className="inputForAddPost fileInput" type="file" onChange={updateImage3}  ></input> */}

                {/* <input type="text" className="inputForAddPost" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} ></input> */}
                <textarea className="inputForAddPost" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                {imageLoading && (<p style={{ display: 'flex', justifyContent: 'center' }}>Loading... please wait...</p>)}
                <button className="rnb" id='add-post-btn' >Submit</button>
            </form>
        </div>
    )
}
