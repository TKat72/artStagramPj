import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import EditComment from "./EditMyComment"

export default function EditMyCommentModal({ comment_id, commentVal }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <EditComment commentVal={commentVal} id={comment_id} setShowModal={setShowModal} ></EditComment>
                </Modal>
            )}

        </>
    )

}
