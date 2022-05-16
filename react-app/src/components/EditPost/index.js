import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import EditPost from "./EditPost"

export default function EditPostModal({ id, descriptionVal }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <EditPost descriptionVal={descriptionVal} id={id} setShowModal={setShowModal} ></EditPost>
                </Modal>
            )}

        </>
    )

}
