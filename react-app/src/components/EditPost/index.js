import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import EditPost from "./EditPost"

export default function EditPostModal({ id, descriptionVal }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
          <i style ={{fontSize: "25px"}} className="fa-solid fa-pen-to-square"onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <EditPost descriptionVal={descriptionVal} id={id} setShowModal={setShowModal} ></EditPost>
                </Modal>
            )}

        </>
    )

}
