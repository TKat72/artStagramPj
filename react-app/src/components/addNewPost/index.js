import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import AddNewPost from "./AddNewPost"

export default function AddNewPostModel() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Add Post </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <AddNewPost setShowModal={setShowModal} ></AddNewPost>
                </Modal>
            )}

        </>
    )

}
