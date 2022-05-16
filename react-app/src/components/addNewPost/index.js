import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import AddNewPost from "./AddNewPost"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AddNewPostModel() {
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <i class="fa-regular fa-square-plus" style={{ fontSize: "25px" }} onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <AddNewPost setShowModal={setShowModal} ></AddNewPost>
                </Modal>
            )}

        </>
    )

}
