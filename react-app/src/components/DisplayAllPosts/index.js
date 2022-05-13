import React, { useEffect, useState } from 'react'
import { getAllPosts, addPost } from "../../store/posts"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import { Fade } from 'react-slideshow-image'

import 'react-slideshow-image/dist/styles.css'
import "./DisplayAllPosts.css"

export default function DisplayPosts() {
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [photo_url, setPhotoUrl] = useState("")
    const [photo_url2, setPhotoUrl2] = useState("")
    const [photo_url3, setPhotoUrl3] = useState("")
    const [users, setUsers] = useState([]);
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))


    useEffect(() => {
        dispatch(getAllPosts())

        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData);
        }
        fetchData();

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

                <div className="post-div" key={post.id}>
                    <NavLink to={`/posts/${post.id}`}>
                        <h2 key={`${post.id}2`}>
                            {post.description}
                        </h2>
                    </NavLink>
                    {post.photos.length > 1 ? (
                        <div className="slide-container">

                            <Fade>

                                {post?.photos.map(photo => (
                                    <>
                                        <div key={photo.id} className="each-fade" >
                                            <div className="image-container img-podt-dspl">
                                                <img style={{ height: "400px", width: "auto" }} src={photo?.photo_url} />
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </Fade>
                        </div>
                    ) : <div >



                        {post?.photos.map(photo => (
                            <>
                                <div key={photo.id}  >
                                    <div className="img-podt-dspl">
                                        <img style={{ height: "300px", width: "fit-content" }} src={photo?.photo_url} />
                                    </div>
                                </div>
                            </>
                        ))}

                    </div>}
                    <div>
                        {post.comments.map(comment => (
                            <div>
                                <h4>{comment.comment}</h4>
                            </div>
                        ))}
                    </div>

                </div>
            ))


            }

        </>
    )

}
