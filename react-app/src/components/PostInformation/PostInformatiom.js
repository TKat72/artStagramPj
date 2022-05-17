import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOnePost, updatePost, deletePost, addOnePhotoToPost } from "../../store/posts"
import { getAllComments } from "../../store/comments"
import AddCommentModal from "../AddNewComment"
import EditPostModal from "../EditPost"
import EditMyCommentModal from "../EditMyComment"
import DeleteCommentModal from "../DeleteComment"
import DeletePostModal from "../DeletePost"
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import "./PostInfo.css"


export default function PostInformation({ id }) {

    const { post_id } = useParams()
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false)
    const [showForm2, setShowForm2] = useState(false)
    const post = useSelector(state => state?.posts[id])
    const user_id = useSelector(state => state?.session?.user?.id)
    const comments = useSelector(state => Object.values(state?.comment))
    const postComments = comments.filter(comment => comment.post_id === parseInt(id))
    const test = post?.description
    const [description, setDescription] = useState(test)
    const history = useHistory()
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false);



    useEffect(() => {
        dispatch(getOnePost(id))
        dispatch(getAllComments(id))
    }, [dispatch])
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        setImageLoading(true)
        dispatch(addOnePhotoToPost(id, formData))
            .then((res) => {
                if (!res?.ok) {
                    console.log("somthing wen wron")

                } else {
                    setImageLoading(false)
                    setImage(null)

                }
            })
        setImage(null)

        // const res = await fetch(`/api/posts/${post_id}/add-photo`, {
        //     method: 'POST',
        //     body: formData
        // })
        // if (res.ok) {
        //     await res.json()
        //     setImageLoading(false)
        // } else {
        //     setImageLoading(false)
        //     console.log("somthing went wron ")
        // }

    }
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (


        <div className="postInfo" >
            <div className="topPostBar">
                {post?.user_id === user_id && (
                    < div className="edit-delte">
                        <EditPostModal id={post?.id} descriptionVal={post.description} />
                        <DeletePostModal id={post?.id}></DeletePostModal>
                    </div >
                )}
                <div >
                    <form onSubmit={onSubmit}>
                        <input type="file" onChange={updateImage} ></input>
                        <button type="submit">Add</button>
                        {imageLoading && (<p>Loading... please wait...</p>)}
                    </form>


                    <div>

                        <><Swiper
                           spaceBetween={50}
      slidesPerView={3}
      centeredSlides
      onSlideChange={() => console.log("slide change")}
      onSwiper={swiper => console.log(swiper)}>
                            {post?.photos?.map(photo => (
                                <>

                                    <div className="each-slide" key={photo.id}>
                                        <div className="image-container">
                                            {photo.photo_url.includes("mp4") || photo.photo_url.includes("gif") || photo.photo_url.includes("3gp") || photo.photo_url.includes("mov") || photo.photo_url.includes("m4a") || photo.photo_url.includes("m4a") ? (
                                                <>
                                                    <SwiperSlide>  <embed src={photo.photo_url} allowfullscreen="true" width="400" height="700"></embed></SwiperSlide>
                                                </>
                                            )
                                                :
                                                <>
                                                    <SwiperSlide> <img key={photo.id} src={photo.photo_url} style={{ height: "300px", width: "auto" }} /> </SwiperSlide>
                                                </>
                                            }

                                        </div>
                                    </div>
                                </>
                            ))}
                        </Swiper> </>
                    </div>
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
                        <div key={comment.id}>
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



    )
}
