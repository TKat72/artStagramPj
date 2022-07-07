import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getAllFollows } from '../../store/follows'
import { getOnePost, addLiketoPost, removeLikesFromPost } from "../../store/posts"
import { createNewComment } from '../../store/comments'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PostInformationModal from "../PostInformation"
import "./PostForFeed.css"

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
                <Box sx={{ p: 4 }}>
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


export default function PostForFeed({ id }) {
    const { post_id } = useParams()
    const dispatch = useDispatch()
    const [value, setValue] = useState(0);
    const curent_user_id = useSelector(state => state?.session?.user?.id)
    const post = useSelector(state => state?.posts[id])
    const following = useSelector(state => state?.follows)
    const [comment, setComment] = useState('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    let user_id = post?.user_id
    let user_followed = !following[user_id]
    console.log("curent user id ", curent_user_id)
    useEffect(() => {
        dispatch(getAllFollows())
        dispatch(getOnePost(id))
        // dispatch(getAllFollows())

    }, [dispatch])

    const addLike = async () => {
        dispatch(addLiketoPost(post?.id))
    }
    const removeLike = async () => {
        dispatch(removeLikesFromPost(post?.id))
    }
    const addComment = async () => {
        console.log("post id", post?.id)
        dispatch(createNewComment(comment, post?.id))
        setComment('')
    }
    return (
        <>
            <div className={`${post.photos.length > 1?"more-then-one": "post-div" }`} key={post.id}   >
                <PostInformationModal username={post.username} description={post.description} id={post.id}> </PostInformationModal>
                {user_followed & user_id !== curent_user_id ? (<>
                    <button onClick={() => dispatch(followUser(user_id))}>fallow</button>
                </>) : <></>}
                {post.photos.length > 1 ? (
                    <div className="slide" >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                {post.photos.map((photo, idx) => (
                                    <Tab label={idx + 1} {...a11yProps(idx)} />
                                ))}

                            </Tabs>
                        </Box>
                        {post?.photos.map((photo, idx) => (
                            <>

                                {post?.photo?.photo_url.includes("mp4") || photo.photo_url.includes("gif") || photo.photo_url.includes("3gp") || photo.photo_url.includes("mov") || photo.photo_url.includes("m4a") || photo.photo_url.includes("m4a") ? (


                                    <TabPanel value={value} index={idx}>
                                        <div className="img-podt-dspl " >
                                            <embed src={photo.photo_url} allowfullscreen="true" width="600" height="800"></embed>
                                        </div>
                                    </TabPanel>

                                ) :
                                    <>
                                        <TabPanel value={value} index={idx}>
                                            <div className="img-podt-dspl">
                                                <img style={{ height: "600px", maxWidth: "540px" }} src={photo?.photo_url} />
                                            </div>
                                        </TabPanel>
                                    </>
                                }

                            </>
                        ))}
                        {post.likes[curent_user_id] ? (<><i className="fa-solid fa-heart" style={{ color: "red" }} onClick={removeLike}> <span className="likeNum">{Object.values(post.likes).length} </span></i></>) : <><i className="fa-solid fa-heart" onClick={addLike}>  <span className="likeNum">{Object.values(post.likes).length} </span></i></>}
                        <div className="description div-for-desscription"> <p > {post.description}</p> </div>
                    </div>


                ) : <div >



                    {post?.photos.map(photo => (
                        <>
                            <div key={photo.id}  >
                                {photo.photo_url.includes("mp4") || photo.photo_url.includes("gif") || photo.photo_url.includes("3gp") || photo.photo_url.includes("mov") || photo.photo_url.includes("m4a") || photo.photo_url.includes("m4a") ? (
                                    <div className="img-podt-dspl singele-photo">
                                        <embed src={photo.photo_url} allowfullscreen="true" width="600" height="800" style={{ marginTop: "10px" }} ></embed>

                                    </div >
                                ) :
                                    <div className="img-podt-dspl singele-photo">
                                        <img style={{ height: "600px", maxWidth: "540px" }} src={photo?.photo_url} />
                                    </div>
                                }
                            </div>
                        </>
                    ))}
                    {post.likes[curent_user_id] ? (<><i className="fa-solid fa-heart" style={{ color: "red" }} onClick={removeLike}>  <span className="likeNum"> {Object.values(post.likes).length} </span></i></>) : <><i className="fa-solid fa-heart" onClick={addLike}>  <span className="likeNum"> {Object.values(post.likes).length} </span></i></>}

                    <div className="description div-for-desscription"> <p style={{ wordWrap: "break-word" }}> {post.description}</p> </div>
                </div>}
                <div>
                    <p className="comment-box"><span id="usernameComment" >{post?.comments.length > 0 && (<> @ </>)}{post?.comments[0]?.username} {post?.comments.length > 0 && (<> : </>)} </span>  {post?.comments[0]?.comment}</p>

                </div>
                <div id="commentBox">

                    <i class="fa-regular fa-face-smile" style={{ fontSize: "25px" }}></i><input type="text" id="commentInput" style={{ width: "460px", height: "25px" }} placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)} value={comment}></input>
                    <span id="PostComent" onClick={addComment} >Post </span>
                </div>

            </div>

        </>
    )

}
