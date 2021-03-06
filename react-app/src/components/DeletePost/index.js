import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import DeletePost from "./DeletePost"

export default function DeletePostModal({ id, descriptionVal }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <i style={{ fontSize: "20px", cursor: "pointer", color: "#fd5e53" }} className="fa-solid fa-trash-can-arrow-up delete-post-lbl" onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <DeletePost id={id} setShowModal={setShowModal} ></DeletePost>
                </Modal>
            )}

        </>
    )

}
