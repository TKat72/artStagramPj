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
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./PostInfo.css"


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function PostInformation({ id }) {
    const ref = React.useRef();
    const { post_id } = useParams()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
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
    const [value, setValue] = React.useState(0);
    const [photo_name, setPhotoName] = useState("")
    const [success, setSuccess] = useState("")
    const [lodingMsg, setLodingMsg] = useState("")
    const handleChange1 = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        dispatch(getOnePost(id))
        dispatch(getAllComments(id))
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        if (photo_name.length > 0) setImageLoading(true)

        dispatch(addOnePhotoToPost(id, formData))
            .then((res) => {
                if (!res?.ok) {


                    setImageLoading(false)
                    setSuccess("")
                    setErrors(res?.errors)

                } else if (res?.ok) {
                    ref.current.value = ""
                    setPhotoName("")
                    setSuccess(" Uploded ")
                    setImageLoading(false)

                }
                else {
                    setErrors([])
                    setPhotoName("")
                    setImageLoading(false)


                }
                if (res.status < 500) {
                    setImageLoading(false)
                }
                if (res.status === 500) {
                    setImageLoading(false)
                }
            })
        setPhotoName("")
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
        //
        // }

    }
    const updateImage = (e) => {
        const file = e.target.files[0];
        const name = e.target.files[0]?.name
        setPhotoName(name)
        setImage(file);
    }
    const onClick = () => {

        if (photo_name.length < 1) {

            setImageLoading(false)
        }

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



                    <div>
                        <>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange1} aria-label="basic tabs example">
                                    {post.photos.map((photo, idx) => (
                                        <Tab key={idx} label={idx + 1} {...a11yProps(idx)} />
                                    ))}

                                </Tabs>
                            </Box>
                            {post?.photos?.map((photo, index) => (
                                <>

                                    <div className="each-slide" key={photo.id}>

                                        {photo.photo_url.includes("mp4") || photo.photo_url.includes("gif") || photo.photo_url.includes("3gp") || photo.photo_url.includes("mov") || photo.photo_url.includes("m4a") || photo.photo_url.includes("m4a") ? (
                                            <>
                                                <TabPanel value={value} index={index}>  <embed src={photo.photo_url} allowfullscreen="true" width="400" height="700"></embed> </TabPanel>
                                            </>
                                        )
                                            :
                                            <>
                                                <TabPanel value={value} index={index}>  <img key={photo.id} src={photo.photo_url} style={{ height: "300px", width: "auto" }} /> </TabPanel>
                                            </>
                                        }


                                    </div>
                                </>
                            ))}
                        </>
                    </div>
                </div>


            </div>
            <div>
                {post?.user_id === user_id && (
                    <form className="form-add-photo" onSubmit={onSubmit}>
                        <label className="lableAdd"> Add Photo  </label>
                        {errors?.length > 0 && errors?.map((error, ind) => (
                            <div className="errors" key={ind}>{error}</div>
                        ))}
                        <div className="div-for-iput-add-photo">
                            <label class="label">
                                <input type="file" onChange={updateImage} ref={ref} style={{ display: 'none' }} />
                                <span>{!photo_name ? (<>Select a file</>) : <>Choosen File: {photo_name} </>}</span>
                            </label>

                            <div className='div-add-photo'><button className="rnb add-photo" type="submit" onClick={onClick}>Add</button></div>

                        </div>
                        <div> {imageLoading && (<p>Loading... please wait...</p>)} </div>
                        <div className="success-msg">{success && (<p className="success-msg">Success!</p>)}</div>
                    </form>
                )}
            </div>
            <div>
                <p style={{ fontWeight: 'bold' }}>@{post?.username}</p>
                <p className="div-for-desscription">{post?.description} </p >
                <div>
                    <AddCommentModal post_id={post?.id}></AddCommentModal>
                </div>
                <div>
                    {postComments.map(comment => (
                        <div className="comment-div" key={comment.id}>
                            <p className="comment-box"><span className='username'>@{comment.username} </span>{comment.comment} </p>
                            {comment?.user_id === user_id && (
                                <div className='btn-div2'>
                                    <div className='btn-post-info'> <EditMyCommentModal comment_id={comment.id} commentVal={comment.comment}></EditMyCommentModal> </div>
                                    <div><DeleteCommentModal id={comment.id}></DeleteCommentModal></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>



    )
}
