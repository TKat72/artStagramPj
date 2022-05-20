import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import AddNewPost from "./AddNewPost"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AddNewPostModel() {
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <i className="fa-regular fa-square-plus  haverOver new-post" style={{ fontSize: "25px" }} onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <AddNewPost setShowModal={setShowModal} ></AddNewPost>
                </Modal>
            )}

        </>
    )

}
