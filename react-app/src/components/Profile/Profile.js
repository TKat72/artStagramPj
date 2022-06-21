import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getMYComments } from "../../store/comments"
import { getMyPosts } from "../../store/posts"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import user from "./user.jpeg"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditPostModal from "../EditPost"
import DeletePostModal from "../DeletePost"
import PostInformationModal from "../PostInformation"
import EditMyCommentModal from "../EditMyComment"
import DeleteCommentModal from "../DeleteComment"
import { getAllFollows, unfollwUser } from "../../store/follows"
import 'react-slideshow-image/dist/styles.css'
import './Profile.css';




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

export default function Profile() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session?.user)
    const comments = useSelector(state => Object.values(state?.comment).filter(post => post.user_id === user.id))
    const posts = useSelector(state => Object.values(state?.posts).filter(post => post.user_id === user.id))
    const follows = useSelector(state => Object.values(state?.follows))
    const date = user.created_at.split(" ", 1)


    const year = date[0].split("-", 1)

    const month = date[0].split("-")[1]

    const day = date[0].split("-")[2]

    const [value, setValue] = React.useState(0);
    let index = 1;
    useEffect(() => {
        dispatch(getAllFollows())
        dispatch(getMYComments());
        dispatch(getMyPosts());


    }, [dispatch])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const onClick = (id) => {
        dispatch(unfollwUser(id))

    }
    return (
        <div className="profile">
            <div className="profile-information">
                <div>Profile</div>
                <div className="profile-pic-name">
                    <img className="profile-photo" src="https://artstargarm2-backet.s3.amazonaws.com/02eddb3ff9fd44719cc15bc999582f08.jpeg"></img>  <p> {user.username}</p>

                </div>
                <p> Join on {month}/{day}/{year} </p>
            </div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={`${comments?.length} comments`} {...a11yProps(0)} />
                    <Tab label={`${posts?.length} posts`} {...a11yProps(1)} />
                    <Tab label={`${follows?.length} follows`} {...a11yProps(2)} />

                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {comments?.map(comment => (
                    <>
                        <div className="my-comments" key={comment.id}  >
                            <div className="coment-edit-delete profile-edit-delete">
                                <div className='btn-post-info'>
                                    <EditMyCommentModal comment_id={comment.id} commentVal={comment.comment}></EditMyCommentModal>
                                </div>
                                <div>
                                    <DeleteCommentModal id={comment.id}></DeleteCommentModal>
                                </div>
                            </div>
                            <p className="my-comments1"> {comment.comment} </p>

                        </div>
                    </>
                ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {posts?.map(post => (
                    <div className="post-box" key={post.id}>
                        <PostInformationModal username={post.username} description={post.description} id={post.id}> </PostInformationModal>
                        <div className="edit-delete-box-profile" key={post.id}>
                            <EditPostModal id={post?.id} descriptionVal={post.description} />
                            <DeletePostModal id={post?.id}></DeletePostModal>

                        </div>
                        <p className="post-description">{post.description}</p>
                        <div className="profile-photo-div">


                            {post?.photos.map(photo => (
                                <>
                                    <div key={photo.id}  >
                                        {photo.photo_url.includes("mp4") || photo.photo_url.includes("gif") || photo.photo_url.includes("3gp") || photo.photo_url.includes("mov") || photo.photo_url.includes("m4a") || photo.photo_url.includes("m4a") ? (
                                            <>
                                                <embed src={photo.photo_url} allowfullscreen="true" width="400" height="700"></embed>
                                            </>
                                        ) :
                                            <div className="img-podt-dspl " key={photo.id}>
                                                <img style={{ height: "600px", maxWidth: "auto" }} src={photo?.photo_url} />
                                            </div>
                                        }
                                    </div>
                                </>
                            ))}


                        </div>
                    </div>
                ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {follows?.map(follow => (
                    <>
                        <div className="my-comments1">
                            <p>@{follow.username}</p>
                            <button className="unfollw" onClick={() => dispatch(unfollwUser(follow.id))}> unfollw</button>
                    </div>
                    </>
                ))}
        </TabPanel>

        </div >
    )


}
