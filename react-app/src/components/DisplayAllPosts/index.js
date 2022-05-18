import React, { useEffect, useState } from 'react'
import { getAllPosts, addPost } from "../../store/posts"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, } from "react-router-dom"
import { Fade } from 'react-slideshow-image'
import { Slide } from 'react-slideshow-image';
import PostInformationModal from "../PostInformation"
import 'react-slideshow-image/dist/styles.css'

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "./DisplayAllPosts.css"

export default function DisplayPosts() {
    const dispatch = useDispatch()

    const [users, setUsers] = useState([]);
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))


    useEffect(() => {
        dispatch(getAllPosts())


        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();

            setUsers(Object.values(responseData));
        }
        fetchData();

    }, [dispatch])




    // const onClick = (e) => {
    //     e.preventDefault()
    //     const post = {
    //         photo_url,
    //         photo_url2,
    //         photo_url3,
    //         description,
    //         user_id
    //     }

    //     dispatch(addPost(post))

    // }
    return (
        <div className="AllPosts">

            {posts?.map(post => (

                <div className="post-div" key={post.id}>
                    <NavLink to={`/posts/${post.id}`}>
                        <p className="intoFead">
                            <i class="fa-regular fa-image"></i><span id="Username">{post.username} </span> {post.description}
                        </p>
                    </NavLink>
                    <PostInformationModal username={post.username} description={post.description} id={post.id}></PostInformationModal>
                    {post.photos.length > 1 ? (
                        <div className="slide" >

                                {post?.photos.map(photo => (
                                    <>

                                        {post?.photo?.photo_url.includes("mp4") || photo.photo_url.includes("gif") || photo.photo_url.includes("3gp") || photo.photo_url.includes("mov") || photo.photo_url.includes("m4a") || photo.photo_url.includes("m4a") ? (

                                             <embed src={photo.photo_url} allowfullscreen="true" width="600" height="800"></embed>

                                        ) :

                                             <img style={{ height: "600px", maxWidth: "540px" }} src={photo?.photo_url} />

                                        }

                                    </>
                                ))}
                           
                        </div>
                    ) : <div >



                        {post?.photos.map(photo => (
                            <>
                                <div key={photo.id}  >
                                    {photo.photo_url.includes("mp4") || photo.photo_url.includes("gif") || photo.photo_url.includes("3gp") || photo.photo_url.includes("mov") || photo.photo_url.includes("m4a") || photo.photo_url.includes("m4a") ? (
                                        <div className="img-podt-dspl">
                                            <embed src={photo.photo_url} allowfullscreen="true" width="600" height="800" style={{ marginTop: "10px" }} ></embed>
                                        </div >
                                    ) :
                                        <div className="img-podt-dspl">
                                            <img style={{ height: "600px", maxWidth: "540px" }} src={photo?.photo_url} />
                                        </div>
                                    }
                                </div>
                            </>
                        ))}

                    </div>}
                    <div>
                        <p><span id="usernameComment">{post?.comments[0]?.username}</span>  {post?.comments[0]?.comment}</p>
                    </div>
                    <div id="commentBox">

                        <i class="fa-regular fa-face-smile" style={{ fontSize: "25px" }}></i><input type="text" id="commentInput" style={{ width: "460px", height: "25px" }} placeholder="Add a comment..."></input>
                        <span id="PostComent">Post </span>
                    </div>

                </div>
            ))


            }

        </div>
    )

}
