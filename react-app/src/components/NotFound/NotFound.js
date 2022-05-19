import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from "../../store/posts"
import "./NotFound.css"

export default function PageNorFound() {



    return (
        <div className="not-found">
            <h1 className="title404"> 404 page not found</h1>
        </div>
    )
}
