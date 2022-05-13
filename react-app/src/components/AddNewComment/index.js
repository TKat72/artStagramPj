import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import AddNewComment from "./AddNewComment"

export default function AddPhotoToAlbumModal({ id }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button  onClick={() => setShowModal(true)}>Add comment </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <AddNewComment id={id} setShowModal={setShowModal} ></AddNewComment>
                </Modal>
            )}

        </>
    )

}
