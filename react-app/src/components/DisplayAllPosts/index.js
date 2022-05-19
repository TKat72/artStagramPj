import React, { useEffect, useState } from 'react'
import { getAllPosts, addPost } from "../../store/posts"
import { useDispatch, useSelector } from 'react-redux'
import { createNewComment } from "../../store/comments"
import { NavLink, } from "react-router-dom"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PostInformationModal from "../PostInformation"

import PostForFeed from "../postForFeed/PostForFeed"

import "./DisplayAllPosts.css"


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


export default function DisplayPosts() {
    const dispatch = useDispatch()

    const [users, setUsers] = useState([]);
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))
    const [value, setValue] = useState(0);
    const [comment, setComment] = useState("")
    let index = 1;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    useEffect(() => {
        dispatch(getAllPosts())


        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();

            setUsers(Object.values(responseData));
        }
        fetchData();

    }, [dispatch])

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     dispatch(createNewComment(comment, post_id))


    // }


    return (
        <div className="AllPosts">
            {posts?.map(post => (
                <>
                    <PostForFeed id={post?.id}></PostForFeed>
                </>
            ))}

        </div>
    )

}
