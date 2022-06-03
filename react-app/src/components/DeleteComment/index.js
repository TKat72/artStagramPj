import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import DeleteComment from "./DeleteComment"

export default function DeleteCommentModal({ id }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <i style={{ fontSize: "20px", cursor: "pointer" , color: "#fd5e53" }} className="fa-solid fa-trash-can-arrow-up" onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <DeleteComment id={id} setShowModal={setShowModal} ></DeleteComment>
                </Modal>
            )}

        </>
    )

}
