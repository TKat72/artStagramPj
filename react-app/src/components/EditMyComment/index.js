import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import EditComment from "./EditMyComment"

export default function EditMyCommentModal({ comment_id, commentVal }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <i style ={{fontSize: "20px", color: "rgb(134, 172, 192)"}} className="fa-solid fa-pen-to-square edit-post-lable"onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <EditComment commentVal={commentVal} id={comment_id} setShowModal={setShowModal} ></EditComment>
                </Modal>
            )}

        </>
    )

}
