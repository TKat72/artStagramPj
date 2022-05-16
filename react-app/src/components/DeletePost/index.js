import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import DeletePost from "./DeletePost"

export default function DeletePostModal({ id, descriptionVal }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <DeletePost id={id} setShowModal={setShowModal} ></DeletePost>
                </Modal>
            )}

        </>
    )

}