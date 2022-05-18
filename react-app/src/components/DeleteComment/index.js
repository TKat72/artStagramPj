import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import DeleteComment from "./DeleteComment"

export default function DeleteCommentModal({ id }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="rnb" onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <DeleteComment id={id} setShowModal={setShowModal} ></DeleteComment>
                </Modal>
            )}

        </>
    )

}
