import React from 'react';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

    const user = useSelector(state => state.session?.user)
    const date = user.created_at.split(" ", 1)

    const year = date[0].split("-", 1)

    const month = date[0].split("-")[1]

    const day = date[0].split("-")[2]
    const [value, setValue] = React.useState(0);
    let index = 1;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <div>
            <div>Profile</div>
            <p> {user.username}</p>
            <p> Join on {month}/{day}/{year} </p>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={`${user.comments.length} comments`} {...a11yProps(0)} />
                    <Tab label={`${user.posts.length} posts`} {...a11yProps(1)} />
                    
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {user?.comments?.map(comment => (
                    <>
                        <div>
                            <p className="my-comments"> {comment.comment} </p>
                        </div>
                    </>
                ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {user?.posts?.map(post => (
                    <div className="post-box">
                        <p>{post.description}</p>
                        <div className="profile-photo-div">


                            {post?.photos.map(photo => (
                                <>
                                    <div key={photo.id}  >
                                        {photo.photo_url.includes("mp4") || photo.photo_url.includes("gif") || photo.photo_url.includes("3gp") || photo.photo_url.includes("mov") || photo.photo_url.includes("m4a") || photo.photo_url.includes("m4a") ? (
                                            <>
                                                <embed src={photo.photo_url} allowfullscreen="true" width="400" height="700"></embed>
                                            </>
                                        ) :
                                            <div className="img-podt-dspl">
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

        </div>
    )


}
