import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import EditPost from "./EditPost"
import "./EditForm.css"

export default function EditPostModal({ id, descriptionVal }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
          <i style ={{fontSize: "20px", color: "rgb(134, 172, 192)"}} className="fa-solid fa-pen-to-square edit-post-lable"onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <EditPost descriptionVal={descriptionVal} id={id} setShowModal={setShowModal} ></EditPost>
                </Modal>
            )}

        </>
    )

}
